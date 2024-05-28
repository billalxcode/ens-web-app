import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function HowItWorks() {
	return (
		<Flex
			justify={'center'}
			align={'center'}
			flexDirection={'column'}
			my={100}
		>
			<Heading size={'xl'} mb={10}>
				How it works
			</Heading>

			<Flex gap={50}>
				<Box w={300}>
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
					<Text textAlign={'justify'}>
						Connect your wallet, then enter your preferred name
						(YOUR_NAME.eth) in the search field. Next, choose a
						domain name that is accessible. Click on the name if it
						matches the one you were looking for. Choose the time
						duration, then click "Next." Be aware that you will
						always be responsible for paying the gas fee, which is
						frequently more expensive than the cost of the domain
						itself.
					</Text>
				</Box>
				<Box w={300}>
					<Flex h={70} align={'center'} gap={3}>
						<Flex
							justify={'center'}
							align={'center'}
							borderRadius={100}
						>
							<Heading size={'md'}>2.</Heading>
						</Flex>
						<Heading size={'md'}>Process commitment </Heading>
					</Flex>
					<Text textAlign={'justify'}>
						Before processing the commitment, you can create your
						profile or choose to skip it so that you can create your
						profile later. On the commitment page, click "commit."
						This timer on the commitment page helps prevent others
						from registering the name before you do. Your name is
						not registered until you've completed the second
						transaction.
					</Text>
				</Box>
				<Box w={300}>
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
					<Text textAlign={'justify'}>
						The Atlanta app will display the "Register" button after
						waiting a while. Click on it. Next, be sure to verify in
						your wallet that this is the second transaction. You can
						now proudly own your own ETH domain. Congratulations!
						That being said, you ought to be able to see your domain
						in your wallet's NFT area. Because not every wallet has
						that feature, you can use NFT marketplaces or
						alternative portfolio tracking apps.
					</Text>
				</Box>
			</Flex>
		</Flex>
	);
}
