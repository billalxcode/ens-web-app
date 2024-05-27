export default interface FormCommitProps {
	name: string;
	owner: string;
	duration: number;
	setStep: (newStep: string) => void;
}
