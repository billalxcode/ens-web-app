import { Box, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

export default function Loading() {
	return (
		<Box
			w={'full'}
			h={'full'}
			position={'absolute'}
			zIndex={10000}
			bgColor={'bg.body'}
		>
			<Spinner />
			<Text>Loading</Text>
		</Box>
	);
}
