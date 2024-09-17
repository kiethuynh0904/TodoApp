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
import { formatDate } from '@/utils';

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
	const { layout, backgrounds, borders, fonts, gutters, variant } = useTheme();
	const isDarkTheme = variant === 'dark';

	const taskAnimatedStyle = useAnimatedStyle(() => {
		return {
			// transform: [
			// 	{ scale: withSpring(item.status === TaskStatus.DONE ? 0.95 : 1) },
			// ],
			// opacity: withTiming(item.status === TaskStatus.DONE ? 0.5 : 1),
		};
	});

	return (
		<Animated.View style={taskAnimatedStyle}>
			<Box
				style={[
					backgrounds.gray500,
					borders.rounded_16,
					gutters.padding_16,
					gutters.marginVertical_8,
					layout.shadow1,
				]}
			>
				<HStack space="md" alignItems="flex-start">
					<VStack space="sm" flex={1} alignItems="flex-start">
						<Badge
							bg={
								{
									[TaskPriority.HIGH]: backgrounds.red400.backgroundColor,
									[TaskPriority.MEDIUM]: backgrounds.yellow400.backgroundColor,
									[TaskPriority.LOW]: backgrounds.green400.backgroundColor,
								}[item.priority]
							}
							borderRadius="$lg"
							variant="solid"
						>
							<BadgeText color="$white" style={[fonts.size_12, fonts.bold]}>
								{item.priority}
							</BadgeText>
						</Badge>
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
						<HStack space="xs">
							<Text
								textDecorationLine={
									item.status === TaskStatus.DONE ? 'line-through' : 'none'
								}
								style={[fonts.size_12, fonts.gray400]}
							>
								Due Date: {formatDate(item.deadline.toString())}
							</Text>
							{item.deadline && new Date(item.deadline) < new Date() && (
								<Text style={[fonts.size_12, fonts.red400]}>(Expired)</Text>
							)}
						</HStack>

						<Checkbox
							value={item.id}
							isChecked={item.status === TaskStatus.DONE}
							size="md"
							onChange={() => toggleTaskStatus(item.id)}
						>
							<CheckboxIndicator
								borderColor="$indigo500"
								overflow="hidden"
								rounded="$full"
								mr="$2"
							>
								<CheckboxIcon
									bgColor="$indigo500"
									color="white"
									as={CheckIcon}
								/>
							</CheckboxIndicator>
							<CheckboxLabel style={[fonts.size_12, fonts.gray800]}>
								Mark as done
							</CheckboxLabel>
						</Checkbox>
					</VStack>

					<Menu
						placement="left"
						trigger={({ ...triggerProps }) => {
							return (
								<Pressable {...triggerProps}>
									<Icon
										color={isDarkTheme ? '$white' : '$gray500'}
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
