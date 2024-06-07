'use client';
import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import React from 'react';

export default function Header() {
	return (
		<Flex
			justify={'space-between'}
			p={3}
			align={'center'}
			bgColor={'bg.body'}
			boxShadow={'md'}
			// position={'absolute'}
			zIndex={100}
			w={'full'}
		>
			<Flex align={'center'}>
				<Image
					src="/images/Atlanta.png"
					alt="Atlanta Logo"
					width={[12, 10, 20]}
				/>
				<Link href="/" textDecoration={'none'}>
					<Heading
						color={'primary.text'}
						textDecoration={'none'}
						size={['sm', 'sm', 'md']}
						mx={[0, 2, 3]}
						opacity={0.8}
					>
						Atlanta Domains
					</Heading>
				</Link>
			</Flex>
			<w3m-button />
		</Flex>
	);
}
