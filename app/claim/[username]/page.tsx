import CircleDecorations from '@/components/Decorations/CircleDecorations';
import Footer from '@/components/Footer';
import ClaimProps from '@/interface/props/ClaimProps';
import Claim from '@/ui/Claim';
import Header from '@/components/Header';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import BackgroundParticles from '@/components/Decorations/BackgroundParticles';

export default function Page(props: ClaimProps) {
	return (
		<>
			<BackgroundParticles />
			<CircleDecorations />
			<Header />

			<Flex justify={'center'} align={'center'} h={'80vh'}>
				<Claim params={props.params} />
			</Flex>
			<Footer />
		</>
	);
}
