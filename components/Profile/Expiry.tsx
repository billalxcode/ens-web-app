import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import ButtonClipboard from '../ButtonClipboard';
import moment from 'moment';

export default function Expiry(props: { date: Date | undefined }) {
	if (props.date) {
		return (
			<Flex flexDirection={'column'} gap={2}>
				<Heading size={'sm'} color={'primary.text'}>
					Expired At
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
						{moment(props.date).format('LL')}
					</Text>
					<ButtonClipboard
						value={moment(props.date).format('LL') || ''}
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
