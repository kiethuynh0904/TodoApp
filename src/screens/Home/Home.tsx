import { ListRenderItem, Pressable } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import Animated, {
	interpolate,
	LinearTransition,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { AddIcon, Box, SunIcon } from '@gluestack-ui/themed';
import { Task, useTaskStore } from '@/store/useTasks';
import { useNavigation } from '@react-navigation/native';
import { RootScreenProps } from '@/types/navigation';
import TaskItem from './TaskItem';
import FloatingActionButton from './FloatingActionButton';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Home() {
	const navigation = useNavigation<RootScreenProps['navigation']>();
	const { layout, gutters, fonts, changeTheme, variant } = useTheme();

	const { tasks, toggleTaskStatus, removeTask } = useTaskStore();

	const isExpanded = useSharedValue(false);

	const handlePress = () => {
		isExpanded.value = !isExpanded.value;
	};

	const plusIconStyle = useAnimatedStyle(() => {
		const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
		const translateValue = withTiming(moveValue);
		const rotateValue = isExpanded.value ? '45deg' : '0deg';

		return {
			transform: [
				{ translateX: translateValue },
				{ rotate: withTiming(rotateValue) },
			],
		};
	});

	const renderItem: ListRenderItem<Task> = ({ item }: { item: Task }) => {
		// Use the TaskItem component
		return (
			<TaskItem
				item={item}
				toggleTaskStatus={toggleTaskStatus}
				removeTask={removeTask}
			/>
		);
	};

	const onChangeTheme = () => {
		changeTheme(variant === 'default' ? 'dark' : 'default');
	};

	return (
		<SafeScreen>
			<Animated.FlatList
				data={tasks}
				keyExtractor={item => item.id}
				renderItem={renderItem}
				skipEnteringExitingAnimations
				contentContainerStyle={[
					layout.justifyCenter,
					gutters.paddingHorizontal_12,
				]}
				itemLayoutAnimation={LinearTransition}
			/>
			<Box
				position="absolute"
				bottom={30}
				right={20}
				display="flex"
				flexDirection="column"
				alignItems="center"
			>
				<AnimatedPressable
					onPress={handlePress}
					// eslint-disable-next-line react-native/no-inline-styles
					style={{
						zIndex: 1,
						height: 56,
						width: 56,
						borderRadius: 100,
						backgroundColor: '#b58df1',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Animated.Text style={[fonts.size_24, fonts.white, plusIconStyle]}>
						+
					</Animated.Text>
				</AnimatedPressable>
				<FloatingActionButton
					isExpanded={isExpanded}
					index={1}
					buttonLetter="New"
					buttonIcon={AddIcon}
					onPress={() => navigation.navigate('NewTask')}
				/>
				<FloatingActionButton
					isExpanded={isExpanded}
					index={2}
					buttonLetter="Theme"
					buttonIcon={SunIcon}
					onPress={onChangeTheme}
				/>
			</Box>
		</SafeScreen>
	);
}

export default Home;
