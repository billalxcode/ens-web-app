import React, { useEffect, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Divider,
	Flex,
	Skeleton,
	Text,
	useToast
} from '@chakra-ui/react';
import ModalExtendNameProps from '@/interface/props/modal/ModalExtendNameProps';
import RegistrationYearSelection from '@/components/Claim/RegistrationYearSelection';
import { BigNumberish, ensNormalize, ethers } from 'ethers';
import estimatedRegistrationStates from '@/interface/states/estimatedRegistration';
import { getGasPrice } from 'viem/actions';
import client, { createWalletClient } from '@/logic/client';
import estimateRegistration from '@/logic/estimateRegistration';
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers/react';
import { TransactionExecutionError, WalletClient } from 'viem';
import { sendRenewPayment } from '@/logic/payment';
import { getPaymentPrices } from '@/logic/prices';

export default function ModalExtendName(props: ModalExtendNameProps) {
	const toast = useToast();
	const { walletProvider } = useWeb3ModalProvider();
	const { address: WalletOwner } = useWeb3ModalAccount();
	const [estimatedRegistration, setEstimatedRegistration] =
		useState<estimatedRegistrationStates>({
			registrationFee: BigInt(0),
			premiumFee: BigInt(0),
			hasPremium: false
		});
	const [durationInYear, setDurationInYear] = useState(1);
	const [gasPrices, setGasPrices] = useState<BigNumberish>(0);
	const [isEstimateRegistration, setIsEstimateRegistration] = useState(true);

	useEffect(() => {
		(async () => {
			if (isEstimateRegistration) {
				const gasPrice = await getGasPrice(client);
				const estimatedRegistrationData = await estimateRegistration(
					ensNormalize(props.username),
					durationInYear
				);
				setGasPrices(gasPrice);
				setEstimatedRegistration(estimatedRegistrationData);

				setTimeout(async () => {
					setIsEstimateRegistration(false);
				}, 1000);
			}
		})();
	}, [
		durationInYear,
		props.username
	]);

	const handleRenew = (wallet: WalletClient, duration: number) => {
		return new Promise(async (resolve, reject) => {
			try {
				const prices: any = await getPaymentPrices(
					props.username,
					durationInYear
				);

				const hash = await sendRenewPayment({
					wallet: wallet,
					params: {
						name: props.username,
						duration: duration,
						value: prices[1]
					}
				});
				await client.waitForTransactionReceipt({ hash });
				resolve(hash);
			} catch (e: any) {
				if (e instanceof TransactionExecutionError) {
					toast({
						status: 'error',
						title: e.shortMessage
					});
					reject(e.shortMessage);
				}
				reject(e.reason);
			}
		});
	};

	const handleRenewClick = async () => {
		const wallet = createWalletClient(walletProvider);
		const duration = durationInYear * 60 * 60 * 24 * 365;

		const renewPromise = handleRenew(wallet, duration);
		toast.promise(renewPromise, {
			success: {
				title: 'Success',
				description: 'Renew successfully'
			},
			error: {
				title: 'Error',
				description: 'Failed to send transaction'
			},
			loading: {
				title: 'Please wait',
				description: 'Please wait for transaction receipt'
			}
		});
		await renewPromise;
		props.onClose();
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
				<ModalHeader textAlign={'center'}>Extend Name</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<RegistrationYearSelection
						year={durationInYear}
						setYear={(x) => setDurationInYear(x)}
						setLoading={() => setIsEstimateRegistration(true)}
					/>

					<Divider opacity={0.5} my={3} />
					<Flex flexDirection={'column'} gap={3}>
						<Flex justify={'space-between'} flexDirection={'row'}>
							<Text>Registration Priod</Text>
							<Skeleton
								isLoaded={!isEstimateRegistration}
								borderRadius={5}
								startColor={'bg.skeletonStart'}
								endColor={'bg.skeletonEnd'}
							>
								<Text>{durationInYear} Year</Text>
							</Skeleton>
						</Flex>
						<Flex justify={'space-between'} flexDirection={'row'}>
							<Text>Registration Fee</Text>
							<Skeleton
								isLoaded={!isEstimateRegistration}
								borderRadius={5}
								startColor={'bg.skeletonStart'}
								endColor={'bg.skeletonEnd'}
							>
								<Text>
									{ethers
										.formatEther(
											estimatedRegistration.registrationFee
										)
										.substring(0, 5)}{' '}
									ETH
								</Text>
							</Skeleton>
						</Flex>
						<Flex justify={'space-between'} flexDirection={'row'}>
							<Text>Gas Price</Text>
							<Skeleton
								isLoaded={!isEstimateRegistration}
								borderRadius={5}
								startColor={'bg.skeletonStart'}
								endColor={'bg.skeletonEnd'}
							>
								<Text>
									{ethers
										.formatUnits(gasPrices, 'gwei')
										.substring(0, 5)}{' '}
									GWEI
								</Text>
							</Skeleton>
						</Flex>
					</Flex>
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
						onClick={() => handleRenewClick()}
					>
						Renew
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
