'use client';
import React, { useState } from 'react';
import Card from '../Card';
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Link,
	Text,
	useToast
} from '@chakra-ui/react';
import CircularCountdown from '../CircularCountdown';
import FormCommitProps from '@/interface/props/FormCommitProps';
import {
	RegistrationParameters,
	makeRegistrationTuple,
	randomSecret
} from '@ensdomains/ensjs/utils';
import { commitName, registerName } from '@ensdomains/ensjs/wallet';
import client, { createWalletClient } from '@/logic/client';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import {
	Address,
	TransactionExecutionError,
	WalletClient,
	encodeFunctionData
} from 'viem';
import ToasterSuccess from '../Toaster/ToasterSuccess';
import ToasterLoading from '../Toaster/ToasterLoading';
import { getPaymentPrices } from '@/logic/prices';
import { sendTransaction } from 'viem/actions';
import { createPaymentData } from '@/logic/payment';
import { PaymentAbi } from '@/contracts/payment';

export default function FormCommit(props: FormCommitProps) {
	const toast = useToast();
	const { walletProvider } = useWeb3ModalProvider();
	const [isStartCountdown, setIsStartCountdown] = useState(false);
	const startCountdown = () => {};

	const handlePayment = async (
		wallet: WalletClient,
		params: RegistrationParameters,
		paymentPrice: bigint
	) => {
		const registrationParams = makeRegistrationTuple({
			name: params.name,
			owner: params.owner as `0x${string}`,
			duration: params.duration,
			// resolverAddress:
			// 	'0x8FADE66B79cC9f707aB26799354482EB93a5B7dD' as `0x${string}`,
			secret: params.secret as `0x${string}`
		});
		const paymentData = createPaymentData(registrationParams);
		const hash = await wallet.sendTransaction({
			to: '0x3A9580b04Bf1e81c242Fb4b7F2e79e6794bfE8fE' as Address,
			data: encodeFunctionData({
				abi: PaymentAbi,
				functionName: 'registerName',
				args: registrationParams
			}),
			account: (await wallet.getAddresses())[0],
			gas: BigInt(333508),
			chain: wallet.chain,
			value: paymentPrice
		});
		await client.waitForTransactionReceipt({ hash });
		return hash;
	};

	const handleCommitClick = async () => {
		try {
			toast({
				description: 'Please check your wallet for confirmation',
				position: 'top-right',
				status: 'loading',
				render: (props) => {
					return <ToasterLoading description={props.description} />;
				}
			});

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
			// console.log(registerName.makeFunctionData(wallet, params))
			const commitmentHash = await commitName(wallet, params);
			toast({
				description: 'Please wait for transaction receipt',
				position: 'top-right',
				status: 'loading',
				render: (props) => {
					return <ToasterLoading description={props.description} />;
				}
			});
			await client.waitForTransactionReceipt({ hash: commitmentHash }); // wait for commitment to finalise
			toast({
				description: 'Transaction success',
				position: 'top-right',
				status: 'loading',
				render: (props) => {
					return (
						<Box
							bgColor={'bg.button.primary'}
							color={'primary.text'}
							p={3}
							borderRadius={4}
						>
							{props.description}
						</Box>
					);
				}
			});
			setIsStartCountdown(true);
			await new Promise((resolve) => setTimeout(resolve, 80 * 1_000)); // wait for commitment to be valid
			setIsStartCountdown(false);

			toast({
				description: 'Successfully to making commitment',
				position: 'top-right',
				status: 'loading',
				render: (props) => {
					return (
						<Box
							bgColor={'bg.button.primary'}
							color={'primary.text'}
							p={3}
							borderRadius={4}
						>
							{props.description}
						</Box>
					);
				}
			});

			toast({
				description: 'Now, check your wallet again',
				position: 'top-right',
				status: 'loading',
				render: (props) => {
					return (
						<Box
							bgColor={'bg.button.primary'}
							color={'primary.text'}
							p={3}
							borderRadius={4}
						>
							{props.description}
						</Box>
					);
				}
			});
			const prices: any = await getPaymentPrices(
				props.name,
				props.duration
			);
			const hash = await handlePayment(wallet, params, prices[1]);

			toast({
				description: 'Successfully to register domain, check ',
				position: 'top-right',
				status: 'loading',
				render: (props) => {
					return (
						<Box
							bgColor={'bg.success'}
							color={'primary.text'}
							p={3}
							borderRadius={4}
						>
							{props.description}{' '}
							<Link
								href={`https://etherscan.io/${hash}`}
								color={'primary.text'}
							>
								Etherscan
							</Link>
						</Box>
					);
				}
			});
			props.setStep('registrationSuccess');
		} catch (e) {
			if (e instanceof TransactionExecutionError) {
				toast({
					description: e.shortMessage,
					position: 'top-right',
					status: 'loading',
					render: (props) => {
						return (
							<Box
								bgColor={'bg.error'}
								color={'primary.text'}
								p={3}
								borderRadius={4}
							>
								{props.description}
							</Box>
						);
					}
				});
			}
		}
	};

	return (
		<Card>
			<Heading textAlign={'center'} size={'sm'} opacity={0.8}>
				Make a commitment
			</Heading>
			<Text
				textAlign={'center'}
				size={'sm'}
				color={'primary.text'}
				opacity={0.7}
			>
				Commit an domain name to secure it before registration.
			</Text>
			<Divider opacity={0.5} my={3} />

			<CircularCountdown initialTimer={80} isStart={isStartCountdown} />

			<Flex gap={3} mt={10}>
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
					onClick={() => handleCommitClick()}
				>
					Commit
				</Button>
			</Flex>
		</Card>
	);
}
