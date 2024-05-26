'use client';
import { Box, Divider, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import ClaimProps from '@/interface/props/ClaimProps';
import RegistrationYearSelection from '@/components/Claim/RegistrationYearSelection';
import estimateRegistration from '@/logic/estimateRegistration';
import estimatedRegistrationStates from '@/interface/states/estimatedRegistration';
import { ethers } from 'ethers';
import ButtonWrapper from '@/components/Claim/ButtonWrapper';
import { getGasPrice } from 'viem/actions';
import client from '@/logic/client';
import { BigNumberish } from 'ethers';

export default function Claim(props: ClaimProps) {
	const [year, setYear] = useState<number>(1);
	const [estimatedRegistration, setEstimatedRegistration] =
		useState<estimatedRegistrationStates>({
			registrationFee: BigInt(0),
			premiumFee: BigInt(0),
			hasPremium: false
		});
	const [gasPrices, setGasPrices] = useState<BigNumberish>(0);
	const [isEstimateRegistration, setIsEstimateRegistration] = useState(true);

	useEffect(() => {
		(async () => {
			if (isEstimateRegistration) {
				const gasPrice = await getGasPrice(client);
				console.log(gasPrice);
				setGasPrices(gasPrice);
				setTimeout(async () => {
					const estimatedRegistrationData =
						await estimateRegistration(props.params.username, year);
					setEstimatedRegistration(estimatedRegistrationData);
					
					setIsEstimateRegistration(false);
				}, 1000);
			}
		})();
	}, [
		year,
		props.params.username,
		estimatedRegistration,
		isEstimateRegistration
	]);

	return (
		<Box>
			<Flex flexDirection={'column'}>
				<Flex
					justify={'center'}
					align={'center'}
					flexDirection={'column'}
				>
					<Box mb={30}>
						<Heading mb={2} size={'lg'}>
							Register Domain Name
						</Heading>
						<Text>
							You are registering available name:{' '}
							{props.params.username}
						</Text>
					</Box>
					<Card>
						<RegistrationYearSelection
							year={year}
							setYear={(x) => setYear(x)}
							setLoading={() => setIsEstimateRegistration(true)}
						/>

						<Divider opacity={0.5} my={3} />
						<Flex flexDirection={'column'} gap={3}>
							<Flex
								justify={'space-between'}
								flexDirection={'row'}
							>
								<Text>Registration Priod</Text>
								<Text>{year} Year</Text>
							</Flex>
							<Flex
								justify={'space-between'}
								flexDirection={'row'}
							>
								<Text>Registration Fee</Text>
								<Skeleton
									isLoaded={!isEstimateRegistration}
									borderRadius={5}
									startColor={'bg.skeletonStart'}
									endColor={'bg.skeletonEnd'}
								>
									<Text>
										{ethers
											.formatEther(
												estimatedRegistration.registrationFee
											)
											.substring(0, 5)}{' '}
										ETH
									</Text>
								</Skeleton>
							</Flex>
							<Flex
								justify={'space-between'}
								flexDirection={'row'}
							>
								<Text>Gas Price</Text>
								<Skeleton
									isLoaded={!isEstimateRegistration}
									borderRadius={5}
									startColor={'bg.skeletonStart'}
									endColor={'bg.skeletonEnd'}
								>
									<Text>
										{ethers
											.formatUnits(gasPrices, 'gwei')
											.substring(0, 5)}{' '}
										GWEI
									</Text>
								</Skeleton>
							</Flex>
						</Flex>

						<ButtonWrapper />
					</Card>
				</Flex>
			</Flex>
		</Box>
	);
}
