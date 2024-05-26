import getPrices from './prices';

export default async function estimateRegistration(
	name: string,
	years: number
) {
	const { base, premium } = await getPrices(name, years);

	const hasPremium = !!premium && premium > BigInt(0);

	return {
		registrationFee: base,
		premiumFee: premium,
		hasPremium: hasPremium
	};
}
