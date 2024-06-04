import ButtonClipboardProps from '@/interface/props/ButtonClipboard';
import { Button } from '@chakra-ui/react';
import { faCheck, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export default function ButtonClipboard(props: ButtonClipboardProps) {
	let clickTimeout = props.timeout ?? 1000;
	const [copied, setCopied] = useState(false);

	const handleClick = () => {
		setCopied(true);
		navigator.clipboard.writeText(props.value);
		setTimeout(() => setCopied(false), clickTimeout);
	};

	return (
		<Button {...props} onClick={() => handleClick()}>
			<FontAwesomeIcon icon={copied ? faCheck : faClipboard} />
		</Button>
	);
}
