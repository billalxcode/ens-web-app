'use client';
import { Button } from '@chakra-ui/react';
import {
	useWeb3Modal,
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers/react';
import { BigNumberish } from 'ethers';
import { BrowserProvider, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

export default function ButtonWrapper() {
	const { open: openModal } = useWeb3Modal();
	const { isConnected, address: walletAddress } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

	const [walletBalance, setWalletBalance] = useState<BigNumberish>(0);

	useEffect(() => {
		(async () => {
			if (isConnected) {
				const provider = new BrowserProvider(walletProvider as any);

				const balance = await provider.getBalance(walletAddress || '');
				setWalletBalance(balance);
			}
		})();
	}, [isConnected, walletAddress, walletProvider]);

	if (!isConnected) {
		return (
			<Button
				w={'full'}
				mt={10}
				p={7}
				bgColor={'bg.button.primary'}
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
	}

	if (parseFloat(ethers.formatEther(walletBalance)) == 0) {
		return (
			<Button
				w={'full'}
				mt={10}
				p={7}
				bgColor={'bg.button.primary'}
				transition={'all .5s ease-in-out'}
				cursor={'default'}
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
	}
	return (
		<Button
			w={'full'}
			mt={10}
			p={7}
			bgColor={'bg.button.primary'}
			transition={'all .5s ease-in-out'}
			_hover={{
				bgColor: 'bg.button.hover.primary'
			}}
			_active={{
				bgColor: 'bg.button.active.primary'
			}}
			onClick={() => openModal()}
		>
			Next
		</Button>
	);
}
