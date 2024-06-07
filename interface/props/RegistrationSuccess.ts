export default interface RegistrationSuccessProps {
	name: string;
	owner: string;
	duration: number;
	setStep: (newStep: string) => void;
}
