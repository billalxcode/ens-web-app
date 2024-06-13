import TakenStatusButtonProps from '@/interface/props/TakenStatusButtonProps';
import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';

export default function TakenStatusButton(props: TakenStatusButtonProps) {
	return (
		<Button
			bgColor={'primary.warning'}
			color={'primary.text'}
			size={'sm'}
			_hover={{
				bgColor: 'primary.warning'
			}}
			_active={{
				bgColor: "primary.warning"
			}}
			onClick={() => props.handleClick()}
		>
			Taken
		</Button>
		// <Text
		// 	size={'sm'}
		// 	fontWeight={300}
		// 	color={'primary.warning'}
		// 	textTransform={'uppercase'}
		// >
		// 	Taken
		// </Text>
	);
}
