import { ListRenderItem } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import Animated, { LinearTransition } from 'react-native-reanimated';

import {
	VStack,
	Alert,
	FormControl,
	Input,
	Button,
	InputField,
	ButtonText,
	ButtonIcon,
	AddIcon,
	AlertIcon,
	AlertText,
	InfoIcon,
	Modal,
	ModalContent,
	ModalBackdrop,
} from '@gluestack-ui/themed';
import { Task, TaskStatus, useTaskStore } from '@/store/useTasks';
import { useLayoutEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { useNavigation } from '@react-navigation/native';
import { FunctionComponent } from '@/types/guards/common';
import TaskItem from './TaskItem';

function Home() {
	const navigation = useNavigation();
	const { layout, gutters } = useTheme();
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [newTaskDescription, setNewTaskDescription] = useState('');
	const [showError, setShowError] = useState(false);
	const [newTaskDeadline, setNewTaskDeadline] = useState<Date>(new Date()); // Add state for deadline
	const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

	const { tasks, toggleTaskStatus, removeTask, addTask } = useTaskStore();

	const handleDateChange = (
		_event: unknown,
		selectedDate: Date | undefined,
	) => {
		if (selectedDate) {
			setNewTaskDeadline(selectedDate); // Set the selected date
		}
	};

	const handleAddTask = () => {
		if (newTaskTitle.trim() === '' || newTaskDescription.trim() === '') {
			setShowError(true);
			return;
		}

		addTask({
			title: newTaskTitle,
			description: newTaskDescription,
			status: TaskStatus.TODO,
			deadline: newTaskDeadline,
		});
		setNewTaskTitle('');
		setNewTaskDescription('');
		setShowError(false);
		setIsModalVisible(false);
	};

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

	useLayoutEffect(() => {
		navigation.setOptions({
			// eslint-disable-next-line react/no-unstable-nested-components
			headerRight: (): JSX.Element => (
				<Button
					onPress={() => setIsModalVisible(true)}
					variant="outline"
					borderWidth="$0"
				>
					<ButtonText>New Task</ButtonText>
					<ButtonIcon as={AddIcon} color="$info700" />
				</Button>
			),
		});
	}, [navigation]);

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

			<Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
				<ModalBackdrop />
				<ModalContent>
					<VStack space="md" padding="$4">
						{showError && (
							<Alert mx="$2.5" action="error" variant="solid">
								<AlertIcon as={InfoIcon} mr="$3" />
								<AlertText>
									Please do not leave the title field & description empty
								</AlertText>
							</Alert>
						)}
						{/* Form inputs for title, description, and date picker */}
						<Input
							variant="outline"
							size="md"
							isInvalid={false}
							isReadOnly={false}
						>
							<InputField
								value={newTaskTitle}
								onChangeText={setNewTaskTitle}
								placeholder="Enter Title here"
							/>
						</Input>
						<Input
							variant="outline"
							size="md"
							isInvalid={false}
							isReadOnly={false}
						>
							<InputField
								value={newTaskDescription}
								onChangeText={setNewTaskDescription}
								placeholder="Enter Description here"
							/>
						</Input>
						<DateTimePicker
							value={newTaskDeadline} // Default to current date
							mode="date"
							is24Hour
							display="default"
							onChange={handleDateChange} // Handle date change
						/>
						<Button
							size="md"
							variant="solid"
							action="primary"
							isFocusVisible={false}
							onPress={handleAddTask}
						>
							<ButtonText>Add</ButtonText>
						</Button>
					</VStack>
				</ModalContent>
			</Modal>
		</SafeScreen>
	);
}

export default Home;
