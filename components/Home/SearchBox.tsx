import { Box, Collapse, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SearchItem from './SearchItem';
import SearchBoxProps from '@/interface/props/SearchBoxProps';
import isNameAvailable from '@/logic/available';
import SearchStates from '@/interface/states/SearchStates';
import SearchItemLoading from './SearchItemLoading';
import useDebounce from '@/hooks/useDebounce';

export default function SearchBox(props: SearchBoxProps) {
	const [domain, setDomain] = useState<SearchStates>({
		domain: props.searchQuery || '',
		available: false
	});
	const debouncedSearch = useDebounce(props.searchQuery || '', 1500);

	useEffect(() => {
		(async () => {
			if (debouncedSearch) {
				try {
					const available = await isNameAvailable(
						debouncedSearch + '.eth'
					);

					setDomain({
						domain: props.searchQuery + '.eth',
						available: available
					});
				} catch (e: any) {}
			}
		})();
	}, [domain, debouncedSearch, props.searchQuery]);

	return (
		<Collapse
			in={props.hidden}
			transition={{ exit: { delay: 0.3 }, enter: { delay: 0.3 } }}
		>
			<Box
				w={'full'}
				position={'relative'}
				bgColor={'bg.card2'}
				boxShadow={'lg'}
			>
				<Flex flexDirection={'column'}>
					{debouncedSearch ? (
						<SearchItem
							username={debouncedSearch + '.eth'}
							available={domain.available}
							key={domain.domain}
						/>
					) : (
						<SearchItemLoading />
					)}
				</Flex>
			</Box>
		</Collapse>
	);
}
