import { Box } from '@chakra-ui/react';
import React from 'react';

export default function ToasterSuccess(props: { description: React.ReactNode }) {
	return (
		<Box
			bgColor={'bg.button.primary'}
			color={'primary.text'}
			p={3}
			borderRadius={4}
		>
			{props.description}
		</Box>
	);
}
