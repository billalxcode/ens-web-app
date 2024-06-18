'use client';
import { Box, Button, Flex, Heading, Image, Input } from '@chakra-ui/react';
import React, { KeyboardEvent, useState } from 'react';
import SearchBox from '../components/Home/SearchBox';
import HowItWorks from '../components/Home/HowItWorks';
import { ensNormalize } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import isNameAvailable from '@/logic/available';
import SearchStates from '@/interface/states/SearchStates';

export default function Home() {
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [domain, setDomain] = useState<SearchStates>({
		domain: '',
		available: false
	});
	const [searchHidden, setSearchHidden] = useState(true);

	const searchDomain = async () => {
		try {
			if (searchQuery.trim() == '') return;
			const availbale = await isNameAvailable(searchQuery + '.eth');
			setDomain({
				domain: searchQuery + '.eth',
				available: availbale
			});
		} catch (e: any) {}
	};

	const handleSearchDomain = () => {
		if (searchQuery.trim() == "") {
			setSearchLoading(false)
			setSearchHidden(false)
		} else {
			setSearchLoading(true)
			setSearchHidden(true)
			searchDomain()
			setTimeout(() => {
				setSearchLoading(false)
				setSearchHidden(false)
			}, 1000)
		}
	};

	const checkSpecialChar = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key == 'Enter') handleSearchDomain();
		if (!/[0-9a-z]/i.test(event.key)) {
			event.preventDefault();
		}
	};

	const handleInputChange = (text: string) => {
		if (text.trim() == "") return
		const textNormalized = ensNormalize(text);
		setSearchQuery(textNormalized);
	};

	return (
		<>
			<Flex flexDirection={'column'} h={['100vh', '100vh']} mx={[2, 0]}>
				<Flex
					mt={70}
					align={'center'}
					justify={'center'}
					gap={[10, 30]}
					flexDirection={['column-reverse', 'row']}
				>
					<Flex
						w={['full', 500]}
						flexDirection={'column'}
						align={'center'}
						gap={[0, 2, 3]}
					>
						<Heading
							size={'sm'}
							fontWeight={500}
							textAlign={'center'}
						>
							Atlanta Name Service
						</Heading>
						<Heading size={'lg'} textAlign={'center'}>
							Atlanta, a decentralized blockchain name service
							marketplace.
						</Heading>
						<Flex mt={18} gap={2} align={"center"} justify={"start"}>
							<Box>
								<Input
									placeholder="Search names or addresses"
									p={[6, 8]}
									w={300}
									onKeyDown={(e) => checkSpecialChar(e)}
									onChange={(e) =>
										handleInputChange(e.target.value)
									}
									borderColor={'border.input'}
									_hover={{
										borderColor: 'border.hover.input'
									}}
									_focusVisible={{
										borderColor: 'bg.blue',
										boxShadow: 'md'
									}}
								/>
								<SearchBox
									hidden={searchHidden}
									searchQuery={searchQuery}
									domain={domain}
								/>
							</Box>
							<Button
								p={[6, 8]}
								bgGradient={'linear(to-l, #8aa9f2, #9a76ff)'}
								transition={'all .5s ease-in-out'}
								color={'primary.text'}
								_hover={{
									transform: 'translateY(-5px)'
								}}
								_active={{
									bgColor: 'bg.button.active.primary'
								}}
								onClick={() => handleSearchDomain()}
							>
								{searchLoading ? (
									<FontAwesomeIcon icon={faSpinner} spin />
								) : (
									<FontAwesomeIcon icon={faSearch} />
								)}
							</Button>
						</Flex>
					</Flex>
					<Box>
						<Image
							src="/images/atlanta-animation.gif"
							w={['200px', '500px']}
						/>
						<Box
							bg={'bg.secondary'}
							w={300}
							h={300}
							position={'absolute'}
							filter={'blur(200px)'}
							opacity={0.5}
							top={400}
							right={350}
						/>
					</Box>
				</Flex>
			</Flex>

			<Box w={'full'} bg={'bg.body2'} pb={100}>
				<Flex
					flexDirection={'column'}
					justify={'center'}
					align={'center'}
					boxShadow={'xl'}
				>
					<Box
						w={['full', 300, 900]}
						bgColor={'bg.card2'}
						position={'absolute'}
					>
						<Flex p={[5, 10]}>
							<Flex
								w={['full', 200]}
								gap={4}
								align={'center'}
								flexDirection={'column'}
							>
								<Image
									src="/images/search.svg"
									w={[10, 30, 50]}
								/>
								<Heading
									fontSize={[11, 10, 20]}
									textAlign={'center'}
								>
									FIND YOUR DOMAIN
								</Heading>
							</Flex>
							<Flex
								w={['full', 200]}
								gap={4}
								align={'center'}
								flexDirection={'column'}
							>
								<Image
									src="/images/partner.svg"
									w={[10, 30, 50]}
								/>
								<Heading
									fontSize={[11, 10, 20]}
									textAlign={'center'}
								>
									PROCESS COMITMENT
								</Heading>
							</Flex>
							<Flex
								w={['full', 200]}
								gap={4}
								align={'center'}
								flexDirection={'column'}
							>
								<Image
									src="/images/auction.svg"
									w={[10, 30, 50]}
								/>
								<Heading
									fontSize={[11, 10, 20]}
									textAlign={'center'}
								>
									FINISH REGISTRATION
								</Heading>
							</Flex>
							<Flex
								w={['full', 200]}
								gap={4}
								align={'center'}
								flexDirection={'column'}
							>
								<Image
									src="/images/manage.svg"
									w={[10, 30, 50]}
								/>
								<Heading
									fontSize={[11, 10, 20]}
									textAlign={'center'}
								>
									MANAGE DOMAINS
								</Heading>
							</Flex>
						</Flex>
					</Box>
				</Flex>
				<HowItWorks />
			</Box>
		</>
	);
}
