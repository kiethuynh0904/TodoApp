import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { isImageSourcePropType } from '@/types/guards/image';

import SendImage from '@/theme/assets/images/send.png';
import ColorsWatchImage from '@/theme/assets/images/colorswatch.png';
import TranslateImage from '@/theme/assets/images/translate.png';

function Home() {
	const { t } = useTranslation(['example', 'welcome']);

	const { colors, layout, gutters, fonts, components, backgrounds } =
		useTheme();

	// const onChangeTheme = () => {
	// 	changeTheme(variant === 'default' ? 'dark' : 'default');
	// };

	// const onChangeLanguage = (lang: 'fr' | 'en') => {
	// 	void i18next.changeLanguage(lang);
	// };

	if (
		!isImageSourcePropType(SendImage) ||
		!isImageSourcePropType(ColorsWatchImage) ||
		!isImageSourcePropType(TranslateImage)
	) {
		throw new Error('Image source is not valid');
	}

	return (
		<SafeScreen>
			<ScrollView>
				<View
					style={[
						layout.justifyCenter,
						layout.itemsCenter,
						gutters.marginTop_80,
					]}
				/>
			</ScrollView>
		</SafeScreen>
	);
}

export default Home;
