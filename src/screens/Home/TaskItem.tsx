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
	Text,
	Checkbox,
	CheckboxIndicator,
	CheckboxIcon,
	CheckIcon,
	TrashIcon,
	Badge,
	BadgeIcon,
	BadgeText,
	CircleIcon,
} from '@gluestack-ui/themed';
import { Task, TaskStatus } from '@/store/useTasks';
import { FunctionComponent } from '@/types/guards/common';
import { useTheme } from '@/theme';

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
	const { layout } = useTheme();
	const taskAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ scale: withSpring(item.status === TaskStatus.DONE ? 0.95 : 1) },
			],
			opacity: withTiming(item.status === TaskStatus.DONE ? 0.5 : 1),
			backgroundColor: item.status === TaskStatus.DONE ? '$gray100' : '$white',
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
		};
	});

	const removeTaskAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				withSequence(
					withTiming({ scale: 1.1 }, { duration: 150 }),
					withTiming({ scale: 0 }, { duration: 200 }),
				),
			],
			opacity: withTiming(0),
		};
	});

	return (
		<Animated.View style={taskAnimatedStyle}>
			<Box
				borderWidth={1}
				borderColor="$gray200"
				borderRadius="$lg"
				my="$2"
				p="$3"
			>
				<HStack space="md" alignItems="center">
					<Checkbox
						value={item.id}
						isChecked={item.status === TaskStatus.DONE}
						size="md"
						onChange={() => toggleTaskStatus(item.id)}
					>
						<CheckboxIndicator mr="$2">
							<CheckboxIcon color="white" as={CheckIcon} />
						</CheckboxIndicator>
					</Checkbox>
					<VStack space="sm" flex={1}>
						<Text
							fontWeight="$bold"
							fontSize="$lg"
							color={item.status === TaskStatus.DONE ? '$gray400' : '$gray800'}
							textDecorationLine={
								item.status === TaskStatus.DONE ? 'line-through' : 'none'
							}
						>
							{item.title}
						</Text>
						<Text
							fontSize="$sm"
							color={item.status === TaskStatus.DONE ? '$gray400' : '$gray600'}
							textDecorationLine={
								item.status === TaskStatus.DONE ? 'line-through' : 'none'
							}
						>
							{item.description}
						</Text>
					</VStack>
					{item.deadline && (
						<Badge
							style={[layout.absolute]}
							top={10}
							right={20}
							bgColor={
								new Date(item.deadline) < new Date() ? '$red500' : '$green500'
							}
						>
							<BadgeText color="$white">
								{new Date(item.deadline).toDateString()}
							</BadgeText>
							{/* <BadgeIcon as={CircleIcon} color="$white" /> */}
						</Badge>
					)}
					<Pressable
						onPress={() => removeTask(item.id)}
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					>
						<TrashIcon size="sm" color="$red500" />
					</Pressable>
				</HStack>
			</Box>
		</Animated.View>
	);
}

export default TaskItem;
