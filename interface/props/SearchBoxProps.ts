import SearchStates from '../states/SearchStates';

export default interface SearchBoxProps {
	hidden?: boolean;
	searchQuery?: string;
	domain: SearchStates;
}
