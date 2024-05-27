'use client';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ClaimProps from '@/interface/props/ClaimProps';
import FormRegistration from '@/components/Claim/FormRegistration';
import FormCommit from '@/components/Claim/FormCommit';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

export default function Claim(props: ClaimProps) {
	const [step, setStep] = useState('registration');
	const [durationInYear, setDurationInYear] = useState(1);

	const { address: ownerAddress } = useWeb3ModalAccount();

	const renderContent = () => {
		if (step == 'registration') {
			return (
				<FormRegistration
					params={props.params}
					setStep={(newStep: string) => setStep(newStep)}
					setDurationInYear={(year) => setDurationInYear(year)}
					durationInYear={durationInYear}
				/>
			);
		} else if (step == 'commit') {
			return (
				<FormCommit
					name={props.params.username}
					owner={ownerAddress || ''}
					duration={durationInYear}
					setStep={(newStep) => setStep(newStep)}
				/>
			);
		}
	};

	return (
		<Box>
			<Flex flexDirection={'column'}>
				<Flex
					justify={'center'}
					align={'center'}
					flexDirection={'column'}
				>
					<Box mb={30}>
						<Heading mb={2} size={'lg'} textAlign={'center'}>
							Register Domain Name
						</Heading>
						<Text textAlign={'center'}>
							You are registering available name:{' '}
							{props.params.username}
						</Text>
					</Box>
					{renderContent()}
				</Flex>
			</Flex>
		</Box>
	);
}
