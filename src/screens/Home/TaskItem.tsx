/* eslint-disable react/no-unstable-nested-components */
import { Pressable } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import {
	Box,
	HStack,
	VStack,
	Checkbox,
	CheckboxIndicator,
	CheckboxIcon,
	CheckIcon,
	TrashIcon,
	Badge,
	BadgeText,
	CheckboxLabel,
	EditIcon,
	Menu,
	ButtonText,
	Button,
	MenuItem,
	Icon,
	MenuItemLabel,
	ThreeDotsIcon,
} from '@gluestack-ui/themed';
import { Task, TaskPriority, TaskStatus } from '@/store/useTasks';
import { FunctionComponent } from '@/types/guards/common';
import { useTheme } from '@/theme';
import { useMemo } from 'react';
import { Text } from '@/components/atoms';
import { useNavigation } from '@react-navigation/native';
import { RootScreenProps } from '@/types/navigation';

interface TaskItemProps {
	item: Task;
	toggleTaskStatus: (id: string) => void;
	removeTask: (id: string) => void;
}

function TaskItem({
	item,
	toggleTaskStatus,
	removeTask,
}: TaskItemProps): FunctionComponent {
	const navigation = useNavigation<RootScreenProps['navigation']>();
	const { layout, backgrounds, borders, fonts, gutters } = useTheme();
	const taskAnimatedStyle = useAnimatedStyle(() => {
		return {
			// transform: [
			// 	{ scale: withSpring(item.status === TaskStatus.DONE ? 0.95 : 1) },
			// ],
			// opacity: withTiming(item.status === TaskStatus.DONE ? 0.5 : 1),
		};
	});

	const taskBgColor = useMemo(() => {
		switch (item.priority) {
			case TaskPriority.HIGH:
				return backgrounds.red100;
			case TaskPriority.MEDIUM:
				return backgrounds.yellow100;
			case TaskPriority.LOW:
				return backgrounds.green100;
			default:
				return backgrounds.green100;
		}
	}, [item.priority]);

	return (
		<Animated.View style={taskAnimatedStyle}>
			<Box
				style={[
					taskBgColor,
					borders.rounded_16,
					gutters.padding_16,
					gutters.marginVertical_8,
				]}
			>
				<HStack space="md" alignItems="flex-start">
					<VStack space="sm" flex={1} alignItems="flex-start">
						<Box
							width={70}
							style={[
								borders.w_1,
								borders.gray400,
								borders.rounded_32,
								gutters.padding_8,
								layout.justifyCenter,
								layout.itemsCenter,
							]}
						>
							<Text style={[fonts.gray400, fonts.size_12, fonts.bold]}>
								{item.status}
							</Text>
						</Box>
						<Text
							textDecorationLine={
								item.status === TaskStatus.DONE ? 'line-through' : 'none'
							}
							style={[fonts.bold, fonts.size_16]}
						>
							{item.title}
						</Text>
						<Text
							textDecorationLine={
								item.status === TaskStatus.DONE ? 'line-through' : 'none'
							}
							style={[fonts.size_12, fonts.gray400]}
						>
							{item.description}
						</Text>
						<Checkbox
							value={item.id}
							isChecked={item.status === TaskStatus.DONE}
							size="md"
							onChange={() => toggleTaskStatus(item.id)}
						>
							<CheckboxIndicator mr="$2">
								<CheckboxIcon color="white" as={CheckIcon} />
							</CheckboxIndicator>
							<CheckboxLabel style={fonts.size_12}>Mark as done</CheckboxLabel>
						</Checkbox>
					</VStack>
					{item.deadline && new Date(item.deadline) < new Date() && (
						<Badge
							style={[layout.absolute]}
							top={-25}
							right={25}
							bgColor="$red500"
						>
							<BadgeText style={[fonts.size_12, fonts.bold]} color="$white">
								EXPIRED
							</BadgeText>
						</Badge>
					)}

					<Menu
						placement="left"
						trigger={({ ...triggerProps }) => {
							return (
								<Pressable {...triggerProps}>
									<Icon
										style={{ transform: [{ rotate: '90deg' }] }}
										as={ThreeDotsIcon}
									/>
								</Pressable>
							);
						}}
					>
						<MenuItem
							onPress={() => removeTask(item.id)}
							key="Delete"
							textValue="Delete"
						>
							<Icon as={TrashIcon} size="sm" mr="$2" />
							<MenuItemLabel size="sm">Delete</MenuItemLabel>
						</MenuItem>
						<MenuItem
							onPress={() => navigation.navigate('EditTask', { task: item })}
							key="Edit"
							textValue="Edit"
						>
							{/* PuzzleIcon is imported from 'lucide-react-native' */}
							<Icon as={EditIcon} size="sm" mr="$2" />
							<MenuItemLabel size="sm">Edit</MenuItemLabel>
						</MenuItem>
					</Menu>
				</HStack>
			</Box>
		</Animated.View>
	);
}

export default TaskItem;
