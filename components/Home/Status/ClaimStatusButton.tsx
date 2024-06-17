import ClaimStatusButtonProps from '@/interface/props/ClaimStatusButtonProps';
import { Button } from '@chakra-ui/react';
import React from 'react';

export default function ClaimStatusButton(props: ClaimStatusButtonProps) {
	return (
		<Button
			bgColor={'bg.success'}
			color={'primary.text'}
			_hover={{
				bgColor: 'bg.success'
			}}
			_active={{
				bgColor: 'bg.success'
			}}
			size={'sm'}
			onClick={() => props.handleClick()}
		>
			Claim
		</Button>
	);
}
