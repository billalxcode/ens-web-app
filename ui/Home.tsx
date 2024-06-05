import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Input,
	Text
} from '@chakra-ui/react';
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
				<Flex
					mt={50}
					align={'center'}
					justify={'center'}
					gap={40}
					flexDirection={'row-reverse'}
				>
					<Box>
						<Image
							src="/images/atlanta-animation.gif"
							h={'500px'}
						/>
						<Box
							bg={'bg.secondary'}
							w={300}
							h={300}
							position={'absolute'}
							filter={'blur(200px)'}
							opacity={0.5}
							top={400}
							right={250}
						/>
					</Box>
					<Flex w={400} flexDirection={'column'} gap={3}>
						<Heading size={'sm'} fontWeight={500}>
							Atlanta Name Service
						</Heading>
						<Heading size={'lg'}>
							Atlanta, a decentralized blockchain name service
							marketplace.
						</Heading>
						<Box>
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
						{/* <Button p={8}>Search</Button> */}
					</Flex>
					{/* <Card>
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
					</Card> */}
				</Flex>
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
									FIND YOUR DOMAIN
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
									PROCESS COMITMENT
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
									FINISH REGISTRATION
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
