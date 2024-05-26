import { Text } from '@chakra-ui/react';
import React from 'react';

export default function Available() {
	return (
		<Text
			size={'sm'}
			fontWeight={'semibold'}
			color={'bg.success'}
			textTransform={'uppercase'}
		>
			Available
		</Text>
	);
}
