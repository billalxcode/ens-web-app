import { Box } from '@chakra-ui/react';
import React from 'react';

export default function CircleDecorations() {
	return (
		<>
			<Box>
				<Box
					w={500}
					h={500}
					borderRadius={200}
					bgColor={'bg.success'}
					position={'fixed'}
					zIndex={-9999}
					bottom={-60}
					left={-20}
					opacity={0.5}
					filter={'blur(300px)'}
				/>
				<Box
					w={500}
					h={500}
					borderRadius={200}
					bgColor={'bg.error'}
					position={'fixed'}
					zIndex={-9999}
					bottom={-60}
					right={-20}
					opacity={0.5}
					filter={'blur(300px)'}
				/>
			</Box>
		</>
	);
}
