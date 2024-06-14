import { Box, Collapse, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SearchItem from './SearchItem';
import SearchBoxProps from '@/interface/props/SearchBoxProps';

export default function SearchBox(props: SearchBoxProps) {
	return (
		<Collapse
			in={!props.hidden}
			transition={{ exit: { delay: 0.3 }, enter: { delay: 0.3 } }}
		>
			<Box
				w={300}
				position={"absolute"}
				bgColor={'bg.card2'}
				boxShadow={'lg'}
			>
				<Flex flexDirection={'column'}>
					<SearchItem username={props.domain.domain} available={props.domain.available} />
				</Flex>
			</Box>
		</Collapse>
	);
}
