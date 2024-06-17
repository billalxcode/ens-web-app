import { getTextRecord } from '@ensdomains/ensjs/public';
import { SignTypedDataReturnType } from 'viem';
import client from './client';
import { getEnsAvatar } from 'viem/actions';

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
	return response;
};

const getAvatarRecord = async (name: string) => {
	let avatar =
		'data:image/svg+xml;base64,CiAgPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTAgMTEwIj4KICAgIDxkZWZzPgogICAgICA8bGluZWFyR3JhZGllbnQgaWQ9Imd6ciIgeDE9IjEwNi45NzUiIHkxPSIxMzYuMTU2IiB4Mj0iLTEyLjk4MTUiIHkyPSIxMy41MzQ3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMzEuNjM4IDEyOS44MzUpIHJvdGF0ZSgtMTQxLjE5NCkgc2NhbGUoMTg1LjU4MikiPgogICAgICAgIDxzdG9wIG9mZnNldD0iMC4xNTYyIiBzdG9wLWNvbG9yPSJoc2woMTUxLCA3MiUsIDkwJSkiIC8+CiAgICAgICAgPHN0b3Agb2Zmc2V0PSIwLjM5NTgiIHN0b3AtY29sb3I9ImhzbCgxNTEsIDczJSwgNzglKSIgLz4KICAgICAgICA8c3RvcCBvZmZzZXQ9IjAuNzI5MiIgc3RvcC1jb2xvcj0iaHNsKDIzMSwgNzUlLCA2MiUpIiAvPgogICAgICAgIDxzdG9wIG9mZnNldD0iMC45MDYzIiBzdG9wLWNvbG9yPSJoc2woMjQxLCA4MCUsIDQ3JSkiIC8+CiAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSJoc2woMjQxLCA4MiUsIDQ3JSkiIC8+CiAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8cGF0aAogICAgICBkPSJNMTEwIDU1QzExMCAyNC42MjQ0IDg1LjM3NTYgMCA1NSAwQzI0LjYyNDQgMCAwIDI0LjYyNDQgMCA1NUMwIDg1LjM3NTYgMjQuNjI0NCAxMTAgNTUgMTEwQzg1LjM3NTYgMTEwIDExMCA4NS4zNzU2IDExMCA1NVoiCiAgICAgIGZpbGw9InVybCgjZ3pyKSIgLz4KICA8L3N2Zz4KICAgIA==';

	const avatarRecord = await getTextRecord(client, {
		name: name,
		key: 'avatar'
	});
	if (avatarRecord !== null) {
		avatar = await getEnsAvatar(client, {
			name
		}) || ''
	}
	return avatar
};

export { resolveAvatarURL, uploadAvatar, getAvatarRecord };
