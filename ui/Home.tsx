'use client';
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Input,
	Text
} from '@chakra-ui/react';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import Card from '../components/Card';
import SearchBox from '../components/Home/SearchBox';
import HowItWorks from '../components/Home/HowItWorks';
import { ensNormalize } from 'ethers';

export default function Home() {
	const [searchFocus, setSearchFocus] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		
	}, []);
	const checkSpecialChar = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!/[0-9a-z]/i.test(event.key)) {
			event.preventDefault();
		}
	};

	const handleInputChange = (text: string) => {
		const textNormalized = ensNormalize(text);
		setSearchQuery(textNormalized);
	};

	return (
		<>
			<Flex flexDirection={'column'} h={['80vh', '80vh']} mx={[2, 0]}>
				<Flex
					mt={70}
					align={'center'}
					justify={'center'}
					gap={[10, 30]}
					flexDirection={['column-reverse', 'row']}
				>
					<Flex
						w={['full', 400]}
						flexDirection={'column'}
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
						<Box>
							<Input
								placeholder="Search names or addresses"
								p={8}
								mt={10}
								onKeyDown={(e) => checkSpecialChar(e)}
								onFocus={() => setSearchFocus(true)}
								onBlur={() => setSearchFocus(false)}
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
								hidden={searchFocus && searchQuery !== ''}
								searchQuery={searchQuery}
							/>
						</Box>
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
					my={100}
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
