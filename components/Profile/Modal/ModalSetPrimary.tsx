import React, { useMemo, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Stepper,
	Step,
	StepIndicator,
	StepStatus,
	StepIcon,
	StepNumber,
	Box,
	StepTitle,
	StepDescription,
	useSteps,
	useToast
} from '@chakra-ui/react';
import ModalSetPrimaryNameProps from '@/interface/props/modal/ModalSetPrimaryNameProps';
import client, { createWalletClient } from '@/logic/client';
import {
	setAddressRecord,
	setPrimaryName,
	setResolver
} from '@ensdomains/ensjs/wallet';
import { ResolverAddress } from '@/contracts/resolver';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import { TransactionExecutionError, UserRejectedRequestError } from 'viem';

export default function ModalSetPrimary(props: ModalSetPrimaryNameProps) {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const { walletProvider } = useWeb3ModalProvider();

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

	const handleSetPrimaryName = async () => {
		try {
			setIsLoading(true);
			const wallet = createWalletClient(walletProvider);
			const addressRecord = await setAddressRecord(wallet, {
				name: props.name,
				coin: 'ETH',
				value: props.owner,
				resolverAddress: ResolverAddress as `0x${string}`,
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
				resolverAddress: ResolverAddress,
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
				resolverAddress: ResolverAddress,
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
			setActiveStep(3);
			props.onClose();
		} catch (e: any) {
			if (
				e instanceof UserRejectedRequestError ||
				e instanceof TransactionExecutionError
			) {
				toast({
					status: 'error',
					title: 'Error',
					description: e.shortMessage
				});
			} else {
				toast({
					status: 'error',
					title: 'Error',
					description: e.reason
				});
			}
		}
	};

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={props.onClose}
			isCentered
			motionPreset={'slideInBottom'}
		>
			<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
			<ModalContent bgColor={'bg.card'}>
				<ModalHeader textAlign={'center'}>
					Set Primary Name {props.name}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
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
									<StepTitle
										style={{ color: 'primary.text' }}
									>
										{step.title}
									</StepTitle>
									<StepDescription
										style={{ color: 'primary.text' }}
									>
										{step.description}
									</StepDescription>
								</Box>
							</Step>
						))}
					</Stepper>
				</ModalBody>

				<ModalFooter gap={3}>
					<Button
						w={'full'}
						transition={'all 0.5s ease-in-out'}
						bgColor={'bg.button.secondary'}
						color={'primary.text'}
						_hover={{
							bgColor: 'bg.button.hover.secondary'
						}}
						onClick={props.onClose}
					>
						Close
					</Button>
					<Button
						w={'full'}
						transition={'all .5s ease-in-out'}
						bgGradient={'linear(to-l, #8aa9f2, #9a76ff)'}
						bgSize={'100 100'}
						color={'primary.text'}
						_hover={{
							transform: 'translateY(-3px)'
						}}
						_active={{
							bgGradient: 'linear(to-l, #8aa9f2, #9a76ff)'
						}}
						onClick={() => handleSetPrimaryName()}
					>
						Set Primary Name
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
