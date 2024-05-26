import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react';
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
		<Box mt={500}>
			<Flex flexDirection={'column'}>
				<Flex justify={'center'} align={'center'}>
					<Card>
						<Flex
							flexDirection={'column'}
							justify={'center'}
							align={'center'}
						>
							<Heading size={'lg'} mb={2}>
								Your web3 username
							</Heading>
							<Text mx={30} textAlign={'center'}>
								Your identity across web3, one name for all your
								crypto addresses, and your decentralised
								website.
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

				<HowItWorks />
			</Flex>
		</Box>
	);
}
