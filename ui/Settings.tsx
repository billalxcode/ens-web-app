'use client';
import Card from '@/components/Card';
import ModalSetPrimary from '@/components/Profile/Modal/ModalSetPrimary';
import ModalChooseName from '@/components/Settings/Modal/ModalChooseName';
import client, { blockExplorer } from '@/logic/client';
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Link,
	Skeleton,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Thead,
	Tr,
	useDisclosure
} from '@chakra-ui/react';
import { getName } from '@ensdomains/ensjs/public';
import {
	GetNameHistoryReturnType,
	getNameHistory
} from '@ensdomains/ensjs/subgraph';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import React, { useEffect, useState } from 'react';

export default function Settings() {
	const {
		onOpen: onChooseNameOpen,
		onClose: onChooseNameClose,
		isOpen: isChooseNameOpen
	} = useDisclosure();
	const {
		onOpen: onSetPrimaryNameOpen,
		onClose: onSetPrimaryNameClose,
		isOpen: isSetPrimaryNameOpen
	} = useDisclosure();

	const { isConnected, address } = useWeb3ModalAccount();
	const [isLoaded, setIsLoaded] = useState(false);
	const [histories, setHistores] = useState<GetNameHistoryReturnType>();
	const [nameSelected, setNameSelected] = useState('');

	useEffect(() => {
		(async () => {
			if (isConnected && address) {
				let name = await getName(client, { address });
				if (name !== null) {
					const historiesSubgraphs = await getNameHistory(client, {
						name: name.name.normalize()
					});
					setHistores(historiesSubgraphs);
				}
			}
			setIsLoaded(true);
		})();
	}, [isConnected, address]);

	const onSelectedName = (name: string) => {
		onChooseNameClose();
		setNameSelected(name);
		onSetPrimaryNameOpen();
	};

	return (
		<>
			<Flex
				justify={'center'}
				align={'center'}
				flexDirection={'column'}
				mx={[3, 10]}
				my={10}
				mb={100}
			>
				<Box mb={30} w={['full', 600]}>
					<Heading mb={2} size={'lg'} textAlign={'center'}>
						Settings
					</Heading>
					<Text textAlign={'center'}>Setting up your name</Text>
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
						gap={5}
						flexDirection={'column'}
					>
						<Card>
							<Flex flexDirection={'column'} gap={3}>
								<Heading size={'sm'}>Primary Name</Heading>
								<Text color={'primary.name'} fontSize={14}>
									A primary name links your address to a name,
									allowing dApps to display a name as your
									profile when connected to them. Learn about
									primary names
								</Text>
								<Button
									p={4}
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
									onClick={() => onChooseNameOpen()}
								>
									Choose Name
								</Button>
							</Flex>
						</Card>
						<Card>
							<Heading size={'sm'}>History</Heading>
							<Divider opacity={0.7} my={5} />

							<TableContainer>
								<Table variant={''}>
									<TableCaption color={'primary.text'}>
										Your atlanta histories name
									</TableCaption>
									<Tbody>
										{histories?.domainEvents?.map((v) => {
											return (
												<Tr key={v.id}>
													<Td>
														<Flex
															gap={2}
															flexDirection={
																'column'
															}
														>
															<Text>
																{v.type}
															</Text>
															<Link
																as={'a'}
																href={`${blockExplorer}/${v.transactionID}`}
																target="_blank"
															>
																<Flex gap={2}>
																	<FontAwesomeIcon
																		icon={
																			faArrowUpRightFromSquare
																		}
																	/>
																	Explore
																</Flex>
															</Link>
														</Flex>
													</Td>
													<Td>
														Confirmed at block{' '}
														{v.blockNumber}
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

			<ModalSetPrimary
				isOpen={isSetPrimaryNameOpen}
				onOpen={onSetPrimaryNameOpen}
				onClose={onSetPrimaryNameClose}
				name={nameSelected}
				owner={address || ''}
			/>
			<ModalChooseName
				onSelect={onSelectedName}
				onOpen={onChooseNameOpen}
				onClose={onChooseNameClose}
				isOpen={isChooseNameOpen}
			/>
		</>
	);
}
