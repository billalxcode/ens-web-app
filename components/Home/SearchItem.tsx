import SearchItemProps from '@/interface/props/SearchItemProps';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Available from './Status/Available';
import Unavailable from './Status/Unavailable';

export default function SearchItem(props: SearchItemProps) {
	const handleClick = () => {
		const username = props.username;

		location.replace(`/claim/${username}`);
	};

	return (
		<Flex
			justify={'space-between'}
			align={'center'}
			p={3}
			px={7}
			key={props.username}
			transition={'all .2s ease-in-out'}
			cursor={'pointer'}
			_hover={{ bgColor: 'bg.hover.card2' }}
			onClick={(e) => handleClick()}
		>
			<Text fontWeight={'semibold'}>{props.username}</Text>
			{props.available ? <Available /> : <Unavailable />}
		</Flex>
	);
}
