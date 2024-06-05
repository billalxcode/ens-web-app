import { Box, Flex, Heading, Image, Input, Text } from '@chakra-ui/react';
import React, { KeyboardEvent, useState } from 'react';
import Card from '../components/Card';
import SearchBox from '../components/Home/SearchBox';
import HowItWorks from '../components/Home/HowItWorks';

export default function Home() {
	const [searchFocus, setSearchFocus] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const checkSpecialChar = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!/[0-9a-z]/i.test(event.key)) {
			event.preventDefault();
		}
	};

	return (
		<>
			<Flex
				flexDirection={'column'}
				justify={'center'}
				align={'center'}
				h={'100vh'}
			>
				<Card>
					<Flex
						flexDirection={'column'}
						justify={'center'}
						align={'center'}
						gap={2}
					>
						<Heading size={'lg'} mb={2}>
							Atlanta Name Service
						</Heading>
						<Text mx={30} textAlign={'center'}>
							Your identity across web3, one name for all your
							crypto addresses, and your decentralised website.
						</Text>
					</Flex>

					<Box w={'full'} transition={'all .2s ease-in-out'}>
						<Input
							placeholder="Search names or addresses"
							p={8}
							mt={10}
							onKeyDown={(e) => checkSpecialChar(e)}
							onFocus={() => setSearchFocus(true)}
							onBlur={() => setSearchFocus(false)}
							onChange={(e) => setSearchQuery(e.target.value)}
							_focusVisible={{
								borderColor: 'bg.blue',
								boxShadow: 'md'
							}}
						/>

						<SearchBox
							hidden={searchFocus && searchQuery !== ''}
							searchQuery={searchQuery}
						/>
					</Box>
				</Card>
			</Flex>

			<Box w={'full'} bg={'bg.card'} pb={100}>
				<Flex
					my={100}
					flexDirection={'column'}
					justify={'center'}
					align={'center'}
				>
					<Box w={900} bgColor={'bg.card2'} position={'absolute'}>
						<Flex p={10}>
							<Flex
								w={200}
								gap={4}
								align={'center'}
								flexDirection={'column'}
							>
								<Image src="/images/search.svg" w={50} />
								<Heading size={'md'} textAlign={'center'}>
									SEARCH FOR A DOMAIN
								</Heading>
							</Flex>
							<Flex
								w={200}
								gap={4}
								align={'center'}
								flexDirection={'column'}
							>
								<Image src="/images/partner.svg" w={50} />
								<Heading size={'md'} textAlign={'center'}>
									MINT & BECOME A PARTNER
								</Heading>
							</Flex>
							<Flex
								w={200}
								gap={4}
								align={'center'}
								flexDirection={'column'}
							>
								<Image src="/images/auction.svg" w={50} />
								<Heading size={'md'} textAlign={'center'}>
									WIN THE AUCTION
								</Heading>
							</Flex>
							<Flex
								w={200}
								gap={4}
								align={'center'}
								flexDirection={'column'}
							>
								<Image src="/images/manage.svg" w={50} />
								<Heading size={'md'} textAlign={'center'}>
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
