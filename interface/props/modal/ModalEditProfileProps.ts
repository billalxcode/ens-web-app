export default interface ModalEditProfileProps {
	isOpen: boolean;
	avatar: string;
	name: string;
	onOpen: () => void;
	onClose: () => void;
}
