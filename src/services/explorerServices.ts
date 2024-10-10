export const getBtcTransactionUrl = (isMainnet: boolean, txHash: string) => {
	const explorerUrl = isMainnet
		? process.env.REACT_APP_BTC_EXPLORER_MAINNET
		: process.env.REACT_APP_BTC_EXPLORER_TESTNET;
	return `${explorerUrl}/tx/${txHash}`;
};

export const getEthTransactionUrl = (isMainnet: boolean, txHash: string) => {
	const explorerUrl = isMainnet
		? process.env.REACT_APP_ETH_EXPLORER_MAINNET
		: process.env.REACT_APP_ETH_EXPLORER_TESTNET;
	return `${explorerUrl}/tx/${txHash}`;
};

export const getBaseTransactionUrl = (
	isMainnet: boolean,
	txHash: string,
) => {
	const explorerUrl = isMainnet
		? process.env.REACT_APP_BASE_EXPLORER_MAINNET
		: process.env.REACT_APP_BASE_EXPLORER_TESTNET;
	return `${explorerUrl}/tx/${txHash}`;
};
