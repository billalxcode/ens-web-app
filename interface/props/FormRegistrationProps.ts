import ClaimProps from './ClaimProps';

export default interface FormRegistrationProps extends ClaimProps {
	setStep: (newStep: string) => void;
	setDurationInYear: (year: number) => void;
	setIsPrimaryName: (checked: boolean) => void;
	durationInYear: number;
	isPrimaryName: boolean;
}
