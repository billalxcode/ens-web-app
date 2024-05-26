import { getAvailable } from '@ensdomains/ensjs/public';
import client from './client';

export default async function isNameAvailable(name: string) {
	const result = await getAvailable(client, { name });
	return result;
}
