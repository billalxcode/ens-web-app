'use client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { Web3Modal } from '../context/Web3Modal';

interface ThemeProps {
	children: React.ReactNode;
}

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false
};

const theme = extendTheme({
	config,
	colors: {
		primary: {
			text: '#f8f5f8C8',
			bold: '#5e73e8',
			secondary: '#36ab61',
			warning: '#ff9900',
			error: '#dc3545'
		},
		bg: {
			body: '#111827',
			body2: '#192339',
			card: '#202e4b',
			card2: '#202d49',
			error: '#dc3545',
			success: '#36ab61',
			secondary: '#CFB6FC',
			skeletonStart: '#393939',
			skeletonEnd: '#494949',
			button: {
				primary: '#5e83ff',
				secondary: '#3d4c6c',
				hover: {
					primary: '#605ee8',
					secondary: '#52607c'
				},
				active: {
					primary: '#5e8ae8',
					secondary: '#243352'
				},
				disabled: {
					primary: '#6f96ea'
				}
			},
			hover: {
				card2: '#182237'
			}
		},
		border: {
			input: '#3A3E48',
			hover: {
				input: '#494e5b'
			}
		}
	},
	styles: {
		global: () => ({
			body: {
				bg: 'bg.body',
				color: 'primary.text'
			}
		})
	}
});

export default function Theme(props: ThemeProps) {
	return (
		<ChakraProvider theme={theme}>
			<Web3Modal>{props.children}</Web3Modal>
		</ChakraProvider>
	);
}
