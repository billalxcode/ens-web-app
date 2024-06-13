import SearchItemProps from '@/interface/props/SearchItemProps';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import ClaimStatusButton from './Status/ClaimStatusButton';
import TakenStatusButton from './Status/TakenStatusButton';

export default function SearchItem(props: SearchItemProps) {
	const redirectToclaim = () => {
		location.replace(`/claim/${props.username}`)
	}

	const redirectToProfile = () => {
		location.replace(`/profile/${props.username}`)
	}

	return (
		<Flex
			justify={'space-between'}
			align={'center'}
			p={3}
			px={3}
			key={props.username}
			transition={'all .2s ease-in-out'}
			cursor={'pointer'}
			_hover={{ bgColor: 'bg.hover.card2' }}
		>
			<Text fontWeight={500} fontSize={15}>{props.username}</Text>
			{props.available ? <ClaimStatusButton handleClick={redirectToclaim}/> : <TakenStatusButton handleClick={redirectToProfile} />}
		</Flex>
	);
}
