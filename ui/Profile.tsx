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
	Text
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

export default function Profile(props: ProfileProps) {
	const [ensAvatar, setEnsAvatar] = useState(
		`https://avatars.jakerunzer.com/${props.params.username}`
	);
	const [ensAddress, setEnsAddress] = useState('');
	const [ensOwner, setEnsOwner] = useState('');
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
					`https://avatars.jakerunzer.com/${props.params.username}`
			);
			setEnsAddress(address?.value || '');
			setEnsOwner(owner?.owner || '');
			setExpiryDate(expiry);
		})();
	});

	return (
		<Flex
			flexDirection={'column'}
			justify={'center'}
			align={'center'}
			h={'100vh'}
		>
			<Box mb={30}>
				<Card>
					<Flex justify={'center'} align={'center'} gap={5}>
						<Image src={ensAvatar} w={[45, 50]} />
						<Flex flexDirection={'column'}>
							<Heading size={['sm', 'md']}>
								{props.params.username}
							</Heading>
							<Text
								fontSize={[8, 10]}
								color={'primary.secondary'}
								fontWeight={900}
							>
								Your primary name
							</Text>
						</Flex>
					</Flex>
					<Divider opacity={0.5} my={3} />
					<Flex flexDirection={'column'} gap={5}>
						<Address address={ensAddress} />
						<OwnerAddress address={ensOwner} />
						<Flex flexDirection={'column'} gap={2}>
							<Heading size={'sm'} color={'primary.text'}>
								Expired At
							</Heading>
							<Flex
								bgColor={'bg.card2'}
								p={3}
								borderRadius={5}
								justify={'space-between'}
								align={'center'}
							>
								<Text fontSize={[13, 15]}>
									{moment(expiryDate?.expiry.date).format(
										'LL'
									)}
								</Text>
							</Flex>
						</Flex>
					</Flex>
					<Divider opacity={0.5} my={3} />
					<Flex justify={'space-between'}>
						<Button
							p={[3, 5]}
							transition={'all .5s ease-in-out'}
							bgGradient={'linear(to-l, #8aa9f2, #9a76ff)'}
							bgSize={'100 100'}
							_hover={{
								transform: 'translateY(-5px)'
							}}
							_active={{
								bgGradient: 'linear(to-l, #8aa9f2, #9a76ff)'
							}}
						>
							Edit Profile
						</Button>
						<Button
							p={[3, 5]}
							transition={'all .5s ease-in-out'}
							bgGradient={'linear(to-l, #8aa9f2, #9a76ff)'}
							bgSize={'100 100'}
							_hover={{
								transform: 'translateY(-5px)'
							}}
							_active={{
								bgGradient: 'linear(to-l, #8aa9f2, #9a76ff)'
							}}
						>
							Extend Name
						</Button>
					</Flex>
				</Card>
			</Box>
		</Flex>
	);
}
