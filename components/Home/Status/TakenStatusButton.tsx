import TakenStatusButtonProps from '@/interface/props/TakenStatusButtonProps';
import { Button } from '@chakra-ui/react';
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
	);
}
