import { useState } from 'react';
import { FlatList, ListRenderItem, Pressable } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import Animated, { LinearTransition } from 'react-native-reanimated';

import {
	Box,
	Checkbox,
	CheckboxIcon,
	CheckboxIndicator,
	CheckboxLabel,
	CheckIcon,
	Divider,
	HStack,
	VStack,
	TrashIcon,
} from '@gluestack-ui/themed';
import { Text } from '@/components/atoms';

enum TaskStatus {
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	DONE = 'DONE',
}

interface Task {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
}

const dummyTasks: Task[] = [
	{
		id: '1',
		title: 'Grocery Shopping',
		description: 'Buy milk, eggs, bread, and cheese from the supermarket.',
		status: TaskStatus.TODO,
	},
	{
		id: '2',
		title: 'Book Doctor Appointment',
		description: 'Schedule a check-up appointment for next week.',
		status: TaskStatus.IN_PROGRESS,
	},
	{
		id: '3',
		title: 'Pay Bills',
		description: 'Pay electricity and internet bills by the due date.',
		status: TaskStatus.DONE,
	},
];

function Home() {
	const { layout, gutters } = useTheme();
	const [tasks, setTasks] = useState<Task[]>(dummyTasks);

	// const onChangeTheme = () => {
	// 	changeTheme(variant === 'default' ? 'dark' : 'default');
	// };

	// const onChangeLanguage = (lang: 'fr' | 'en') => {
	// 	void i18next.changeLanguage(lang);
	// };

	const toggleTaskStatus = (id: string) => {
		setTasks(prevTasks =>
			prevTasks.map(task => {
				if (task.id === id) {
					const newStatus =
						task.status === TaskStatus.DONE ? TaskStatus.TODO : TaskStatus.DONE;
					return { ...task, status: newStatus };
				}
				return task;
			}),
		);
	};

	const removeTask = (id: string) => {
		setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
	};

	const renderItem: ListRenderItem<Task> = ({ item }: { item: Task }) => (
		<Box
			borderWidth={1}
			borderColor="$gray200"
			borderRadius="$lg"
			my="$2"
			p="$3"
			bg="$white"
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
				<Pressable onPress={() => removeTask(item.id)}>
					<TrashIcon size="sm" color="$red500" />
				</Pressable>
			</HStack>
		</Box>
	);
	return (
		<SafeScreen>
			<Animated.FlatList
				data={tasks}
				keyExtractor={item => item.id}
				renderItem={renderItem}
				contentContainerStyle={[
					layout.justifyCenter,
					gutters.paddingTop_32,
					gutters.paddingHorizontal_12,
				]}
				itemLayoutAnimation={LinearTransition}
			/>
		</SafeScreen>
	);
}

export default Home;
