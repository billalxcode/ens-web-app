'use client';
import React, { useState } from 'react';
import Card from '../Card';
import { Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import CircularCountdown from '../CircularCountdown';
import FormCommitProps from '@/interface/props/FormCommitProps';
import { randomSecret } from '@ensdomains/ensjs/utils';
import { commitName } from '@ensdomains/ensjs/wallet';
import { createWalletClient } from '@/logic/client';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';

export default function FormCommit(props: FormCommitProps) {
	const { walletProvider } = useWeb3ModalProvider();
	const [isStartCountdown, setIsStartCountdown] = useState(false);
	const startCountdown = () => {};

	const handleCommitClick = async () => {
		const wallet = createWalletClient(walletProvider);
		const walletOwner = props.owner as `0x${string}`;

		const duration = props.duration * 60 * 60 * 24 * 365;
		const secret = randomSecret();

		const params = {};
		const commitmentHash = await commitName(wallet, {
			name: props.name,
			owner: walletOwner,
			duration: duration,
			secret: secret
		});
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
