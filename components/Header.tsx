'use client';
import { resolveAvatarURL } from '@/logic/avatar';
import client from '@/logic/client';
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList
} from '@chakra-ui/react';
import { getName, getTextRecord } from '@ensdomains/ensjs/public';
import {
	faHome,
	faTable,
	faTableColumns
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import React, { useEffect, useState } from 'react';
import { getEnsAvatar } from 'viem/actions';

export default function Header() {
	const { isConnected, address } = useWeb3ModalAccount();

	const [ensAvatar, setEnsAvatar] = useState(
		'data:image/svg+xml;base64,CiAgPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTAgMTEwIj4KICAgIDxkZWZzPgogICAgICA8bGluZWFyR3JhZGllbnQgaWQ9Imd6ciIgeDE9IjEwNi45NzUiIHkxPSIxMzYuMTU2IiB4Mj0iLTEyLjk4MTUiIHkyPSIxMy41MzQ3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMzEuNjM4IDEyOS44MzUpIHJvdGF0ZSgtMTQxLjE5NCkgc2NhbGUoMTg1LjU4MikiPgogICAgICAgIDxzdG9wIG9mZnNldD0iMC4xNTYyIiBzdG9wLWNvbG9yPSJoc2woMTUxLCA3MiUsIDkwJSkiIC8+CiAgICAgICAgPHN0b3Agb2Zmc2V0PSIwLjM5NTgiIHN0b3AtY29sb3I9ImhzbCgxNTEsIDczJSwgNzglKSIgLz4KICAgICAgICA8c3RvcCBvZmZzZXQ9IjAuNzI5MiIgc3RvcC1jb2xvcj0iaHNsKDIzMSwgNzUlLCA2MiUpIiAvPgogICAgICAgIDxzdG9wIG9mZnNldD0iMC45MDYzIiBzdG9wLWNvbG9yPSJoc2woMjQxLCA4MCUsIDQ3JSkiIC8+CiAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSJoc2woMjQxLCA4MiUsIDQ3JSkiIC8+CiAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8cGF0aAogICAgICBkPSJNMTEwIDU1QzExMCAyNC42MjQ0IDg1LjM3NTYgMCA1NSAwQzI0LjYyNDQgMCAwIDI0LjYyNDQgMCA1NUMwIDg1LjM3NTYgMjQuNjI0NCAxMTAgNTUgMTEwQzg1LjM3NTYgMTEwIDExMCA4NS4zNzU2IDExMCA1NVoiCiAgICAgIGZpbGw9InVybCgjZ3pyKSIgLz4KICA8L3N2Zz4KICAgIA=='
	);
	const [ensName, setEnsName] = useState('')

	useEffect(() => {
		(async () => {
			if (isConnected) {
				const ensName = await getName(client, {
					address: address as `0x${string}`
				});
				const name = ensName.name.normalize();
				const avatarRecord = await getTextRecord(client, {
					name,
					key: 'avatar'
				});
				setEnsName(name)
				if (avatarRecord !== null) {
					const avatarUrl = await getEnsAvatar(client, { name });
					setEnsAvatar(
						avatarUrl || resolveAvatarURL(name, client.chain.name)
					);
				}
			}
		})();
	}, []);
	return (
		<Flex
			justify={'space-between'}
			p={3}
			align={'center'}
			bgColor={'bg.body'}
			boxShadow={'md'}
			zIndex={100}
			w={'full'}
		>
			<Flex align={'center'}>
				<Image
					src="/images/Atlanta.png"
					alt="Atlanta Logo"
					width={[12, 10, 20]}
				/>
				<Link href="/" textDecoration={'none'}>
					<Heading
						color={'primary.text'}
						textDecoration={'none'}
						size={['sm', 'sm', 'md']}
						mx={[0, 2, 3]}
						opacity={0.8}
					>
						Atlanta Domains
					</Heading>
				</Link>
			</Flex>
			<Flex gap={2}>
				<Button
					display={['none', 'block']}
					transition={'all 0.5s ease-in-out'}
					bgColor={'#1d2432'}
					color={'primary.text'}
					_hover={{
						bgColor: '#171c28'
					}}
					p={3}
					onClick={() => location.replace(`/names`)}
				>
					My Names
				</Button>
				<Button
					display={['block', 'none']}
					transition={'all 0.5s ease-in-out'}
					bgColor={'#1d2432'}
					color={'primary.text'}
					_hover={{
						bgColor: '#171c28'
					}}
					p={0}
					onClick={() => location.replace(`/names`)}
				>
					<FontAwesomeIcon icon={faTable} />
				</Button>

				{/* <Button
					display={['block', 'none']}
					transition={'all 0.5s ease-in-out'}
					bgColor={'#1d2432'}
					color={'primary.text'}
					_hover={{
						bgColor: '#171c28'
					}}
					p={0}
					onClick={() => OpenModal()}
				>
					<Image
						src={ensAvatar}
						w={5}
						borderRadius={50}
						mx={'auto'}
						my={'auto'}
					/>
				</Button> */}

				<Menu>
					<MenuButton
						as={Button}
						display={['block', 'none']}
						transition={'all 0.5s ease-in-out'}
						bgColor={'#1d2432'}
						color={'primary.text'}
						_hover={{
							bgColor: '#171c28'
						}}
					>
						<Image
							src={ensAvatar}
							w={5}
							borderRadius={50}
							mx={'auto'}
							my={'auto'}
						/>
					</MenuButton>
					<MenuList bgColor={'bg.card'} cursor={'pointer'}>
						<MenuItem bgColor={'inherit'} as={'a'} href={`/profile/${ensName || ''}`}>Profile</MenuItem>
						<MenuItem bgColor={'inherit'}>Wallet</MenuItem>
						<MenuDivider />
						<MenuItem bgColor={'inherit'}>Disconnect</MenuItem>
					</MenuList>
				</Menu>

				<Box display={['none', 'block']}>
					<w3m-button />
				</Box>
			</Flex>
		</Flex>
	);
}
