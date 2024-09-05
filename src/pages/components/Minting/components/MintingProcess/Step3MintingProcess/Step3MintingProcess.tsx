import { Box, Flex, useSteps } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ConfirmingMinting from './ConfirmingMinting';
import Step3HeaderComponent from './Step3HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../types/RootState';
import { useSdk } from '../../../../../../context/SDKProvider';
import { checkDepositStatus } from '../../../../../../services/depositServices';
import {
	addArbTxHash,
	addStatus,
} from '../../../../../../redux/reducers/DepositReducer';
import { Deposit } from '@keep-network/tbtc-v2.ts';

type Props = { setStep: Dispatch<SetStateAction<number>> };

const initialMsg = {
	header: 'Waiting for the initialization of the deposit',
	body: 'The deposit is being initialized. This process can take a few minutes.',
	transaction: {
		label: 'blockstream',
		link: 'https://blockstream.info/testnet/tx/',
	},
};

const mintingMsg = {
	header: 'Initializing minting',
	body: 'A Minter is assessing the minting initialization. Minters are a small group of experts who monitor BTC deposits on the chain.',
	transaction: {
		label: 'etherScan',
		link: 'link',
	},
};

const finalizingMinting = {
	header: 'Minting in progress',
	body: 'The contract is minting your tBTC tokens.',
	transaction: {
		label: 'etherScan',
		link: 'link',
	},
};

const Step3MintingProcess = ({ setStep }: Props) => {
	const depositInfo = useSelector((state: RootState) => state.deposit);
	// eslint-disable-next-line
	const [txHash, setTxHash] = useState(depositInfo.utxo?.transactionHash);
	const [status, setStatus] = useState(depositInfo.status);
	const dispatch = useDispatch();

	const { sdk } = useSdk();

	const [msg, setMsg] = useState({
		...initialMsg,
		transaction: {
			...initialMsg.transaction,
			link: `${initialMsg.transaction.link}${txHash}`,
		},
	});

	const steps = [
		{ title: 'First', description: 'Contact Info' },
		{ title: 'Second', description: 'Date & Time' },
		{ title: 'Third', description: 'Select Rooms' },
	];

	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: steps.length,
	});

	useEffect(() => {
		const deposit = depositInfo.deposit;
		if (!deposit || !sdk) {
			return;
		}
		const initiateMinting = async (deposit: Deposit) => {
			try {
				const fundingUxtos = await deposit?.detectFunding();
				if (fundingUxtos) {
					if (depositInfo.arbTxHash === null) {
						const arbTxHash = await deposit.initiateMinting(
							fundingUxtos[0],
						);
						dispatch(addArbTxHash(arbTxHash.toString()));
					}
				}
			} catch (error) {}
		};

		const changeStep = async () => {
			switch (status) {
				case 0:
					setActiveStep(1);
					setMsg(mintingMsg);
					break;
				case 1:
					setActiveStep(2);
					setMsg(finalizingMinting);
					break;
				case 2:
					setActiveStep(3);
					break;
			}
			const depositStatus = await checkDepositStatus(deposit, sdk);
			if (depositStatus !== status && depositStatus) {
				dispatch(addStatus(depositStatus));
				setStatus(depositStatus);
			}
		};
		initiateMinting(deposit);
		changeStep();
	}, [depositInfo, dispatch, sdk, setActiveStep, status]);

	return (
		<Flex>
			<Box h={{ base: 'auto', xl: '555px' }}>
				<Step3HeaderComponent activeStep={activeStep} steps={steps} />
				<ConfirmingMinting
					step={activeStep}
					msg={msg}
					setStep={setStep}
				/>
			</Box>
		</Flex>
	);
};

export default Step3MintingProcess;
