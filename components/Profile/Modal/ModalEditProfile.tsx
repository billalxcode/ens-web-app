import React, { ChangeEvent, useRef, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	Button,
	Flex,
	Box,
	Input,
	Text,
	Image,
	useToast,
	useDisclosure
} from '@chakra-ui/react';
import ModalEditProfileProps from '@/interface/props/modal/ModalEditProfileProps';
import ModalUploadAvatar from './ModalUploadAvatar';

export default function ModalEditProfile(props: ModalEditProfileProps) {
	const toast = useToast();
	const inputAvatarRef = useRef<HTMLInputElement>(null);
	const {
		isOpen: isUploadAvatarOpen,
		onOpen: onUploadAvatarOpen,
		onClose: onUploadAvatarClose
	} = useDisclosure();
	const [avatar, setAvatar] = useState(props.avatar);
	const [currentModal, setCurrentModal] = useState('profile');
	const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files?.length > 0) {
			const file = target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setAvatar(reader.result as string);
				onUploadAvatarOpen();
			};
			reader.onerror = () => {
				console.log('Error bang wkwkwk');
			};
		} else {
			toast({
				status: 'error',
				title: 'Error',
				description: 'Please select the file correctly'
			});
		}
	};

	return (
		<>
			<ModalUploadAvatar
				name={props.name}
				avatar={avatar}
				isOpen={isUploadAvatarOpen}
				onOpen={onUploadAvatarOpen}
				onClose={onUploadAvatarClose}
			/>
			<Modal
				isOpen={props.isOpen}
				onClose={props.onClose}
				isCentered
				motionPreset={'slideInBottom'}
			>
				<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
				<ModalContent bgColor={'bg.card'}>
					<ModalHeader textAlign={'center'}>
						Edit your profile
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex
							justify={'center'}
							align={'center'}
							flexDirection={'column'}
							gap={5}
						>
							<Image
								src={avatar}
								w={100}
								h={100}
								borderRadius={50}
							/>
							<Input
								type="file"
								accept="image/*"
								display={'none'}
								ref={inputAvatarRef}
								onChange={(e) => handleUploadImage(e)}
							/>
							<Button
								w={'full'}
								transition={'all 0.5s ease-in-out'}
								bgColor={'bg.button.secondary'}
								color={'primary.text'}
								_hover={{
									bgColor: 'bg.button.hover.secondary'
								}}
								onClick={() => inputAvatarRef.current?.click()}
							>
								Choice a file
							</Button>
						</Flex>
					</ModalBody>

					<ModalFooter gap={3}>
						<Button
							w={'full'}
							transition={'all 0.5s ease-in-out'}
							bgColor={'bg.button.secondary'}
							color={'primary.text'}
							_hover={{
								bgColor: 'bg.button.hover.secondary'
							}}
							onClick={props.onClose}
						>
							Close
						</Button>
						<Button
							w={'full'}
							transition={'all .5s ease-in-out'}
							bgGradient={'linear(to-l, #8aa9f2, #9a76ff)'}
							bgSize={'100 100'}
							color={'primary.text'}
							_hover={{
								transform: 'translateY(-3px)'
							}}
							_active={{
								bgGradient: 'linear(to-l, #8aa9f2, #9a76ff)'
							}}
							// onClick={() => handleRenewClick()}
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
