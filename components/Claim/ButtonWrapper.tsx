'use client';
import ButtonWrapperProps from '@/interface/props/ButtonWrapperProps';
import { Button, Skeleton } from '@chakra-ui/react';
import {
	useWeb3Modal,
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers/react';
import { Eip1193Provider } from 'ethers';
import { BigNumberish } from 'ethers';
import { BrowserProvider, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

export default function ButtonWrapper(props: ButtonWrapperProps) {
	const [isLoading, setIsLoading] = useState(true);
	const { open: openModal } = useWeb3Modal();
	const { isConnected, address: walletAddress } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

	const [walletBalance, setWalletBalance] = useState<BigNumberish>(0);

	useEffect(() => {
		(async () => {
			if (isConnected) {
				const provider = new BrowserProvider(
					walletProvider as Eip1193Provider
				);

				const balance = await provider.getBalance(walletAddress || '');
				setWalletBalance(balance);
			}
			setIsLoading(false);
		})();
	}, [isConnected]);

	const renderContent = () => {
		if (!isLoading && !isConnected) {
			return (
				<Button
					w={'full'}
					p={7}
					bgColor={'bg.button.primary'}
					color={'primary.text'}
					transition={'all .5s ease-in-out'}
					_hover={{
						bgColor: 'bg.button.hover.primary'
					}}
					_active={{
						bgColor: 'bg.button.active.primary'
					}}
					onClick={() => openModal()}
				>
					Connect Wallet
				</Button>
			);
		} else {
			if (parseFloat(ethers.formatEther(walletBalance)) == 0) {
				return (
					<Button
						w={'full'}
						p={7}
						bgColor={'bg.button.primary'}
						transition={'all .5s ease-in-out'}
						cursor={'default'}
						color={'primary.text'}
						_hover={{
							bgColor: 'bg.button.disabled.primary'
						}}
						_disabled={{
							bgColor: 'bg.button.disabled.primary'
						}}
						isDisabled
					>
						Insufficient Balance
					</Button>
				);
			} else {
				return (
					<Button
						w={'full'}
						p={7}
						transition={'all .5s ease-in-out'}
						bgGradient={'linear(to-l, #8aa9f2, #9a76ff)'}
						bgSize={'100 100'}
						color={'primary.text'}
						_hover={{
							transform: 'translateY(-5px)'
						}}
						_active={{
							bgGradient: 'linear(to-l, #8aa9f2, #9a76ff)'
						}}
						onClick={() => props.setStep('commit')}
					>
						Next
					</Button>
				);
			}
		}
	};

	return (
		<Skeleton
			mt={10}
			isLoaded={!isLoading}
			borderRadius={5}
			startColor={'bg.skeletonStart'}
			endColor={'bg.skeletonEnd'}
		>
			{renderContent()}
		</Skeleton>
	);
}
