export default interface ModalSetPrimaryNameProps {
	name: string;
	owner: string;
	
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}
