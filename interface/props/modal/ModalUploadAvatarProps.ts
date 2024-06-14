export default interface ModalUploadAvatarProps {
	isOpen: boolean;
	avatar: string;
	name: string;
	onOpen: () => void;
	onClose: () => void;
}
