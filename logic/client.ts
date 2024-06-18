import { addEnsContracts } from '@ensdomains/ensjs';
import {
	createPublicClient,
	createWalletClient as walletCLient,
	custom,
	http
} from 'viem';
import { mainnet, sepolia } from 'viem/chains';

const chain = process.env.NEXT_PUBLIC_APP_ENV == 'prod' ? mainnet : sepolia;

const client = createPublicClient({
	chain: addEnsContracts(chain),
	transport: http(
		process.env.NEXT_PUBLIC_APP_ENV == 'prod'
			? 'https://mainnet.infura.io/v3/c47fcf77394e40e78eac21970ed5feeb'
			: `https://sepolia.infura.io/v3/cfa6ae2501cc4354a74e20432507317c`
	)
});

const createWalletClient = (provider: any) => {
	const clientWallet = walletCLient({
		chain: addEnsContracts(chain),
		transport: custom(provider as any)
	});
	return clientWallet;
};

export { createWalletClient };
export default client;
