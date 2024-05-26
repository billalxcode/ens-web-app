import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Theme from './theme';

const inter = Inter({
	subsets: ['latin'],
	preload: false
});

export const metadata: Metadata = {
	title: 'Chain Name Service',
	description: 'Claim your ENS'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Theme>{children}</Theme>
			</body>
		</html>
	);
}
