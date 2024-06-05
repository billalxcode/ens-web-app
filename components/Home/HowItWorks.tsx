import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function HowItWorks() {
	return (
		<Flex
			justify={'center'}
			align={'center'}
			flexDirection={'column'}
			mt={200}
			zIndex={100}
			borderRadius={5}
		>
			<Heading size={'xl'} mb={10}>
				How it works
			</Heading>

			<Flex gap={30}>
				<Box w={400} bgColor={'bg.card'} p={5} borderRadius={5}>
					<Flex h={70} align={'center'} gap={3}>
						<Flex
							justify={'center'}
							align={'center'}
							borderRadius={100}
						>
							<Heading size={'md'}>1.</Heading>
						</Flex>
						<Heading size={'md'}>Find your name</Heading>
					</Flex>
					<Text textAlign={'justify'} fontWeight={200}>
						Connect your wallet, enter your desired name
						(YOUR_NAME.eth), and search. Select an available domain,
						choose the duration, and click "Next." Remember to pay
						the gas fee.
					</Text>
				</Box>
				<Box w={400} bgColor={'bg.card'} p={5} borderRadius={5}>
					<Flex h={70} align={'center'} gap={3}>
						<Flex
							justify={'center'}
							align={'center'}
							borderRadius={100}
						>
							<Heading size={'md'}>2.</Heading>
						</Flex>
						<Heading size={'md'}>Process commitment</Heading>
					</Flex>
					<Text textAlign={'justify'} fontWeight={200}>
						You can create a profile now or later. On the commitment
						page, click "commit." The timer ensures no one else
						registers the name before you. Complete the second
						transaction to finalize.
					</Text>
				</Box>
				<Box w={400} bgColor={'bg.card'} p={5} borderRadius={5}>
					<Flex h={70} align={'center'} gap={3}>
						<Flex
							justify={'center'}
							align={'center'}
							borderRadius={100}
						>
							<Heading size={'md'}>3.</Heading>
						</Flex>
						<Heading size={'md'}>Finish the registration</Heading>
					</Flex>
					<Text textAlign={'justify'} fontWeight={200}>
						After a brief wait, click "Register" in the Atlanta app
						and confirm the second transaction in your wallet. Your
						ETH domain is now yours. Check your wallet's NFT area or
						use an NFT marketplace to view it.
					</Text>
				</Box>
			</Flex>
		</Flex>
	);
}
