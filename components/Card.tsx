import { Box } from '@chakra-ui/react';
import React from 'react';
import NodeProps from '../interface/props/NodeProps';

export default function Card(props: NodeProps) {
	return (
		<Box
			p={5}
			bgColor={'bg.card'}
			boxShadow={'sm'}
			w={600}
			borderRadius={5}
			transition={'all .2s ease-in-out'}
			zIndex={2}
		>
			{props.children}
		</Box>
	);
}
