import BackgroundParticles from '@/components/Decorations/BackgroundParticles';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Names from '@/ui/Names';
import React from 'react';

export default function page() {
	return (
		<>
			<BackgroundParticles />
			<Header />
			<Names />

			<Footer />
		</>
	);
}
