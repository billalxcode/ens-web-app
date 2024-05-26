'use client';
import { Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import Home from '../ui/Home';
import Footer from '../components/Footer';
import BackgroundParticles from '@/components/Decorations/BackgroundParticles';

export default function Page() {
	return (
		<>
			<BackgroundParticles />
			{/* <CircleDecorations /> */}
			<Header />
			<Flex justify={'center'} align={'center'} h={'80vh'} zIndex={10}>
				<Home />
			</Flex>

			<Footer />
		</>
	);
}
