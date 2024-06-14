import { SignTypedDataReturnType } from 'viem';

export type AvatarUploadResult =
	| {
			message: string;
	  }
	| {
			error: string;
			status: number;
	  };

const resolveAvatarURL = (name: string, chainName: string) => {
	let baseURL = 'https://euc.li';
	if (chainName !== 'Ethereum') {
		baseURL = `${baseURL}/${chainName.toLowerCase()}`;
	}
	const endpoint = `${baseURL}/${name}`;
	return endpoint;
};

const uploadAvatar = async (
	name: string,
	dataURL: string,
	signature: SignTypedDataReturnType,
	expiry: string,
	chainName: string
) => {
	const endpoint = resolveAvatarURL(name, chainName);
	const request = await fetch(endpoint, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			expiry,
			dataURL,
			sig: signature
		})
	});
	const response = (await request.json()) as AvatarUploadResult;
    return response
};

export { resolveAvatarURL, uploadAvatar };
