import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { BrowserRouter } from 'react-router-dom';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { SdkProvider } from './context/SDKProvider';

// 1. Get projectId
const projectId =
	process.env.REACT_APP_WEB3MODAL_PROJECTID ||
	'dfd7f123447ea173608e4dc22191511f';

// 2. Set chains

const sepolia = {
	chainId: 84532,
	name: 'Base Sepolia',
	currency: 'ETH',
	explorerUrl: 'https://sepolia.basescan.org/',
	rpcUrl: 'https://sepolia.base.org',
};

const mainnet = {
	chainId: 8453,
	name: 'Base Mainnet',
	currency: 'ETH',
	explorerUrl: 'https://basescan.org',
	rpcUrl: 'https://mainnet.base.org',
};

// 3. Create a metadata object
const metadata = {
	name: 'tBTC Minting Portal',
	description: 'Bridge your Bitcoin and start earning in Base',
	url: 'https://threshold.network/',
	icons: [''],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
	/*Required*/
	metadata,

	/*Optional*/
	enableEIP6963: true, // true by default
	enableInjected: true, // true by default
	enableCoinbase: true, // true by default
	rpcUrl: '...', // used for the Coinbase SDK
	defaultChainId: 11155111, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
	ethersConfig,
	chains: [sepolia, mainnet],
	projectId,
	enableAnalytics: false, // Optional - defaults to your Cloud configuration
});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<SdkProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</SdkProvider>
		</ChakraProvider>
	</Provider>,
);
