'use client';
import React from 'react';
import Card from '../Card';
import {
	Button,
	Divider,
	Flex,
	Heading,
	Text
} from '@chakra-ui/react';
import RegistrationSuccessProps from '@/interface/props/RegistrationSuccess';

export default function RegistrationSuccess(props: RegistrationSuccessProps) {
	return (
		<Card>
			<Heading textAlign={'center'} size={'sm'} opacity={0.8}>
				Registration Successful
			</Heading>
			<Divider opacity={0.5} my={3} />
			<Text
				textAlign={'center'}
				size={'sm'}
				color={'primary.text'}
				opacity={0.7}
			>
				The name {props.name} has been successfully registered
			</Text>

			<Flex gap={3} mt={10}>
				<Button
					w={'full'}
					p={7}
					bgGradient={'linear(to-l, #8aa9f2, #9a76ff)'}
					transition={'all .5s ease-in-out'}
					color={'primary.text'}
					_hover={{
						transform: 'translateY(-5px)'
					}}
					_active={{
						bgColor: 'bg.button.active.primary'
					}}
					onClick={() => location.replace(`/profile/${props.name}`)}
				>
					View profile
				</Button>
			</Flex>
		</Card>
	);
}
