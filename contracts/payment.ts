const PaymentAbi = [
	{
		inputs: [
			{
				internalType: 'string',
				name: 'name',
				type: 'string'
			}
		],
		name: 'available',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'commitment',
				type: 'bytes32'
			}
		],
		name: 'commit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'deposit',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'contract IETHRegistrarController',
				name: '_registrarAddress',
				type: 'address'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			}
		],
		name: 'OwnableInvalidOwner',
		type: 'error'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'OwnableUnauthorizedAccount',
		type: 'error'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'string',
				name: 'name',
				type: 'string'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'cost',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'duration',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'timestamp',
				type: 'uint256'
			}
		],
		name: 'NameRegistered',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'string',
				name: 'name',
				type: 'string'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'cost',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'duration',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'timestamp',
				type: 'uint256'
			}
		],
		name: 'NameRenewed',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address'
			}
		],
		name: 'OwnershipTransferred',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_name',
				type: 'string'
			},
			{
				internalType: 'address',
				name: '_owner',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_duration',
				type: 'uint256'
			},
			{
				internalType: 'bytes32',
				name: '_secret',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: '_resolver',
				type: 'address'
			},
			{
				internalType: 'bytes[]',
				name: '_data',
				type: 'bytes[]'
			},
			{
				internalType: 'bool',
				name: '_reverseRecord',
				type: 'bool'
			},
			{
				internalType: 'uint16',
				name: '_ownerControlledFuses',
				type: 'uint16'
			}
		],
		name: 'registerName',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_name',
				type: 'string'
			},
			{
				internalType: 'uint256',
				name: '_duration',
				type: 'uint256'
			}
		],
		name: 'renew',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address'
			}
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address payable',
				name: '_to',
				type: 'address'
			}
		],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		stateMutability: 'payable',
		type: 'receive'
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_name',
				type: 'string'
			},
			{
				internalType: 'uint256',
				name: '_duration',
				type: 'uint256'
			}
		],
		name: 'getPrices',
		outputs: [
			{
				internalType: 'uint256',
				name: 'registerValue',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'paymentValue',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: 'name',
				type: 'string'
			},
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'duration',
				type: 'uint256'
			},
			{
				internalType: 'bytes32',
				name: 'secret',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: 'resolver',
				type: 'address'
			},
			{
				internalType: 'bytes[]',
				name: 'data',
				type: 'bytes[]'
			},
			{
				internalType: 'bool',
				name: 'reverseRecord',
				type: 'bool'
			},
			{
				internalType: 'uint16',
				name: 'ownerControlledFuses',
				type: 'uint16'
			}
		],
		name: 'makeCommitment',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: 'name',
				type: 'string'
			},
			{
				internalType: 'uint256',
				name: 'duration',
				type: 'uint256'
			}
		],
		name: 'rentPrice',
		outputs: [
			{
				components: [
					{
						internalType: 'uint256',
						name: 'base',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'premium',
						type: 'uint256'
					}
				],
				internalType: 'struct IPriceOracle.Price',
				name: 'price',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];

export { PaymentAbi };
