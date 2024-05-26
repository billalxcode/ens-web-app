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
						<Heading size={'md'}>
							Participate in the auction
						</Heading>
					</Flex>
					<Text textAlign={'justify'}>
						To get started, mint a domain name NFT by paying $100 in
						$TOMI tokens. As the first minter, you'll receive a
						Partner NFT that entitles you to 25% of all future sales
						royalties for that domain. When someone places the first
						bid on your domain, you'll receive 20% of the difference
						between the bid price and the $100 minting fee, plus 25%
						of the final sale price as royalties
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
						<Heading size={'md'}>
							Mint a domain and becoome a partner
						</Heading>
					</Flex>
					<Text textAlign={'justify'}>
						Anyone can place a higher bid on a domain by offering at
						least 15% more than the current highest bid, paid in
						$TOMI tokens. If your bid is outbid, you'll receive your
						original purchase price back, plus an additional 20% of
						the difference between your bid and the new highest bid.
						The original minter (Partner) will receive 25% of the
						difference between the new bid and the previous highest
						bid as royalties. All payments and rewards are handled
						through the tomi Domains dApp.
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
						<Heading size={'md'}>
							Place a bid and own a domain
						</Heading>
					</Flex>
					<Text textAlign={'justify'}>
						To win a domain, place a bid that is at least 15% higher
						than the current highest bid price. When you outbid
						someone, the previous highest bidder will receive their
						original bid amount back, plus an additional 20% of
						their bid price. Once the auction ends on May 15, 2024,
						the highest bidder will permanently own the domain URL
						and its associated NFT, with no renewal fees required.
					</Text>
				</Box>
			</Flex>
		</Flex>
	);
}
