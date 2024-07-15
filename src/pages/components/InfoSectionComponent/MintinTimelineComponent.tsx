import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import {
	Step,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useSteps,
} from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi';

type Props = {};

const steps = [
	{ title: 'First', description: 'Contact Info' },
	{ title: 'Second', description: 'Date & Time' },
	{ title: 'Third', description: 'Select Rooms' },
];

const MintinTimelineComponent = (props: Props) => {
	const { activeStep } = useSteps({
		index: 1,
		count: steps.length,
	});

	return (
		<CustomBox w='100%' fontSize='14px'>
			<Text fontSize='24px' fontWeight={700}>
				Bridging duration
			</Text>

			<Stepper
				index={activeStep}
				orientation='vertical'
				gap={5}
				maxW='400px'
			>
				<Step>
					<StepIndicator>
						<StepStatus
							complete={<StepNumber />}
							incomplete={<StepNumber />}
							active={<StepNumber />}
						/>
					</StepIndicator>

					<Stack flexShrink='0' w='100%' gap='16px' h='128px'>
						<StepTitle>PROVIDE A DEPOSIT ADDRESS</StepTitle>
						<Text>
							Provide an ETH address and a BTC Return address to
							generate a unique BTC deposit address.{' '}
							<Link as='span' variant='purpleDarkGradient'>
								Read more
							</Link>
						</Text>
					</Stack>

					<StepSeparator />
				</Step>
				<Text mt={2} px={2}>
					ETH Address
				</Text>

				<Text>
					<Box
						as='span'
						color='brand.purple.900'
						display='inline-block'
						verticalAlign='middle'
						mr={2}
					>
						<BsFillArrowRightCircleFill
							style={{ minWidth: '16px' }}
						/>
					</Box>
					This is where your tBTC (ERC20) will be sent after minting
					initiation.
				</Text>

				<Text px={2}>Recovery BTC Address</Text>

				<Text>
					<Box
						as='span'
						color='brand.purple.900'
						display='inline-block'
						verticalAlign='middle'
						mr={2}
					>
						<BsFillArrowRightCircleFill
							style={{ minWidth: '16px' }}
						/>
					</Box>
					Providing a BTC refund address means your bitcoin will be
					safe, even in the unlikely case of an error minting.{' '}
					<Link as='span' variant='purpleDarkGradient'>
						Read more
					</Link>
				</Text>

				<Text>
					<Box
						as='span'
						color='brand.purple.900'
						display='inline-block'
						verticalAlign='middle'
						mr={2}
					>
						<BsFillArrowRightCircleFill
							style={{ minWidth: '16px' }}
						/>
					</Box>
					Make sure you provide a single BTC recovery address that you
					control. Don't use a multi-sig or an exchange address. You
					can read more about the requirements and P2PKH.
					<Link as='span' variant='purpleDarkGradient'>
						Read more
					</Link>
				</Text>

				<Text>
					<Box
						as='span'
						color='brand.purple.900'
						display='inline-block'
						verticalAlign='middle'
						mr={2}
					>
						<BsFillArrowRightCircleFill
							style={{ minWidth: '16px' }}
						/>
					</Box>
					Based on these two addresses, the protocol will create a
					unique BTC deposit address using a P2SWH for each user.
					<Link as='span' variant='purpleDarkGradient'>
						Read more
					</Link>
				</Text>

				<Text>
					Based on these two addresses, the protocol will create a
					unique BTC deposit address using a P2SWH for each user.
					<Link as='span' variant='purpleDarkGradient'>
						Read more
					</Link>
				</Text>
				<Step>
					<StepIndicator>
						<StepStatus
							complete={<StepNumber>2</StepNumber>}
							incomplete={<StepNumber>2</StepNumber>}
							active={<StepNumber>2</StepNumber>}
						/>
					</StepIndicator>

					<Stack h='140px'>
						<StepTitle>Make a BTC deposit</StepTitle>
						<Text>
							Send any amount lager than 0.01 BTC to this unique
							BTC Deposit Address. The amount sent will be used to
							mint tBTC.
						</Text>
					</Stack>
					<StepSeparator />
				</Step>
				<Step>
					<StepIndicator>
						<StepStatus
							complete={<StepNumber>3</StepNumber>}
							incomplete={<StepNumber>3</StepNumber>}
							active={<StepNumber>3</StepNumber>}
						/>
					</StepIndicator>
					<Stack h='140px'>
						<StepTitle>Make a BTC deposit</StepTitle>
						<Text>
							Minting tBTC does not require you to wait for the
							Bitcoin confirmations. Sign an Ethereum transaction
							in your wallet and your tBTC will arrive in around 1
							to 3 hours.
						</Text>
					</Stack>
					<StepSeparator />
				</Step>
			</Stepper>
		</CustomBox>
	);
};

export default MintinTimelineComponent;
