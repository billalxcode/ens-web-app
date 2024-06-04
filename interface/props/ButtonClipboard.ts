import { ButtonProps } from '@chakra-ui/react';

export default interface ButtonClipboardProps extends ButtonProps {
	value: string;
	timeout?: number;
}
