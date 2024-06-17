'use client';
import Header from '../components/Header';
import Home from '../ui/Home';
import Footer from '../components/Footer';
import { Flex } from '@chakra-ui/react';

export default function Page() {
	return (
		<Flex minH={'100vh'} flexDirection={'column'}>
			<Header />
			<Home />

			<Footer />
		</Flex>
	);
}
