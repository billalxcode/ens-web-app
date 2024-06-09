import { getAvailable } from '@ensdomains/ensjs/public';
import client from './client';
import { ensNormalize } from 'ethers';

export default async function isNameAvailable(name: string) {
	const result = await getAvailable(client, { name: ensNormalize(name) });
	return result;
}
