import { addEnsContracts } from '@ensdomains/ensjs';
import { createPublicClient, custom, http } from 'viem';
import { sepolia } from 'viem/chains';

const client = createPublicClient({
	chain: addEnsContracts(sepolia),
	transport: http()
});

const createWalletClient = (provider: any) => {
	const clientWallet = createPublicClient({
		chain: addEnsContracts(sepolia),
		transport: custom(provider as any)
	});
	return clientWallet;
};

export { createWalletClient };
export default client;
