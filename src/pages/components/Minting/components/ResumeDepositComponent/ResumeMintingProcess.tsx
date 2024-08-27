import { Dispatch, SetStateAction, useState } from 'react';
import HeaderStepsMintingComponent from '../MintingProcess/HeaderStepsMintingComponent';
import { Button, Link, Stack, Text } from '@chakra-ui/react';
import DragAndDropComponent from './DragAndDropComponent';
import { useSdk } from '../../../../../context/SDKProvider';
import { JsonData } from '../../../../../interfaces/JsonData.interface';
import { getDepositInfo } from '../../../../../services/getDepositInfo';
import { setLocalVariable } from '../../../../../services/setLocalVariable';
import { useDispatch } from 'react-redux';
import { addDeposit } from '../../../../../redux/reducers/DepositReducer';

type Props = {
	setTabSelected: Dispatch<SetStateAction<number>>;
	setStep: Dispatch<SetStateAction<number>>;
};

const ResumeMintingProcess = ({ setTabSelected, setStep }: Props) => {
	const [fileName, setFileName] = useState<string | null>(null);
	const [fileContent, setFileContent] = useState<JsonData>();
	const dispatch = useDispatch();
	const { sdk } = useSdk();

	const handleClick = async () => {
		if (fileName !== null && fileContent && sdk) {
			const utxos =
				await sdk.bitcoinClient.findAllUnspentTransactionOutputs(
					fileContent.btcDepositAddress,
				);
			const deposit = await getDepositInfo(fileContent, sdk);
			const { btcDepositAddress, btcRecoveryAddress } = fileContent;
			dispatch(
				addDeposit(deposit, btcDepositAddress, btcRecoveryAddress),
			);
			setTabSelected(1);
			// setStep(3);
		}
	};
	return (
		<Stack spacing='25px' w={{ base: '100%', xl: '456px' }}>
			<HeaderStepsMintingComponent label='tBTC - MINTING PROCESS' />
			<Text fontSize='18px' lineHeight='28px' fontWeight={400}>
				<Text fontWeight={600} as='span' variant='purpleDarkGradient'>
					Resume minting
				</Text>{' '}
				- Upload .JSON file
			</Text>
			<Text variant='gray'>
				To resume your minting you need to upload your .JSON file and
				sign the Minting Initiation transaction triggered in the dApp.
			</Text>
			<DragAndDropComponent
				fileName={fileName}
				setFileName={setFileName}
				setFileContent={setFileContent}
			/>

			<Button variant='purple' onClick={handleClick}>
				Upload And Resume
			</Button>
			<Link
				variant='purpleDarkGradient'
				fontSize='14px'
				lineHeight='20px'
				textAlign='center'
			>
				Bridge contract
			</Link>
		</Stack>
	);
};

export default ResumeMintingProcess;
