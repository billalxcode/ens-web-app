export default interface FormCommitProps {
	name: string;
	owner: string;
	duration: number;
	isPrimaryName: boolean;
	setStep: (newStep: string) => void;
}
