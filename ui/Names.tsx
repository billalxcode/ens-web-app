'use client';
import React, { useEffect, useState } from 'react';
import {
	Flex,
	Box,
	Table,
	TableContainer,
	TableCaption,
	Tbody,
	Tr,
	Td,
	Text,
	Heading,
	Image,
	Input,
	Divider,
	Skeleton
} from '@chakra-ui/react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import {
	GetNamesForAddressReturnType,
	NameWithRelation,
	getNamesForAddress
} from '@ensdomains/ensjs/subgraph';
import client from '@/logic/client';
import Card from '@/components/Card';
import moment from 'moment';
import { getAvatarRecord, resolveAvatarURL } from '@/logic/avatar';
import { getEnsAvatar } from 'viem/actions';
import { getTextRecord } from '@ensdomains/ensjs/public';
import Avatar from '@/components/Avatar';

export default function Names() {
	const { isConnected, address } = useWeb3ModalAccount();
	const [names, setNames] = useState<GetNamesForAddressReturnType>();
	const [searchName, setSearchName] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			if (isConnected && typeof address !== 'undefined') {
				const namesForAddress = await getNamesForAddress(client, {
					address: address as `0x${string}`,
					filter: {
						searchString: searchName,
						searchType: 'name'
					}
				});
				setNames(namesForAddress);
			}
			setIsLoaded(true);
		})();
	}, [isConnected, address, searchName]);

	return (
		<Flex
			justify={'center'}
			align={'center'}
			flexDirection={'column'}
			mx={[3, 10]}
			my={10}
		>
			<Box mb={30} w={['full', 600]}>
				<Heading mb={2} size={'lg'} textAlign={'center'}>
					Names
				</Heading>
				<Text textAlign={'center'}>Your web3 names</Text>
			</Box>
			<Skeleton
				isLoaded={isLoaded}
				borderRadius={5}
				w={'full'}
				startColor={'bg.skeletonStart'}
				endColor={'bg.skeletonEnd'}
			>
				<Flex
					justify={'center'}
					align={'center'}
					flexDirection={'column'}
				>
					<Card>
						<Box>
							<Input
								placeholder="Search names or addresses"
								p={[6, 8]}
								w={'full'}
								onChange={(e) => setSearchName(e.target.value)}
								borderColor={'border.input'}
								_hover={{
									borderColor: 'border.hover.input'
								}}
								_focusVisible={{
									borderColor: 'bg.blue',
									boxShadow: 'md'
								}}
							/>
						</Box>
						<Divider opacity={0.7} my={5} />
						<TableContainer>
							<Table>
								<TableCaption color={'primary.text'}>
									Your atlanta names
								</TableCaption>
								<Tbody>
									{names?.map((v) => {
										return (
											<Tr
												key={v.id}
												cursor={'pointer'}
												_hover={{
													bgColor: 'bg.hover.card2'
												}}
												onClick={() =>
													location.replace(
														`/profile/${v.name?.normalize()}`
													)
												}
											>
												<Td pr={[5, 200]}>
													<Flex gap={4}>
														<Avatar
															name={
																v.name?.normalize() ||
																''
															}
														/>
														<Flex
															flexDirection={
																'column'
															}
														>
															<Heading
																size={'md'}
																fontSize={14}
																fontWeight={500}
															>
																{v.name}
															</Heading>
															<Text
																fontSize={12}
																opacity={0.8}
															>
																Expires{' '}
																{moment(
																	v.expiryDate
																		?.date
																).fromNow()}
															</Text>
														</Flex>
													</Flex>
												</Td>
												<Td color={'primary.secondary'}>
													Owned
												</Td>
											</Tr>
										);
									})}
								</Tbody>
							</Table>
						</TableContainer>
					</Card>
				</Flex>
			</Skeleton>
		</Flex>
	);
}
