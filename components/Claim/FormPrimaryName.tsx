import React, { useMemo, useState } from 'react';
import Card from '../Card';
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
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
import FormPrimaryNameProps from '@/interface/props/FormPrimaryNameProps';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import client, { createWalletClient } from '@/logic/client';
import {
	setAddressRecord,
	setPrimaryName,
	setResolver
} from '@ensdomains/ensjs/wallet';

export default function FormPrimaryName(props: FormPrimaryNameProps) {
	const toast = useToast();
	const { walletProvider } = useWeb3ModalProvider();
	const [isLoading, setIsLoading] = useState(false);

	const primaryNameSteps = useMemo(() => {
		return [
			{
				title: 'Step 1',
				description: 'Sets an address record for a name on a resolver'
			},
			{
				title: 'Step 2',
				description: 'Sets a resolver for a name.'
			},
			{
				title: 'Step 3',
				description: 'Sets a primary name'
			}
		];
	}, []);

	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: primaryNameSteps.length
	});

	const handleOpenWallet = async () => {
		try {
			setIsLoading(true);
			const wallet = createWalletClient(walletProvider);
			const addressRecord = await setAddressRecord(wallet, {
				name: props.name,
				coin: 'ETH',
				value: props.owner,
				resolverAddress:
					'0x8FADE66B79cC9f707aB26799354482EB93a5B7dD' as `0x${string}`,
				account: props.owner as `0x${string}`
			});
			const addressRecordPromise = client.waitForTransactionReceipt({
				hash: addressRecord
			});
			toast.promise(addressRecordPromise, {
				success: {
					title: 'Success',
					description: 'Transaction success'
				},
				error: {
					title: 'Error',
					description: 'Failed to send transaction',
					onCloseComplete: () => {
						setIsLoading(false);
					}
				},
				loading: {
					title: 'Please wait',
					description: 'Please wait for transaction receipt'
				}
			});
			await addressRecordPromise;
			setActiveStep(1);
			const resolver = await setResolver(wallet, {
				name: props.name,
				resolverAddress: '0x8FADE66B79cC9f707aB26799354482EB93a5B7dD',
				contract: 'nameWrapper',
				account: props.owner as `0x${string}`
			});
			const resolverPromise = client.waitForTransactionReceipt({
				hash: resolver
			});
			toast.promise(resolverPromise, {
				success: {
					title: 'Success',
					description: 'Transaction success'
				},
				error: {
					title: 'Error',
					description: 'Failed to send transaction',
					onCloseComplete: () => {
						setIsLoading(false);
					}
				},
				loading: {
					title: 'Please wait',
					description: 'Please wait for transaction receipt'
				}
			});
			await resolverPromise;
			setActiveStep(2);
			const primaryName = await setPrimaryName(wallet, {
				name: props.name,
				resolverAddress: '0x8FADE66B79cC9f707aB26799354482EB93a5B7dD',
				account: props.owner as `0x${string}`,
				address: props.owner as `0x${string}`
			});
			const primaryNamePromise = client.waitForTransactionReceipt({
				hash: primaryName
			});
			toast.promise(primaryNamePromise, {
				success: {
					title: 'Success',
					description: 'Transaction success'
				},
				error: {
					title: 'Error',
					description: 'Failed to send transaction',
					onCloseComplete: () => {
						setIsLoading(false);
					}
				},
				loading: {
					title: 'Please wait',
					description: 'Please wait for transaction receipt'
				}
			});
			await primaryNamePromise;
			props.setStep('registrationSuccess');
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
				{/* Commit an domain name to secure it before registration. */}
				Complete the steps to register a name
			</Text>
			<Divider opacity={0.5} my={3} />
			{/* <CircularCountdown initialTimer={80} isStart={isStartCountdown} /> */}
			<Stepper
				size={'lg'}
				index={activeStep}
				mt={5}
				mx={[0, 5]}
				orientation="vertical"
				alignItems={'center'}
			>
				{primaryNameSteps.map((step, index) => (
					<Step key={`stepper-${index}`}>
						<StepIndicator>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>
						<Box>
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
				{isLoading ? (
					<Button
						w={'full'}
						p={7}
						transition={'all .5s ease-in-out'}
						color={'primary.text'}
						bgColor={'bg.button.secondary'}
					>
						Please wait
					</Button>
				) : (
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
						onClick={() => handleOpenWallet()}
					>
						Open Wallet
					</Button>
				)}
			</Flex>
		</Card>
	);
}
