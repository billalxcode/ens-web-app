const wordlists = [
	'crypto',
	'blockchain',
	'dapp',
	'walllet',
	'token',
	'dev',
	'nft',
	'defi',
	'dao',
	'web3'
];

export default function suggestDomains(username: string) {
	let suggestions: Array<string> = [];

	wordlists.forEach((v) => {
		suggestions.push(`${username}${v}.eth`);
		suggestions.push(`${v}${username}.eth`);
	});

	return suggestions;
}
