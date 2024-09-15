/* eslint-disable no-param-reassign */

import { FontResolver, createConfig } from '@gluestack-ui/themed';
import { config as defaultConfig } from '@gluestack-ui/config';
import { Platform, TextStyle } from 'react-native';

const CustomFontResolver = new FontResolver({
	mapFonts: (style: TextStyle) => {
		if (Platform.OS !== 'web') {
			style.fontFamily = `${style.fontFamily}-${style.fontWeight}-${style.fontStyle}`;
			style.fontWeight = undefined;
			style.fontStyle = undefined;
		}
	},
});

const config = createConfig({
	...defaultConfig,
	tokens: {
		...defaultConfig.tokens,
		fonts: {
			heading: 'DMSans', // Heading component uses this by default
			body: 'Inter', // Text component uses this by default
			mono: 'Inter',
		},
		colors: {
			...defaultConfig.tokens.colors,
			emerald700: '#004D40',
			primary500: '#004D40',
			primary700: '#004036',
		},
	},
	plugins: [...defaultConfig.plugins, CustomFontResolver],
});

export default config;
