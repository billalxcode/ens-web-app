import BackgroundParticles from '@/components/Decorations/BackgroundParticles';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileProps from '@/interface/props/ProfileProps';
import Profile from '@/ui/Profile';
import { Flex } from '@chakra-ui/react';
import React from 'react';

export default function page(props: ProfileProps) {
	return (
		<>
			<BackgroundParticles />
			<Header />

			<Flex justify={'center'} align={'center'} h={'80vh'}>
				<Profile params={props.params} />
			</Flex>
			<Footer />
		</>
	);
}
