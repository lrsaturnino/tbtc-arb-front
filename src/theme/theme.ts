import { extendTheme, ThemeConfig, ThemeOverride } from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const styles: ThemeOverride['styles'] = {
	global: props => ({
		body: {
			height: '100vh',
			width: '100%',
		},
	}),
};

const colors: ThemeOverride['colors'] = {
	brand: {
		purple: {
			900: '#7D00FF',
			800: '#9B33FF',
			700: '#AF66FF',
			600: '#C399FF',
			500: '#D7CCFF',
			400: '#EBE1FF',
			300: '#F5EBFF',
			200: '#FAF5FF',
			100: '#FFF9FF',
		},
		yellow: {
			900: '#FAAD14',
			800: '#FFBA3F',
			700: '#FFC76A',
			600: '#FFD495',
			500: '#FFE1C0',
			400: '#FFEBE6',
			300: '#FFF2E3',
			200: '#FFF8F0',
			100: '#FFFDF5',
		},
	},
	light: {
		primaryGray: '#4A5568', // Titulos
		coolGray: '#B1BCCC', // Detalles
		gray: '#828282', // Navbar
	},
	dark: {
		primaryGray: '#1D2229', // Fondos de cajas
		focusGray: '#161A1F', // Fondo de inputs y focus de pestañas
		coolGray: '#B1BCCC', // Navbar links y detalles
	},
};

const fonts: ThemeOverride['fonts'] = {
	heading: 'Inter',
	body: 'Inter, sans-serif',
};

const components: ThemeOverride['components'] = {
	Text: {
		baseStyle: {
			color: 'light.primaryGray',
			_dark: {
				color: 'white',
			},
		},

		variants: {
			gray: {
				_dark: {
					color: 'dark.coolGray',
				},
			},
		},
	},

	Button: {
		variants: {
			purple: {
				py: '16px',
				px: '0px',
				fontWeight: 700,

				_light: { bg: 'brand.purple.900', color: 'white' },
				_dark: { bg: 'brand.purple.900' },
			},

			whiteFilled: {
				color: 'brand.purple.900',
				bg: 'white',
				px: '47px',
				fontWeight: 600,
				transition: 'background-color 0.3s ease',

				_hover: {
					transition: 'background-color 0.3s ease',
					bg: 'brand.purple.300',
				},

				_active: {
					bg: 'brand.purple.500',
				},
			},
		},
	},

	Box: {
		variants: {
			container: {
				bg: 'white',
				_dark: {
					bg: 'dark.primaryGray',
				},
			},
		},
	},
};

export const theme = extendTheme({ config, styles, components, fonts, colors });
