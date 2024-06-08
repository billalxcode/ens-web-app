import { getPrice } from '@ensdomains/ensjs/public';
import client from './client';
import { PaymentAbi, PaymentAddress } from '@/contracts/payment';

async function getPaymentPrices(name: string, years: number) {
	const duration = years * 60 * 60 * 24 * 365;

	const result = await client.readContract({
		address: PaymentAddress,
		abi: PaymentAbi,
		functionName: 'getPrices',
		args: [name, duration]
	});
	return result;
}

export default async function getPrices(name: string, years: number) {
	const duration = years * 60 * 60 * 24 * 365;

	return await getPrice(client, { nameOrNames: name, duration: duration });
}

export { getPaymentPrices };
