import { addEnsContracts } from '@ensdomains/ensjs';
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

const client = createPublicClient({
	chain: addEnsContracts(sepolia),
	transport: http()
});

export default client;
