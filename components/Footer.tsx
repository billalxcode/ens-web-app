import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function Footer() {
	return (
		<Box w={'full'} h={50} bg={'bg.card'} position={'fixed'} bottom={0}>
			<Flex
				justify={'center'}
				align={'center'}
				h={50}
				flexDirection={'column'}
			>
				<Text>Copyright (c) 2024 Your Sites. All right reserved.</Text>
			</Flex>
		</Box>
	);
}
