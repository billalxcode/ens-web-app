import { Box, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

export default function Footer() {
	return (
		<Box w={'full'} h={50} bg={'bg.card'} bottom={0} zIndex={1000000}>
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
