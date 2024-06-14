import { PaymentAbi, PaymentAddress } from '@/contracts/payment';
import { RegistrationTuple } from '@ensdomains/ensjs/utils';
import { Address, PublicClient, WalletClient, encodeFunctionData } from 'viem';

interface SendPaymentProps {
	wallet: WalletClient;
	client: PublicClient;
	registrationParams: RegistrationTuple;
	paymentPrice: bigint;
}

interface SendRenewPaymentProps {
	wallet: WalletClient;
	params: {
		name: string,
		duration: number,
		value: bigint
	}
}

const sendPayment = async (props: SendPaymentProps) => {
	const hash = await props.wallet.sendTransaction({
		to: PaymentAddress as Address,
		data: encodeFunctionData({
			abi: PaymentAbi,
			functionName: 'registerName',
			args: props.registrationParams
		}),
		account: (await props.wallet.getAddresses())[0],
		gas: BigInt(333508),
		chain: props.wallet.chain,
		value: props.paymentPrice
	});
	await props.client.waitForTransactionReceipt({ hash });
	return hash;
};

const sendRenewPayment = async (
	props: SendRenewPaymentProps
) => {
	const label = props.params.name.split('.')

	const hash = await props.wallet.sendTransaction({
		to: PaymentAddress as Address,
		data: encodeFunctionData({
			abi: PaymentAbi,
			functionName: 'renew',
			args: [
				label[0],
				props.params.duration
			]
		}),
		account: (await props.wallet.getAddresses())[0],
		gas: BigInt(333508),
		chain: props.wallet.chain,
		value: props.params.value
	});
	return hash
};

export { sendPayment, sendRenewPayment };
