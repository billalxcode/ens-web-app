'use client';
import {
	ChakraProvider,
	StyleFunctionProps,
	extendTheme
} from '@chakra-ui/react';
import React from 'react';
import { Web3Modal } from '../context/Web3Modal';

interface ThemeProps {
	children: React.ReactNode;
}

const theme = extendTheme({
	colors: {
		primary: {
			text: '#f8f5f8',
			bold: '#5e73e8'
		},
		bg: {
			body: '#151515',
			card: '#1f1f1f',
			card2: '#272727',
			error: '#dc3545',
			success: '#36ab61',
			blue: '#5e73e8',
			hover: {
				card2: '#2a2a2a'
			}
		}
	},
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				bg: 'bg.body',
				color: 'primary.text'
			}
		})
	}
});

export default function Theme(props: ThemeProps) {
	return (
		<Web3Modal>
			<ChakraProvider theme={theme}>{props.children}</ChakraProvider>
		</Web3Modal>
	);
}
