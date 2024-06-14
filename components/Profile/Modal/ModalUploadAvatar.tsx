import ModalUploadAvatarProps from '@/interface/props/modal/ModalUploadAvatarProps';
import client, { createWalletClient } from '@/logic/client';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Flex,
	Image,
	useToast
} from '@chakra-ui/react';
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers/react';
import React from 'react';
import {
	Address,
	TransactionExecutionError,
	UserRejectedRequestError,
	WalletClient,
	bytesToHex
} from 'viem';
import { sha256 } from '@noble/hashes/sha256';
import { AvatarUploadResult, resolveAvatarURL, uploadAvatar } from '@/logic/avatar';
import { ensNormalize } from 'ethers';
import { setTextRecord } from '@ensdomains/ensjs/wallet';
import { ResolverAddress } from '@/contracts/resolver';
import { getTextRecord } from '@ensdomains/ensjs/public';

const dataURLToBytes = (dataURL: string) => {
	const base64 = dataURL.split(',')[1];
	const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
	console.log(bytes);
	return bytes;
};

export default function ModalUploadAvatar(props: ModalUploadAvatarProps) {
	const toast = useToast();
	const { walletProvider } = useWeb3ModalProvider();

	const generateSignature = async (
		wallet: WalletClient,
		account: Address,
		expiry: string
	) => {
		const urlHash = bytesToHex(sha256(dataURLToBytes(props.avatar)));

		const signaturePromise = wallet.signTypedData({
			account,
			primaryType: 'Upload',
			domain: {
				name: 'Ethereum Name Service',
				version: '1'
			},
			types: {
				Upload: [
					{ name: 'upload', type: 'string' },
					{ name: 'expiry', type: 'string' },
					{ name: 'name', type: 'string' },
					{ name: 'hash', type: 'string' }
				]
			},
			message: {
				upload: 'avatar',
				expiry,
				name: props.name,
				hash: urlHash
			}
		});

        toast.promise(signaturePromise, {
			success: {
				title: 'Success',
				description: 'Sign message successfully'
			},
			error: {
				title: 'Error',
				description: 'Failed to sign message'
			},
			loading: {
				title: 'Please wait',
				description: 'Please wait for sign message'
			}
		});
        const signature = await signaturePromise
		return signature;
	};

	const handleSignAndUploadClick = async () => {
		try {
			const expiry = `${Date.now() + 1000 * 60 * 60 * 24 * 7}`;

			const wallet = createWalletClient(walletProvider);
			const account = (await wallet.getAddresses())[0];
            
			const signature = await generateSignature(wallet, account, expiry);
			const uploaded: AvatarUploadResult = await uploadAvatar(
				ensNormalize(props.name),
				props.avatar,
				signature,
				expiry,
				client.chain.name
			);
			if ('message' in uploaded && uploaded.message == 'uploaded') {
				const name = ensNormalize(props.name);
				const value = resolveAvatarURL(name, client.chain.name);
				
				const avatarRecord = await getTextRecord(client, {
					name: ensNormalize(props.name),
					key: 'avatar'
				})
				
                if (avatarRecord === null) {
                    const avatarRecordPromise = setTextRecord(wallet, {
                        name,
                        key: 'avatar',
                        value: value,
                        resolverAddress: ResolverAddress as `0x${string}`,
                        account
                    });
                    toast.promise(avatarRecordPromise, {
                        success: {
                            title: 'Success',
                            description: 'Transaction success'
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
                    await avatarRecordPromise
                }
                props.handleOnSuccess()
            } else if ('error' in uploaded) {
				toast({
					status: 'error',
					title: 'Error',
					description: uploaded.error
				});
			}
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
				<ModalHeader textAlign={'center'}>Extend Name</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex
						justify={'center'}
						align={'center'}
						flexDirection={'column'}
						gap={5}
					>
						<Image
							src={props.avatar}
							w={100}
							h={100}
							borderRadius={50}
						/>
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
						Back
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
						onClick={() => handleSignAndUploadClick()}
					>
						Sign and upload
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
