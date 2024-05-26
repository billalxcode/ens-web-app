import { BrowserProvider } from 'ethers';

export default async function estimateGasPrice(walletProvider: any) {
	const provider = new BrowserProvider(walletProvider);
	const feeData = await provider.getFeeData();
	return feeData.gasPrice;
}
