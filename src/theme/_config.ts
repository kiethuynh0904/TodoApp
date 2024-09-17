import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import type { ThemeConfiguration } from '@/types/theme/config';

const colorsLight = {
	// components
	primary700: '#ff7461',
	white: '#FFFFFF',
	black: '#000000',
	gray800: '#303030', // title text
	gray500: '#FFFFFF',
	gray400: '#4D4D4D',
	gray200: '#A1A1A1',
	gray100: '#DFDFDF',
	gray50: '#EFEFEF',
	purple50: '#1B1A23',
	yellow100: '#f9e8a0',
	yellow400: '#cd9a14',
	red100: '#fcd6c8',
	red400: '#fd4443',
	red500: '#C13333',
	green100: '#cffac6',
	green400: '#0ec225',
} as const;

const colorsDark = {
	// components
	// common
	primary700: '#ff7461',
	white: '#FFFFFF',
	black: '#000000',
	gray800: '#E0E0E0',
	gray500: '#232323',
	gray400: '#969696',
	gray200: '#BABABA',
	gray100: '#000000',
	gray50: '#EFEFEF',
	purple50: '#111111',
	yellow100: '#f9e8a0',
	yellow400: '#cd9a14',
	red100: '#fcd6c8',
	red400: '#fd4443',
	red500: '#C13333',
	green100: '#cffac6',
	green400: '#0ec225',
} as const;

const sizes = [12, 14, 16, 18, 24, 32, 40, 80] as const;
const gutterSizes = [4, 8, 12, 16, 24, 32] as const;

export const config = {
	colors: colorsLight,
	fonts: {
		sizes,
		colors: colorsLight,
	},
	gutters: gutterSizes,
	backgrounds: colorsLight,
	borders: {
		widths: [1, 2],
		radius: [4, 16, 32, 64],
		colors: colorsLight,
	},
	navigationColors: {
		...DefaultTheme.colors,
		background: colorsLight.gray50,
		card: colorsLight.gray50,
	},
	variants: {
		dark: {
			colors: colorsDark,
			fonts: {
				colors: colorsDark,
			},
			backgrounds: colorsDark,
			navigationColors: {
				...DarkTheme.colors,
				background: colorsDark.purple50,
				card: colorsDark.purple50,
			},
		},
	},
} as const satisfies ThemeConfiguration;
