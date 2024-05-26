'use client';
import { Box, Container, Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import Home from '../ui/Home';
import CircleDecorations from '../components/Decorations/CircleDecorations';
import Footer from '../components/Footer';

export default function Page() {
	return (
		<>
			<CircleDecorations />
			<Header />
			<Flex justify={'center'} align={'center'} h={'80vh'}>
				<Home />
			</Flex>

			<Footer />
		</>
	);
}
