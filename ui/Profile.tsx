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
	Skeleton,
	Text,
	useDisclosure,
	useToast
} from '@chakra-ui/react';
import {
	GetExpiryReturnType,
	getAddressRecord,
	getExpiry,
	getName,
	getOwner,
	getTextRecord
} from '@ensdomains/ensjs/public';
import { ensNormalize } from 'ethers';
import React, { useEffect, useState } from 'react';
import { getEnsAvatar } from 'viem/actions';
import Address from '@/components/Profile/Address';
import OwnerAddress from '@/components/Profile/OwnerAddress';
import { ContractFunctionExecutionError } from 'viem';
import Expiry from '@/components/Profile/Expiry';
import ModalExtendName from '@/components/Profile/Modal/ModalExtendName';
import ModalEditProfile from '@/components/Profile/Modal/ModalEditProfile';
import { resolveAvatarURL } from '@/logic/avatar';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import ModalSetPrimary from '@/components/Profile/Modal/ModalSetPrimary';

export default function Profile(props: ProfileProps) {
	const toast = useToast();
	const {
		isOpen: isExtendNameOpen,
		onOpen: onExtendNameOpen,
		onClose: onExtendNameClose
	} = useDisclosure();
	const { address: MyAddress, isConnected } = useWeb3ModalAccount();
	const {
		isOpen: isEditProfileOpen,
		onOpen: onEditProfileOpen,
		onClose: onEditProfileClose
	} = useDisclosure();
	const {
		isOpen: isSetPrimaryNameOpen,
		onOpen: onSetPrimaryNameOpen,
		onClose: onSetPrimaryNameClose
	} = useDisclosure();
	const [ensAvatar, setEnsAvatar] = useState(
		resolveAvatarURL(ensNormalize(props.params.username), client.chain.name)
	);
	const [ensAddress, setEnsAddress] = useState('');
	const [ensOwner, setEnsOwner] = useState('');
	const [isLoaded, setisLoaded] = useState(false);
	const [isPrimaryName, setIsPrimaryName] = useState(false);

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
				const name = ensNormalize(props.params.username);
				let avatarUrl = await getEnsAvatar(client, { name });
				const avatarRecord = await getTextRecord(client, {
					name,
					key: 'avatar'
				});
				if (avatarRecord === null) {
					avatarUrl =
						'data:image/svg+xml;base64,CiAgPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTAgMTEwIj4KICAgIDxkZWZzPgogICAgICA8bGluZWFyR3JhZGllbnQgaWQ9Imd6ciIgeDE9IjEwNi45NzUiIHkxPSIxMzYuMTU2IiB4Mj0iLTEyLjk4MTUiIHkyPSIxMy41MzQ3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMzEuNjM4IDEyOS44MzUpIHJvdGF0ZSgtMTQxLjE5NCkgc2NhbGUoMTg1LjU4MikiPgogICAgICAgIDxzdG9wIG9mZnNldD0iMC4xNTYyIiBzdG9wLWNvbG9yPSJoc2woMTUxLCA3MiUsIDkwJSkiIC8+CiAgICAgICAgPHN0b3Agb2Zmc2V0PSIwLjM5NTgiIHN0b3AtY29sb3I9ImhzbCgxNTEsIDczJSwgNzglKSIgLz4KICAgICAgICA8c3RvcCBvZmZzZXQ9IjAuNzI5MiIgc3RvcC1jb2xvcj0iaHNsKDIzMSwgNzUlLCA2MiUpIiAvPgogICAgICAgIDxzdG9wIG9mZnNldD0iMC45MDYzIiBzdG9wLWNvbG9yPSJoc2woMjQxLCA4MCUsIDQ3JSkiIC8+CiAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSJoc2woMjQxLCA4MiUsIDQ3JSkiIC8+CiAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8cGF0aAogICAgICBkPSJNMTEwIDU1QzExMCAyNC42MjQ0IDg1LjM3NTYgMCA1NSAwQzI0LjYyNDQgMCAwIDI0LjYyNDQgMCA1NUMwIDg1LjM3NTYgMjQuNjI0NCAxMTAgNTUgMTEwQzg1LjM3NTYgMTEwIDExMCA4NS4zNzU2IDExMCA1NVoiCiAgICAgIGZpbGw9InVybCgjZ3pyKSIgLz4KICA8L3N2Zz4KICAgIA==';
				}
				const address = await getAddressRecord(client, {
					name: props.params.username,
					coin: 'ETH'
				});
				const owner = await getOwner(client, { name });
				const expiry = await getExpiry(client, { name });
				const ensName = await getName(client, {
					address: MyAddress as `0x${string}`
				});

				if (ensName.name === name) {
					console.log('Set primary name');
					setIsPrimaryName(true);
				}
				setEnsAvatar(
					avatarUrl || resolveAvatarURL(name, client.chain.name)
				);
				setEnsAddress(address?.value || '');
				setEnsOwner(owner?.owner || '');
				setExpiryDate(expiry);
				setisLoaded(true);
				console.log(isPrimaryName);
			} catch (e) {
				if (e instanceof ContractFunctionExecutionError) {
				}
			}
		})();
	}, [props.params.username, isConnected, isPrimaryName]);

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
										{isPrimaryName ? (
											<Text
												fontSize={[8, 10]}
												color={'primary.secondary'}
												fontWeight={900}
											>
												Your Primary name
											</Text>
										) : null}
									</Flex>
									{!isPrimaryName && MyAddress == ensOwner ? (
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
											onClick={() =>
												onSetPrimaryNameOpen()
											}
										>
											Set Primary Name
										</Button>
									) : null}
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
								<Flex
									justify={
										MyAddress == ensOwner
											? 'space-between'
											: 'end'
									}
								>
									{MyAddress == ensOwner ? (
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
									) : null}
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
			<ModalSetPrimary
				isOpen={isSetPrimaryNameOpen}
				onOpen={onSetPrimaryNameOpen}
				onClose={onSetPrimaryNameClose}
				name={props.params.username}
				owner={ensOwner}
			/>
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
