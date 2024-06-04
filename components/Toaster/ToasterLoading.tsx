import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

export default function ToasterLoading(props: {
	description: React.ReactNode;
}) {
	return (
		<Box
			bgColor={'bg.button.primary'}
			color={'primary.text'}
			p={3}
			borderRadius={4}
		>
			<Flex gap={3}>
				<Spinner speed=".5s" /> <Text>{props.description}</Text>
			</Flex>
		</Box>
	);
}
