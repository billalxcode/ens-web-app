import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	Button,
	Flex,
	Box,
	Input,
	Text,
	Image,
	useToast,
	useDisclosure,
	Heading,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription
} from '@chakra-ui/react';
import ModalEditProfileProps from '@/interface/props/modal/ModalEditProfileProps';
import ModalUploadAvatar from './ModalUploadAvatar';
import { getResolver } from '@ensdomains/ensjs/public';
import client, { createWalletClient } from '@/logic/client';
import { ensNormalize } from 'ethers';
import { ResolverAddress } from '@/contracts/resolver';
import { setResolver } from '@ensdomains/ensjs/wallet';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';

export default function ModalEditProfile(props: ModalEditProfileProps) {
	const toast = useToast();
	const inputAvatarRef = useRef<HTMLInputElement>(null);
	const { walletProvider } = useWeb3ModalProvider()
	const {
		isOpen: isUploadAvatarOpen,
		onOpen: onUploadAvatarOpen,
		onClose: onUploadAvatarClose
	} = useDisclosure();
	const [avatar, setAvatar] = useState('');
	const [isUpdateResolver, setisUpadateResolver] = useState(false);
	const [reasonMessage, setReasonMessage] = useState('');

	useEffect(() => {
		(async () => {
			const name = ensNormalize(props.name);
			const resolver = await getResolver(client, { name });

			if (resolver === null) {
				setReasonMessage('Resolver not found');
				setisUpadateResolver(true);
			} else if (resolver !== ResolverAddress) {
				setReasonMessage('Resolver does not match');
				setisUpadateResolver(true);
			}
		})();
	}, [props.name]);

	const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files?.length > 0) {
			const file = target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setAvatar(reader.result as string);
				onUploadAvatarOpen();
			};
			reader.onerror = () => {
				console.log('Error bang wkwkwk');
			};
		} else {
			toast({
				status: 'error',
				title: 'Error',
				description: 'Please select the file correctly'
			});
		}
	};

	const handleUpdateResolver = async () => {
		const wallet = createWalletClient(walletProvider)
		const account = (await wallet.getAddresses())[0]

		const resolverPromise = setResolver(wallet, {
			name: ensNormalize(props.name),
			resolverAddress: ResolverAddress,
			contract: "nameWrapper",
			account
		})
		toast.promise(resolverPromise, {
			success: {
				title: 'Success',
				description: 'Resolver has been updated'
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
		await resolverPromise
	}

	const handleAvatarOnSuccess = () => {
		onUploadAvatarClose();
		props.onClose();
	};

	const renderActionButton = () => {
		if (isUpdateResolver) {
			return (
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
					onClick={() => handleUpdateResolver()}
				>
					Update Resolver
				</Button>
			);
		} else {
			return (
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
				>
					Save
				</Button>
			);
		}
	};

	const renderContent = () => {
		if (reasonMessage === '') {
			return (
				<>
					<Input
						type="file"
						accept="image/*"
						display={'none'}
						ref={inputAvatarRef}
						onChange={(e) => handleUploadImage(e)}
					/>
					<Button
						w={'full'}
						transition={'all 0.5s ease-in-out'}
						bgColor={'bg.button.secondary'}
						color={'primary.text'}
						_hover={{
							bgColor: 'bg.button.hover.secondary'
						}}
						onClick={() => inputAvatarRef.current?.click()}
					>
						Choice a file
					</Button>
				</>
			);
		} else {
			return <Alert status='warning'>
				<AlertIcon />
				<AlertTitle>Reason</AlertTitle>
				<AlertDescription>{ reasonMessage }</AlertDescription>
			</Alert>;
		}
	};
	return (
		<>
			<ModalUploadAvatar
				handleOnSuccess={handleAvatarOnSuccess}
				name={props.name}
				avatar={avatar}
				isOpen={isUploadAvatarOpen}
				onOpen={onUploadAvatarOpen}
				onClose={onUploadAvatarClose}
			/>
			<Modal
				isOpen={props.isOpen}
				onClose={props.onClose}
				isCentered
				motionPreset={'slideInBottom'}
			>
				<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
				<ModalContent bgColor={'bg.card'}>
					<ModalHeader textAlign={'center'}>
						Edit your profile
					</ModalHeader>
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
							{renderContent()}
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
						{renderActionButton()}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
