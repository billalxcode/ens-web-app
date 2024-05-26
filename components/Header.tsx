'use client';
import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import React from 'react';

export default function Header() {
	return (
		<Box bgColor={'bg.body'} boxShadow={'md'} position={'sticky'}>
			<Flex justify={'space-between'} p={5} mx={5}>
				<Flex align={'center'}>
					<Image
						src="/images/ethereum-name-service-ens-logo.png"
						alt="ENS Logo"
						width={10}
					/>
					<Link href="/" textDecoration={'none'}>
						<Heading
							color={'primary.text'}
							textDecoration={'none'}
							size={'md'}
							mx={3}
						>
							Your Site
						</Heading>
					</Link>
				</Flex>
				<Box>
					<w3m-button />
				</Box>
			</Flex>
		</Box>
	);
}
