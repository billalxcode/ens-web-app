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
	getOwner
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
		`https://euc.li/sepolia/${props.params.username}`
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
				const name = ensNormalize(props.params.username);
				const avatarUrl = await getEnsAvatar(client, { name });
				const address = await getAddressRecord(client, {
					name: props.params.username,
					coin: 'ETH'
				});
				const owner = await getOwner(client, { name });
				const expiry = await getExpiry(client, { name });

				setEnsAvatar(
					avatarUrl ||
						`https://euc.li/sepolia/${props.params.username}`
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
		props.params.username,
		ensAvatar,
		ensAddress,
		ensOwner,
		expiryDate,
		isLoaded
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
