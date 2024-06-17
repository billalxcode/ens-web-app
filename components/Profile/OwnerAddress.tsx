import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import ButtonClipboard from '../ButtonClipboard';

export default function OwnerAddress(props: { address: string }) {
	if (props.address) {
		return (
			<Flex flexDirection={'column'} gap={2}>
				<Heading size={'sm'} color={'primary.text'}>
					Owner
				</Heading>
				<Flex
					bgColor={'bg.card2'}
					p={3}
					borderRadius={5}
					justify={'space-between'}
					align={'center'}
					boxShadow={'md'}
				>
					<Text fontSize={[13, 15]}>
						{`${props.address.substring(0, 14)}...${props.address.substring(props.address.length - 14, props.address.length)}` ||
							''}
					</Text>
					<ButtonClipboard
						value={props.address || ''}
						size={'sm'}
						timeout={1500}
					/>
				</Flex>
			</Flex>
		);
	} else {
		return null;
	}
}
