import BackgroundParticles from '@/components/Decorations/BackgroundParticles';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileProps from '@/interface/props/ProfileProps';
import Profile from '@/ui/Profile';
import React from 'react';

export default function page(props: ProfileProps) {
	return (
		<>
			<BackgroundParticles />
			<Header />

			<Profile params={props.params} />

			<Footer />
		</>
	);
}
