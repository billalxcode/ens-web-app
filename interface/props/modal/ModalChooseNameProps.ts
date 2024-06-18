export default interface ModalChooseNameProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onSelect: (name: string) => void
}
