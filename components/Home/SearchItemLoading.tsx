import { Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

export default function SearchItemLoading() {
	return (
		<Flex
			justify={'center'}
			align={'center'}
			p={3}
			px={7}
			transition={'all .2s ease-in-out'}
			gap={5}
		>
			<Spinner speed="1s" size={'md'} />
			<Text>Loading</Text>
		</Flex>
	);
}
