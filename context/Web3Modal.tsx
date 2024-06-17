'use client';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import NodeProps from '../interface/props/NodeProps';

const projectId = '722464b71db715c225fa67d639163064';

const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}
const sepolia = {
	chainId: 11155111,
	name: 'Sepolia',
	explorerUrl: 'https://sepolia.etherscan.io',
	rpcUrl: 'https://rpc2.sepolia.org',
	currency: 'ETH'
};

let chain = process.env.NEXT_PUBLIC_APP_ENV == 'prod' ? mainnet : sepolia;

// const devnet = {
// 	chainId: 31337,
// 	name: 'Localhost',
// 	currency: 'ETH',
// 	explorerUrl: '',
// 	rpcUrl: 'http://localhost:8545'
// };

const web3Metadata = {
	name: 'Localhost',
	description: 'Localhost',
	url: 'http://localhost:3000',
	icons: ['https://avatars.mywebsite.com/']
};

const ethersConfig = defaultConfig({
	metadata: web3Metadata,
	enableEIP6963: true,
	enableInjected: true,
	enableCoinbase: true,
	rpcUrl: chain.rpcUrl,
	defaultChainId: 31337
});

createWeb3Modal({
	ethersConfig,
	chains: [chain],
	projectId,
	enableAnalytics: true,
	enableOnramp: true
});

export function Web3Modal(props: NodeProps) {
	return props.children;
}
