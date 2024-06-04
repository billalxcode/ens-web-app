import { addEnsContracts } from '@ensdomains/ensjs';
import {
	createPublicClient,
	createWalletClient as walletCLient,
	custom,
	http
} from 'viem';
import { sepolia } from 'viem/chains';
const client = createPublicClient({
	chain: addEnsContracts(sepolia),
	transport: http()
});

const createWalletClient = (provider: any) => {
	const clientWallet = walletCLient({
		chain: addEnsContracts(sepolia),
		transport: custom(provider as any)
	});
	return clientWallet;
};

export { createWalletClient };
export default client;
