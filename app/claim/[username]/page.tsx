import Footer from '@/components/Footer';
import ClaimProps from '@/interface/props/ClaimProps';
import Claim from '@/ui/Claim';
import Header from '@/components/Header';
import React from 'react';
import BackgroundParticles from '@/components/Decorations/BackgroundParticles';

export default function Page(props: ClaimProps) {
	return (
		<>
			<BackgroundParticles />
			<Header />

			<Claim params={props.params} />
			<Footer />
		</>
	);
}
