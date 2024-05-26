'use client';
import RegistrationYearSelectionProps from '@/interface/props/RegistrationYearSelectionProps';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function RegistrationYearSelection(
	props: RegistrationYearSelectionProps
) {
	const [value, setValue] = useState<string>('1 YEAR');

	const handleIncreaseButton = () => {
		const nYear = props.year + 1;
		props.setYear(nYear);
		setValue(`${nYear} YEAR`);
	};

	const handleDecreaseButton = () => {
		if (props.year >= 1) {
			const nYear = props.year - 1;
			props.setYear(nYear);
			setValue(`${nYear} YEAR`);
		}
	};

	return (
		<Box>
			<Flex bgColor={'bg.card2'} p={3} borderRadius={10} gap={2}>
				<Button onClick={() => handleDecreaseButton()}>-</Button>
				<Input
					size={'lg'}
					fontWeight={'bold'}
					variant={'unstyled'}
					textAlign={'center'}
					value={value}
					readOnly
				/>
				<Button onClick={() => handleIncreaseButton()}>+</Button>
			</Flex>
		</Box>
	);
}
