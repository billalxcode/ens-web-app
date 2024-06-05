import { Text } from '@chakra-ui/react';
import React from 'react';

export default function Available() {
	return (
		<Text
			size={'sm'}
			fontWeight={300}
			color={'bg.success'}
			textTransform={'uppercase'}
		>
			Available
		</Text>
	);
}
