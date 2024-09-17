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

import {
	AddIcon,
	Badge,
	BadgeText,
	Box,
	Divider,
	HStack,
	SunIcon,
	Switch,
} from '@gluestack-ui/themed';
import { Task, TaskPriority, useTaskStore } from '@/store/useTasks';
import { useNavigation } from '@react-navigation/native';
import { RootScreenProps } from '@/types/navigation';
import { useEffect } from 'react';
import { Text } from '@/components/atoms';
import TaskItem from './TaskItem';
import FloatingActionButton from './FloatingActionButton';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Home() {
	const navigation = useNavigation<RootScreenProps['navigation']>();
	const { layout, gutters, fonts, changeTheme, variant, backgrounds, borders } =
		useTheme();
	const {
		filteredTasks,
		filterTasksByPriority,
		tasks,
		toggleTaskStatus,
		removeTask,
		sortFilteredTasks,
		enableSorting,
	} = useTaskStore();

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

	useEffect(() => {
		filterTasksByPriority('all');
		sortFilteredTasks(false);
	}, []);

	return (
		<SafeScreen>
			<Box style={[gutters.paddingHorizontal_12, gutters.marginBottom_12]}>
				<Text style={[fonts.bold, fonts.size_32]}>Manage Your Tasks</Text>
			</Box>

			<Box style={[layout.row, gutters.gap_8, gutters.paddingHorizontal_12]}>
				<Pressable
					onPress={() => {
						filterTasksByPriority('all');
						sortFilteredTasks(enableSorting);
					}}
				>
					<HStack space="xs">
						<Text>All</Text>
						<Badge borderRadius="$xl" variant="solid" bgColor="$primary700">
							<BadgeText color="$white">{tasks.length}</BadgeText>
						</Badge>
					</HStack>
				</Pressable>
				<Divider orientation="vertical" />
				{Object.values(TaskPriority)
					.reverse()
					.map(priority => (
						<Pressable
							key={priority}
							onPress={() => filterTasksByPriority(priority)}
						>
							<HStack space="xs">
								<Text>{priority}</Text>
								<Badge borderRadius="$xl" variant="solid" bgColor="$primary700">
									<BadgeText color="white">
										{tasks.filter(task => task.priority === priority).length}
									</BadgeText>
								</Badge>
							</HStack>
						</Pressable>
					))}
			</Box>
			<Box
				style={[layout.row, gutters.paddingHorizontal_4]}
				alignItems="center"
			>
				<Switch
					value={enableSorting}
					sx={{
						_light: {
							props: {
								trackColor: {
									false: '$backgroundLight300',
									true: '$primary700',
								},
							},
						},
						_dark: {
							props: {
								trackColor: {
									false: '$backgroundDark700',
									true: '$primary700',
								},
							},
						},
					}}
					size="sm"
					onValueChange={v => sortFilteredTasks(v)}
				/>
				<Text>Sort by Priority</Text>
			</Box>
			<Animated.FlatList
				data={filteredTasks}
				keyExtractor={item => item.id}
				renderItem={renderItem}
				skipEnteringExitingAnimations
				contentContainerStyle={[
					layout.justifyCenter,
					gutters.paddingHorizontal_12,
					gutters.paddingTop_12,
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
					style={[
						backgrounds.primary700,
						layout.z1,
						borders.rounded_64,
						layout.itemsCenter,
						layout.justifyCenter,
						// eslint-disable-next-line react-native/no-inline-styles
						{
							height: 56,
							width: 56,
						},
					]}
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
