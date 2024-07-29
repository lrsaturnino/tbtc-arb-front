import { Box, Flex, Image, Link, Text, useColorMode } from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import MintingProcessComponent from './components/MintingProcess/MintingProcessComponent';
import TimelineComponent from './components/Timeline/TimelineComponent';
import { ChangeEvent, useState } from 'react';
import Step1MintingProcess from './components/MintingProcess/Step1MintingProcess';
import TimeLineTemplate from './components/Timeline/TimelineTemplate';
import Step2MintingProcess from './components/MintingProcess/Step2MintingProcess';
import HeaderStepsMintingComponent from './components/MintingProcess/HeaderStepsMintingComponent';
import { DarkStep1Timeline, LightStep1Timeline } from '../../../assets/images';
import { address } from 'bitcoinjs-lib';
import { ArrowBackIcon } from '@chakra-ui/icons';

type Props = {
	isConnected: boolean;
};

const MintComponent = (props: Props) => {
	const { colorMode } = useColorMode();
	const [step, setStep] = useState(1);
	const [btcAddress, setBtcAdress] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const handleClick = () => {
		if (btcAddress === '') {
			setErrorMsg('The recovery address can´t be empty');
		} else {
			try {
				address.toOutputScript(btcAddress);
				setStep(2); // If the address is valid, proceed to the next step
			} catch (error) {
				setErrorMsg('Invalid Bitcoin address');
			}
		}
	};

	const changeBtcAdress = (event: ChangeEvent<HTMLInputElement>) => {
		if (errorMsg) {
			setErrorMsg('');
		}
		const { value } = event.target;
		setBtcAdress(value);
	};

	const goBack = () => {
		setStep(step - 1);
	};

	return (
		<CustomBox h='100%' p='25px'>
			<Flex alignItems='center' gap='9px'>
				{step > 1 && (
					<ArrowBackIcon
						boxSize='24px'
						p='0.5px'
						transition={'transform 0.1s'}
						cursor='pointer'
						_hover={{ transform: 'scale(1.2)' }}
						_active={{ transform: 'scale(1)' }}
						onClick={goBack}
					/>
				)}
				<HeaderStepsMintingComponent label='tBTC - MINTING PROCESS' />
			</Flex>

			<Flex
				w='100%'
				h='100%'
				flexDirection={{ base: 'column', xl: 'row' }}
			>
				{!props.isConnected && <MintingProcessComponent />}
				{props.isConnected && step === 1 && (
					<Step1MintingProcess
						onClick={handleClick}
						onChange={changeBtcAdress}
						btcAddress={btcAddress}
						errorMsg={errorMsg}
					/>
				)}
				{props.isConnected && step === 2 && (
					<Step2MintingProcess
						onClick={setStep}
						btcAddress={btcAddress}
					/>
				)}

				<Box
					bg={colorMode === 'dark' ? 'white' : 'light.coolGray'}
					alignSelf='start'
					h={{ base: '1px', xl: '584px' }}
					w={{ base: '94%', xl: '1px' }}
					my={'25px'}
					ml='32px'
					mr='22px'
				></Box>
				{!props.isConnected && <TimelineComponent />}
				{props.isConnected && step === 1 && (
					<TimeLineTemplate
						label='PROVIDE A DEPOSIT ADDRESS'
						step={1}
					>
						<Text
							fontSize='14px'
							lineHeight='21px'
							fontWeight={400}
						>
							Provide an ETH address and a BTC Return address to
							generate a unique BTC deposit address. <br />
							<Link as='span' variant='purpleDarkGradient'>
								Read More
							</Link>
						</Text>
						<Image
							src={
								colorMode === 'light'
									? LightStep1Timeline
									: DarkStep1Timeline
							}
						/>
					</TimeLineTemplate>
				)}
				{props.isConnected && step === 2 && (
					<TimeLineTemplate step={2} label='MAKE A BTC DEPOSIT'>
						<Text fontSize='14px'>
							Send any amount lager than 0.01 BTC to this unique
							BTC Deposit Address. The amount sent will be used to
							mint tBTC.
						</Text>
					</TimeLineTemplate>
				)}
			</Flex>
		</CustomBox>
	);
};

export default MintComponent;
