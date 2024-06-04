import { PaymentAbi } from '@/contracts/payment';
import { RegistrationTuple } from '@ensdomains/ensjs/utils';
import { WalletClient, encodeFunctionData } from 'viem';
import client from './client';

const createPaymentData = async (args: RegistrationTuple, value: bigint) => {
	// const paymentContract = await wallet.writeContract({
	//     address: '0x3A9580b04Bf1e81c242Fb4b7F2e79e6794bfE8fE',
	//     abi: PaymentAbi,
	//     functionName: 'registerName',
	//     args: [...args],
	//     value: value,
	// });
	const data = encodeFunctionData({
		abi: PaymentAbi,
		functionName: 'registerName',
		args: [...args]
	});
	return data;
	// return paymentContract
};

const sendPaymentContract = async () => {};

export { createPaymentData, sendPaymentContract };
