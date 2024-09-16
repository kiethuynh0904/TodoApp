/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@/theme';
import { FunctionComponent } from '@/types/guards/common';
import { Icon } from '@gluestack-ui/themed';
import { Pressable } from 'react-native';
import Animated, {
	withDelay,
	useAnimatedStyle,
	withSpring,
	withTiming,
	SharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
	duration: 1200,
	overshootClamping: true,
	dampingRatio: 0.8,
};

const OFFSET = 60;

interface FloatingActionButtonProps
	extends React.ComponentPropsWithRef<typeof Pressable> {
	isExpanded: SharedValue<boolean>;
	index: number;
	buttonLetter: string;
	buttonIcon?: unknown;
}

function FloatingActionButton({
	isExpanded,
	index,
	buttonLetter,
	buttonIcon = null,
	...props
}: FloatingActionButtonProps): FunctionComponent {
	const { fonts, layout } = useTheme();
	const animatedStyles = useAnimatedStyle(() => {
		const moveValue = isExpanded.value ? OFFSET * index : 0;
		const translateValue = withSpring(-moveValue, SPRING_CONFIG);
		const delay = index * 100;

		const scaleValue = isExpanded.value ? 1 : 0;

		return {
			transform: [
				{ translateY: translateValue },
				{
					scale: withDelay(delay, withTiming(scaleValue)),
				},
			],
		};
	});

	return (
		<AnimatedPressable
			style={[
				animatedStyles,
				layout.shadow0,
				{
					position: 'absolute',
					borderRadius: 100,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: -2,
					flexDirection: 'row',
					width: 40,
					height: 40,
					backgroundColor: '#FFFFFF',
				},
			]}
			{...props}
		>
			{/* <Animated.Text style={[fonts.white, fonts.bold]}>
				{buttonLetter}
			</Animated.Text> */}

			<Icon as={buttonIcon} color="$red500" />
		</AnimatedPressable>
	);
}

export default FloatingActionButton;
