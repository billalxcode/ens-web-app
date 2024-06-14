'use client';
import Card from '@/components/Card';
import ProfileProps from '@/interface/props/ProfileProps';
import client from '@/logic/client';
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	Text,
	useDisclosure,
	useToast
} from '@chakra-ui/react';
import {
	GetExpiryReturnType,
	getAddressRecord,
	getExpiry,
	getOwner,
	getTextRecord
} from '@ensdomains/ensjs/public';
import { ensNormalize } from 'ethers';
import React, { useEffect, useState } from 'react';
import { getEnsAvatar } from 'viem/actions';
import Address from '@/components/Profile/Address';
import OwnerAddress from '@/components/Profile/OwnerAddress';
import moment from 'moment';
import { ContractFunctionExecutionError } from 'viem';
import Expiry from '@/components/Profile/Expiry';
import ModalExtendName from '@/components/Profile/Modal/ModalExtendName';
import ModalEditProfile from '@/components/Profile/Modal/ModalEditProfile';
import { resolveAvatarURL } from '@/logic/avatar';

export default function Profile(props: ProfileProps) {
	const toast = useToast();
	const {
		isOpen: isExtendNameOpen,
		onOpen: onExtendNameOpen,
		onClose: onExtendNameClose
	} = useDisclosure();
	const {
		isOpen: isEditProfileOpen,
		onOpen: onEditProfileOpen,
		onClose: onEditProfileClose
	} = useDisclosure();
	const [ensAvatar, setEnsAvatar] = useState(
		resolveAvatarURL(ensNormalize(props.params.username), client.chain.name)
	);
	const [ensAddress, setEnsAddress] = useState('');
	const [ensOwner, setEnsOwner] = useState('');
	const [isLoaded, setisLoaded] = useState(false);
	const [expiryDate, setExpiryDate] = useState<GetExpiryReturnType>({
		expiry: {
			value: BigInt(0),
			date: new Date()
		},
		status: 'expired',
		gracePeriod: 0
	});

	useEffect(() => {
		(async () => {
			try {
				console.log("Get name")
				const name = ensNormalize(props.params.username);
				let avatarUrl = await getEnsAvatar(client, { name });
				console.log("Get avatar")
				const avatarRecord = await getTextRecord(client, {
					name,
					key: 'avatar'
				});
				if (avatarRecord === null) {
					console.log("Set default avatar")
					avatarUrl =
						'data:image/svg+xml;base64,CiAgPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTAgMTEwIj4KICAgIDxkZWZzPgogICAgICA8bGluZWFyR3JhZGllbnQgaWQ9Imd6ciIgeDE9IjEwNi45NzUiIHkxPSIxMzYuMTU2IiB4Mj0iLTEyLjk4MTUiIHkyPSIxMy41MzQ3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMzEuNjM4IDEyOS44MzUpIHJvdGF0ZSgtMTQxLjE5NCkgc2NhbGUoMTg1LjU4MikiPgogICAgICAgIDxzdG9wIG9mZnNldD0iMC4xNTYyIiBzdG9wLWNvbG9yPSJoc2woMTUxLCA3MiUsIDkwJSkiIC8+CiAgICAgICAgPHN0b3Agb2Zmc2V0PSIwLjM5NTgiIHN0b3AtY29sb3I9ImhzbCgxNTEsIDczJSwgNzglKSIgLz4KICAgICAgICA8c3RvcCBvZmZzZXQ9IjAuNzI5MiIgc3RvcC1jb2xvcj0iaHNsKDIzMSwgNzUlLCA2MiUpIiAvPgogICAgICAgIDxzdG9wIG9mZnNldD0iMC45MDYzIiBzdG9wLWNvbG9yPSJoc2woMjQxLCA4MCUsIDQ3JSkiIC8+CiAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSJoc2woMjQxLCA4MiUsIDQ3JSkiIC8+CiAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8cGF0aAogICAgICBkPSJNMTEwIDU1QzExMCAyNC42MjQ0IDg1LjM3NTYgMCA1NSAwQzI0LjYyNDQgMCAwIDI0LjYyNDQgMCA1NUMwIDg1LjM3NTYgMjQuNjI0NCAxMTAgNTUgMTEwQzg1LjM3NTYgMTEwIDExMCA4NS4zNzU2IDExMCA1NVoiCiAgICAgIGZpbGw9InVybCgjZ3pyKSIgLz4KICA8L3N2Zz4KICAgIA==';
				}
				console.log("Get address record")
				const address = await getAddressRecord(client, {
					name: props.params.username,
					coin: 'ETH'
				});
				console.log("get owner")
				const owner = await getOwner(client, { name });
				console.log("Get expiry")
				const expiry = await getExpiry(client, { name });
				
				setEnsAvatar(
					avatarUrl || resolveAvatarURL(name, client.chain.name)
				);
				setEnsAddress(address?.value || '');
				setEnsOwner(owner?.owner || '');
				setExpiryDate(expiry);
				setisLoaded(true);
			} catch (e) {
				if (e instanceof ContractFunctionExecutionError) {
				}
			}
		})();
	}, [
		props.params.username
	]);

	return (
		<>
			<Flex
				flexDirection={'column'}
				justify={'center'}
				align={['normal', 'center']}
				mx={[3, 10]}
				h={'100vh'}
			>
				<Box mb={30}>
					<Flex flexDirection={'column'} gap={3}>
						<Skeleton
							isLoaded={isLoaded}
							borderRadius={5}
							w={'full'}
						>
							<Card>
								<Flex
									flexDirection={'column'}
									align={'center'}
									justify={'center'}
									gap={3}
								>
									<Image
										src={ensAvatar}
										w={100}
										borderRadius={50}
									/>
									<Flex
										flexDirection={'column'}
										align={'center'}
									>
										<Heading size={['sm', 'md']}>
											{props.params.username}
										</Heading>
										<Text
											fontSize={[8, 10]}
											color={'primary.secondary'}
											fontWeight={900}
										>
											Primary name
										</Text>
									</Flex>
									<Button
										size={'sm'}
										transition={'all .5s ease-in-out'}
										bgGradient={
											'linear(to-l, #8aa9f2, #9a76ff)'
										}
										bgSize={'100 100'}
										color={'primary.text'}
										_hover={{
											transform: 'translateY(-3px)'
										}}
										_active={{
											bgGradient:
												'linear(to-l, #8aa9f2, #9a76ff)'
										}}
									>
										Set Primary Name
									</Button>
								</Flex>
							</Card>
						</Skeleton>
						<Skeleton
							isLoaded={isLoaded}
							borderRadius={5}
							w={'full'}
						>
							<Card>
								<Flex flexDirection={'column'} gap={5}>
									<Address address={ensAddress} />
									<OwnerAddress address={ensOwner} />
									<Expiry date={expiryDate?.expiry.date} />
								</Flex>
								<Divider opacity={0.5} my={3} />
								<Flex justify={'space-between'}>
									<Button
										size={'sm'}
										transition={'all .5s ease-in-out'}
										bgGradient={
											'linear(to-l, #8aa9f2, #9a76ff)'
										}
										bgSize={'100 100'}
										fontWeight={600}
										color={'primary.text'}
										_hover={{
											transform: 'translateY(-3px)'
										}}
										_active={{
											bgGradient:
												'linear(to-l, #8aa9f2, #9a76ff)'
										}}
										onClick={() => onEditProfileOpen()}
									>
										Edit Profile
									</Button>
									<Button
										size={'sm'}
										transition={'all .5s ease-in-out'}
										bgGradient={
											'linear(to-l, #8aa9f2, #9a76ff)'
										}
										bgSize={'100 100'}
										color={'primary.text'}
										_hover={{
											transform: 'translateY(-3px)'
										}}
										_active={{
											bgGradient:
												'linear(to-l, #8aa9f2, #9a76ff)'
										}}
										onClick={() => onExtendNameOpen()}
									>
										Extend Name
									</Button>
								</Flex>
							</Card>
						</Skeleton>
					</Flex>
				</Box>
			</Flex>
			<ModalExtendName
				isOpen={isExtendNameOpen}
				onOpen={onExtendNameOpen}
				onClose={onExtendNameClose}
				username={props.params.username}
			/>
			<ModalEditProfile
				avatar={ensAvatar}
				name={props.params.username}
				isOpen={isEditProfileOpen}
				onOpen={onEditProfileOpen}
				onClose={onEditProfileClose}
			/>
		</>
	);
}
