'use client';
import React, { useMemo, useState } from 'react';
import Card from '../Card';
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Link,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepStatus,
	StepTitle,
	Stepper,
	Text,
	useSteps,
	useToast
} from '@chakra-ui/react';
import FormCommitProps from '@/interface/props/FormCommitProps';
import {
	RegistrationParameters,
	makeRegistrationTuple,
	randomSecret
} from '@ensdomains/ensjs/utils';
import { commitName } from '@ensdomains/ensjs/wallet';
import client, { createWalletClient } from '@/logic/client';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import {
	TransactionExecutionError,
	TransactionReceiptNotFoundError,
	WalletClient
} from 'viem';
import { getPaymentPrices } from '@/logic/prices';
import { sendPayment } from '@/logic/payment';
import ButtonCountdown from '../ButtonCountdown';
import { ResolverAddress } from '@/contracts/resolver';

export default function FormCommit(props: FormCommitProps) {
	const toast = useToast();
	const { walletProvider } = useWeb3ModalProvider();
	const [isStartCountdown, setIsStartCountdown] = useState(false);

	const registrationSteps = useMemo(() => {
		return [
			{
				title: 'Step 1',
				description: 'Complete a transaction to begin the timer'
			},
			{
				title: 'Step 2',
				description:
					'Wait 80 seconds for the timer to complete and do not close this page before the timer is finished.'
			},
			{
				title: 'Step 3',
				description:
					'Once your wait time is over, make the payment for your domain name by approving the transaction.'
			},
			{
				title: 'Step 4',
				description: 'Step completed'
			}
		];
	}, []);

	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: registrationSteps.length
	});

	const handlePayment = (
		wallet: WalletClient,
		params: RegistrationParameters,
		paymentPrice: bigint
	) => {
		return new Promise(async (resolve, reject) => {
			try {
				const registrationParams = makeRegistrationTuple({
					name: params.name,
					owner: params.owner as `0x${string}`,
					duration: params.duration,
					secret: params.secret as `0x${string}`
				});
				const hash = await sendPayment({
					wallet: wallet,
					client: client,
					registrationParams: registrationParams,
					paymentPrice: paymentPrice
				});
				resolve(hash);
			} catch (e: any) {
				if (e instanceof TransactionExecutionError) {
					console.log(e.shortMessage)
					toast({
						status: 'error',
						title: e.shortMessage
					});
					reject(e.shortMessage);
				}
				console.log(e.reason)
				toast({
					status: 'error',
					title: e.reason
				});
				reject(e.reason);
			}
		});
	};

	const handleBeginTransaction = async () => {
		try {
			const wallet = createWalletClient(walletProvider);
			const walletOwner = props.owner as `0x${string}`;
			const duration = props.duration * 60 * 60 * 24 * 365;
			const secret = randomSecret();
			const params = {
				name: props.name,
				owner: walletOwner,
				duration: duration,
				secret: secret,
				account: walletOwner
			};

			const commit = await commitName(wallet, params);
			const commitmentPromise = client.waitForTransactionReceipt({ hash: commit })
			toast.promise(commitmentPromise, {
				success: {
					title: 'Success',
					description: 'Transaction success'
				},
				error: {
					title: 'Error',
					description: 'Failed to send transaction',
					onCloseComplete: () => props.setStep('failed')
				},
				loading: {
					title: 'Please wait',
					description: 'Please wait for transaction receipt'
				}
			});

			await commitmentPromise;
			setActiveStep(1);
			setIsStartCountdown(true);
			const commitmentTimeout = new Promise((resolve) => {
				setTimeout(resolve, 80 * 1_000);
			});
			toast.promise(commitmentTimeout, {
				success: {
					title: 'Success',
					description: 'Commitment verified successfully'
				},
				loading: {
					title: 'Please wait',
					description: 'Wait 80 seconds to verify commitment'
				},
				error: {
					title: 'Error',
					description: 'Failed to verify commitment'
				}
			});
			await commitmentTimeout;
			setIsStartCountdown(false);
			setActiveStep(2);
			const prices: any = await getPaymentPrices(
				params.name,
				props.duration
			);
			const paymentPromise = handlePayment(wallet, params, prices[1]);
			toast.promise(paymentPromise, {
				success: {
					title: 'Success',
					description: 'Payment successfully'
				},
				loading: {
					title: 'Please wait',
					description: 'Please wait for transaction receipt'
				},
				error: {
					title: 'Error',
					description: 'Transaction error'
				}
			});
			await paymentPromise;
			setActiveStep(3);
			setActiveStep(4);
			if (props.isPrimaryName) {
				props.setStep('primaryName');
			} else {
				props.setStep('registrationSuccess');
			}
		} catch (e) {}
	};

	return (
		<Card>
			<Heading textAlign={'center'} size={'sm'} opacity={0.8}>
				Complete step-by-step
			</Heading>
			<Text
				textAlign={'center'}
				size={'sm'}
				color={'primary.text'}
				opacity={0.7}
			>
				Complete the steps to register a name
			</Text>
			<Divider opacity={0.5} my={3} />
			<Stepper
				size={'lg'}
				index={activeStep}
				mt={5}
				mx={[0, 5]}
				orientation="vertical"
				alignItems={'center'}
			>
				{registrationSteps.map((step, index) => (
					<Step key={`stepper-${index}`}>
						<StepIndicator>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>
						<Box color={'primary.text'}>
							<StepTitle style={{ color: 'primary.text' }}>
								{step.title}
							</StepTitle>
							<StepDescription style={{ color: 'primary.text' }}>
								{step.description}
							</StepDescription>
						</Box>
					</Step>
				))}
			</Stepper>

			<Flex gap={3} mt={10}>
				{isStartCountdown ? (
					<ButtonCountdown initialTimer={80} isStart={true} />
				) : (
					<>
						<Button
							w={'full'}
							p={7}
							transition={'all .5s ease-in-out'}
							color={'primary.text'}
							bgColor={'bg.button.secondary'}
							_hover={{
								bgColor: 'bg.button.hover.secondary',
								transform: 'translateY(-5px)'
							}}
							onClick={() => props.setStep('registration')}
						>
							Back
						</Button>
						<Button
							w={'full'}
							p={7}
							bgGradient={'linear(to-l, #8aa9f2, #9a76ff)'}
							transition={'all .5s ease-in-out'}
							color={'primary.text'}
							_hover={{
								transform: 'translateY(-5px)'
							}}
							_active={{
								bgColor: 'bg.button.active.primary'
							}}
							onClick={() => handleBeginTransaction()}
						>
							Begin
						</Button>
					</>
				)}
			</Flex>
		</Card>
	);
}
