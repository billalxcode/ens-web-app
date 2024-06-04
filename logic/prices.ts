import { getPrice } from '@ensdomains/ensjs/public';
import client from './client';
import { PaymentAbi } from '@/contracts/payment';

async function getPaymentPrices(name: string, years: number) {
	const duration = years * 60 * 60 * 24 * 365;

	const result = await client.readContract({
		address: '0x3A9580b04Bf1e81c242Fb4b7F2e79e6794bfE8fE',
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
