'use client';
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Input,
	Text,
	VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Card from '../components/Card';
import ClaimProps from '@/interface/props/ClaimProps';
import RegistrationYearSelection from '@/components/Claim/RegistrationYearSelection';

export default function Claim(props: ClaimProps) {
	const [year, setYear] = useState<number>(1);

	return (
		<Box>
			<Flex flexDirection={'column'}>
				<Flex
					justify={'center'}
					align={'center'}
					flexDirection={'column'}
				>
					<Box mb={30}>
						<Heading mb={2} size={'lg'}>
							Register Domain Name
						</Heading>
						<Text>
							You are registering available name:{' '}
							{props.params.username}
						</Text>
					</Box>
					<Card>
						<RegistrationYearSelection
							year={year}
							setYear={(x) => setYear(x)}
						/>

						<Divider opacity={0.5} my={3} />
						<Flex flexDirection={'column'} gap={3}>
							<Flex
								justify={'space-between'}
								flexDirection={'row'}
							>
								<Text>Registration Priod</Text>
								<Text>{year} Year</Text>
							</Flex>
							<Flex
								justify={'space-between'}
								flexDirection={'row'}
							>
								<Text>Estimate Network Fee</Text>
								<Text>1 ETH</Text>
							</Flex>
							<Flex
								justify={'space-between'}
								flexDirection={'row'}
							>
								<Text>Estimated Total</Text>
								<Text>0 ETH</Text>
							</Flex>
						</Flex>

						<Button w={'full'} mt={10} p={7} bgColor={'bg.blue'}>
							Connect Wallet
						</Button>
					</Card>
				</Flex>
			</Flex>
		</Box>
	);
}
