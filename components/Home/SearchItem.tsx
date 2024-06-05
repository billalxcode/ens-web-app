import SearchItemProps from '@/interface/props/SearchItemProps';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Available from './Status/Available';
import Unavailable from './Status/Unavailable';

export default function SearchItem(props: SearchItemProps) {
	const handleClick = () => {
		const username = props.username;

		if (props.available) {
			location.replace(`/claim/${username}`);
		} else {
			location.replace(`/profile/${username}`);
		}
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
			onClick={() => handleClick()}
		>
			<Text fontWeight={500}>{props.username}</Text>
			{props.available ? <Available /> : <Unavailable />}
		</Flex>
	);
}
