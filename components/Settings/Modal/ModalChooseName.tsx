import React, { useEffect, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	useToast,
	TableContainer,
	Table,
	TableCaption,
	Tbody,
	Tr,
	Td,
	Flex,
	Heading,
	Text
} from '@chakra-ui/react';
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers/react';
import ModalChooseNameProps from '@/interface/props/modal/ModalChooseNameProps';
import Avatar from '@/components/Avatar';
import moment from 'moment';
import {
	GetNamesForAddressReturnType,
	getNamesForAddress
} from '@ensdomains/ensjs/subgraph';
import client from '@/logic/client';

export default function ModalChooseName(props: ModalChooseNameProps) {
	const toast = useToast();
	const { isConnected, address } = useWeb3ModalAccount();
	const [isLoading, setIsLoading] = useState(false);
	const [searchName, setSearchName] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [names, setNames] = useState<GetNamesForAddressReturnType>();

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
				console.log(namesForAddress);
				setNames(namesForAddress);
			}
			setIsLoaded(true);
		})();
	}, [props.isOpen, isConnected, address, searchName]);
	return (
		<Modal
			isOpen={props.isOpen}
			onClose={props.onClose}
			isCentered
			motionPreset={'slideInBottom'}
		>
			<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
			<ModalContent bgColor={'bg.card'}>
				<ModalHeader textAlign={'center'}>Choose Name</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<TableContainer
						h={'50vh'}
						overflowY={'scroll'}
						overflowX={'hidden'}
					>
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
											onClick={() => {
												console.log('Selected');
												props.onSelect(
													v.name?.normalize() || ''
												);
											}}
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
														flexDirection={'column'}
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
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
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
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
