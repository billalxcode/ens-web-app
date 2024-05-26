import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function Unavailable() {
	return (
		<Box bgColor={'bg.error'} p={1} borderRadius={2}>
			<Text size={'sm'} color={'primary.text'}>
				Unavailable
			</Text>
		</Box>
	);
}
