'use client';
import React, { useRef, useState } from 'react';
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
import { randomSecret } from '@ensdomains/ensjs/utils';
import { commitName, registerName } from '@ensdomains/ensjs/wallet';
import client, { createWalletClient } from '@/logic/client';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import { getPrice } from '@ensdomains/ensjs/public';
import { TransactionExecutionError } from 'viem';
import { ethers } from 'ethers';
import ToasterSuccess from '../Toaster/ToasterSuccess';
import ToasterLoading from '../Toaster/ToasterLoading';

export default function FormCommit(props: FormCommitProps) {
	const toast = useToast();
	const { walletProvider } = useWeb3ModalProvider();
	const [isStartCountdown, setIsStartCountdown] = useState(false);
	const startCountdown = () => {};

	const handleCommitClick = async () => {
		try {
			toast({
				description: 'Please check your wallet for confirmation',
				position: 'top-right',
				status: 'loading',
				render: (props) => {
					return (
						<ToasterLoading description={props.description} />
					);
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
				secret,
				account: walletOwner
			};

			const commitmentHash = await commitName(wallet, params);
			toast({
				description: 'Please wait for transaction receipt',
				position: 'top-right',
				status: 'loading',
				render: (props) => {
					return <ToasterLoading description={props.description} />;
				}
			});
			setIsStartCountdown(true);
			await client.waitForTransactionReceipt({ hash: commitmentHash }); // wait for commitment to finalise
			await new Promise((resolve) => setTimeout(resolve, 60 * 1_000)); // wait for commitment to be valid
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

			const { base, premium } = await getPrice(client, {
				nameOrNames: params.name,
				duration: params.duration
			});

			const value =
				((BigInt(base) + BigInt(premium)) * BigInt(110)) / BigInt(100); // add 10% to the price for buffer
			console.log(value)
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
			
			const hash = await registerName(wallet, { ...params, value });
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
				Commit an ENS domain name to secure it before registration.
			</Text>
			<Divider opacity={0.5} my={3} />

			<CircularCountdown initialTimer={60} isStart={isStartCountdown} />

			<Flex gap={3} mt={10}>
				<Button
					w={'full'}
					p={7}
					transition={'all .5s ease-in-out'}
					onClick={() => props.setStep('registration')}
				>
					Back
				</Button>
				<Button
					w={'full'}
					p={7}
					bgGradient={'linear(to-l, #8aa9f2, #9a76ff)'}
					transition={'all .5s ease-in-out'}
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
