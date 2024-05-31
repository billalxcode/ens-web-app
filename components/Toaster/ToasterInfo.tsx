import { Box } from '@chakra-ui/react';
import React from 'react'

export default function ToasterInfo(props: { description: string }) {
  return (
		<Box
			bgColor={'bg.primary'}
			color={'primary.text'}
			p={3}
			borderRadius={4}
		>
			{props.description}
		</Box>
  );
}
