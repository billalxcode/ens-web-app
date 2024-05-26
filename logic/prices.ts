import { getPrice } from '@ensdomains/ensjs/public';
import client from './client';

export default async function getPrices(name: string, years: number) {
	const duration = years * 60 * 60 * 24 * 365;
	console.log(duration);
	const result = await getPrice(client, {
		nameOrNames: name,
		duration: duration
	});
	return result;
}
