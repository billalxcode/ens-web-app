import { addEnsContracts } from '@ensdomains/ensjs';
import {
	createPublicClient,
	createWalletClient as walletCLient,
	custom,
	http
} from 'viem';
// import { sepolia } from 'viem/chains';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
	chain: addEnsContracts(mainnet),
	transport: http()
});

const createWalletClient = (provider: any) => {
	const clientWallet = walletCLient({
		chain: addEnsContracts(mainnet),
		transport: custom(provider as any)
	});
	return clientWallet;
};

export { createWalletClient };
export default client;
