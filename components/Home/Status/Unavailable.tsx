import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function Unavailable() {
	return (
		<Text
			size={'sm'}
			fontWeight={300}
			color={'bg.error'}
			textTransform={'uppercase'}
		>
			Unavailable
		</Text>
	);
}
