import { Box, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

export default function Footer() {
	return (
		<Box as='footer' w={'full'} h={50} bg={'bg.card'} position={'absolute'} bottom={0}>
			<Flex
				justify={'center'}
				align={'center'}
				h={50}
				flexDirection={'column'}
			>
				<Text fontSize={[10, 15]}>Copyright (c) 2024 <Link href='/'>Atlanta Domains</Link>. All right reserved.</Text>
			</Flex>
		</Box>
	);
}
