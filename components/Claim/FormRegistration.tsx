'use client';
import React, { useEffect, useState } from 'react';
import Card from '../Card';
import RegistrationYearSelection from './RegistrationYearSelection';
import { Divider, Flex, Skeleton, Switch, Text } from '@chakra-ui/react';
import ButtonWrapper from './ButtonWrapper';
import estimateRegistration from '@/logic/estimateRegistration';
import { ethers } from 'ethers';
import client from '@/logic/client';
import estimatedRegistrationStates from '@/interface/states/estimatedRegistration';
import { getGasPrice } from 'viem/actions';
import { BigNumberish } from 'ethers';
import FormRegistrationProps from '@/interface/props/FormRegistrationProps';
import { css } from '@emotion/react';

export default function FormRegistration(props: FormRegistrationProps) {
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
				const estimatedRegistrationData = await estimateRegistration(
					props.params.username,
					props.durationInYear
				);
				setGasPrices(gasPrice);
				setEstimatedRegistration(estimatedRegistrationData);
				setTimeout(async () => {
					setIsEstimateRegistration(false);
				}, 1000);
			}
		})();
	}, [
		props.durationInYear,
		props.params.username,
		estimatedRegistration,
		isEstimateRegistration
	]);

	return (
		<Card>
			<RegistrationYearSelection
				year={props.durationInYear}
				setYear={(x) => props.setDurationInYear(x)}
				setLoading={() => setIsEstimateRegistration(true)}
			/>

			<Divider opacity={0.5} my={3} />
			<Flex flexDirection={'column'} gap={3}>
				<Flex justify={'space-between'} flexDirection={'row'}>
					<Text>Registration Priod</Text>
					<Text>{props.durationInYear} Year</Text>
				</Flex>
				<Flex justify={'space-between'} flexDirection={'row'}>
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
				<Flex justify={'space-between'} flexDirection={'row'}>
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

				<Flex justify={'space-between'} flexDirection={'row'}>
					<Text>Set as primary</Text>
					<Switch
						css={css`
							.chakra-switch__thumb:checked
								+ .chakra-switch__track {
								background-color: #8aa9f2;
							}
						`}
						onChange={(e) =>
							props.setIsPrimaryName(e.target.checked)
						}
						isChecked={props.isPrimaryName}
					/>
				</Flex>
			</Flex>

			<ButtonWrapper
				setStep={(newStep: string) => props.setStep(newStep)}
			/>
		</Card>
	);
}
