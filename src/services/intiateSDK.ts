import { ethers } from 'ethers';
import { TBTC } from '@keep-network/tbtc-v2.ts';
import { InfoAccount } from '../interfaces/InfoAccount.type';

const initiateSDK = async (data: InfoAccount): Promise<TBTC> => {
	let sdk: TBTC | null = null;

	const signer: ethers.Signer | null = data.signer;
	const chainId = await signer?.getChainId();
	const isMainnet =
		chainId?.toString() === process.env.REACT_APP_MAINNET_CHAINID;
	const ethRPC = isMainnet
		? process.env.REACT_APP_ETH_MAINNET_RPC
		: process.env.REACT_APP_ETH_SEPOLIA_RPC;

	if (!ethRPC) {
		throw new Error('Missing environment variables.');
	}

	const ethProvider = new ethers.providers.JsonRpcProvider(ethRPC);

	console.log('Initializing SDK');

	if (signer) {
		sdk = isMainnet
			? await TBTC.initializeMainnet(ethProvider, true)
			: await TBTC.initializeSepolia(ethProvider, true);
		await sdk.initializeCrossChain('Arbitrum', signer);
	}

	console.log('SDK initialized successfully:');

	if (!sdk) throw new Error('SDK not initialized yet.');
	return sdk;
};

// initiateSDK().catch(console.error);

export { initiateSDK };
