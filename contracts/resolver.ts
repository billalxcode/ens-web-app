const ResolverAddress =
	process.env.NEXT_PUBLIC_APP_ENV == 'prod'
		? '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63'
		: '0x8FADE66B79cC9f707aB26799354482EB93a5B7dD';

export { ResolverAddress };
