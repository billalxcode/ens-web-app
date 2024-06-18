import BackgroundParticles from '@/components/Decorations/BackgroundParticles';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Settings from '@/ui/Settings';
import { Flex } from '@chakra-ui/react';
import React from 'react';

export default function page() {
	return (
		<Flex minH={'100vh'} flexDirection={'column'}>
			<BackgroundParticles />
			<Header />

			<Settings />
			<Footer />
		</Flex>
	);
}
