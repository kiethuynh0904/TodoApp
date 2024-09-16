import { TaskPriority, TaskStatus, useTaskStore } from '@/store/useTasks';
import { FunctionComponent } from '@/types/guards/common';
import { useTheme } from '@/theme';
import { useCallback, useState } from 'react';
import { Text } from '@/components/atoms';
import {
	Alert,
	AlertIcon,
	AlertText,
	Box,
	Button,
	ButtonText,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	HStack,
	InfoIcon,
	Input,
	InputField,
	Pressable,
	VStack,
} from '@gluestack-ui/themed';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { useNavigation } from '@react-navigation/native';
import { RootScreenProps } from '@/types/navigation';
import { SafeScreen } from '@/components/template';

function NewTask(): FunctionComponent {
	const { layout, backgrounds, gutters, fonts, borders } = useTheme();
	const navigation = useNavigation<RootScreenProps['navigation']>();
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [newTaskDescription, setNewTaskDescription] = useState('');
	const [selectedPriority, setSelectedPriority] = useState<TaskPriority>(
		TaskPriority.LOW,
	); // Add state for selected priority
	const [showError, setShowError] = useState(false);
	const [newTaskDeadline, setNewTaskDeadline] = useState<Date>(new Date());
	const { addTask } = useTaskStore();

	const handleDateChange = (
		_event: unknown,
		selectedDate: Date | undefined,
	) => {
		if (selectedDate) {
			setNewTaskDeadline(selectedDate); // Set the selected date
		}
	};

	const handleAddTask = useCallback(() => {
		if (newTaskTitle.trim() === '' || newTaskDescription.trim() === '') {
			setShowError(true);
			return;
		}

		addTask({
			title: newTaskTitle,
			description: newTaskDescription,
			status: TaskStatus.TODO,
			deadline: newTaskDeadline,
			priority: selectedPriority,
		});
		setNewTaskTitle('');
		setNewTaskDescription('');
		setShowError(false);
		navigation.goBack();
	}, [newTaskTitle, newTaskDescription, selectedPriority, addTask, navigation]);

	return (
		<SafeScreen>
			<VStack space="lg" padding="$4">
				{showError && (
					<Alert mx="$2.5" action="error" variant="solid">
						<AlertIcon as={InfoIcon} mr="$3" />
						<AlertText>
							Please do not leave the title field & description empty
						</AlertText>
					</Alert>
				)}
				<FormControl>
					<FormControlLabel
						style={[
							layout.z10,
							layout.absolute,
							backgrounds.gray50,
							gutters.paddingHorizontal_8,
						]}
						top="-$2.5"
						left={12}
					>
						<FormControlLabelText
							style={[fonts.gray400, fonts.size_14, fonts.bold]}
						>
							Title
						</FormControlLabelText>
					</FormControlLabel>
					<Input h={46} variant="outline" size="md" borderRadius="$md">
						<InputField
							value={newTaskTitle}
							onChangeText={setNewTaskTitle}
							placeholder="Enter Title"
						/>
					</Input>
				</FormControl>
				<FormControl>
					<FormControlLabel
						style={[
							layout.z10,
							layout.absolute,
							backgrounds.gray50,
							gutters.paddingHorizontal_8,
						]}
						top="-$2.5"
						left={12}
					>
						<FormControlLabelText
							style={[fonts.gray400, fonts.size_14, fonts.bold]}
						>
							Description
						</FormControlLabelText>
					</FormControlLabel>
					<Input variant="outline" size="md" borderRadius="$md" h={46}>
						<InputField
							value={newTaskDescription}
							onChangeText={setNewTaskDescription}
							placeholder="Enter Description"
						/>
					</Input>
				</FormControl>
				<Box style={[layout.itemsCenter, layout.row]}>
					<Text>Exp Time:</Text>
					<DateTimePicker
						value={newTaskDeadline} // Default to current date
						mode="date"
						is24Hour
						display="default"
						onChange={handleDateChange} // Handle date change
					/>
				</Box>
				<Box>
					<Text>Priority</Text>
					<HStack space="md" mt="$2">
						<Pressable onPress={() => setSelectedPriority(TaskPriority.HIGH)}>
							<Box
								minWidth={70}
								style={[
									layout.itemsCenter,
									gutters.padding_8,
									borders.rounded_16,
									borders.w_1,
									borders.red400,
									selectedPriority === TaskPriority.HIGH && backgrounds.red100, // Highlight selected
								]}
							>
								<Text>High</Text>
							</Box>
						</Pressable>
						<Pressable onPress={() => setSelectedPriority(TaskPriority.MEDIUM)}>
							<Box
								minWidth={70}
								style={[
									layout.itemsCenter,
									gutters.padding_8,
									borders.rounded_16,
									borders.w_1,
									borders.yellow400,
									selectedPriority === TaskPriority.MEDIUM &&
										backgrounds.yellow100, // Highlight selected
								]}
							>
								<Text>Medium</Text>
							</Box>
						</Pressable>
						<Pressable onPress={() => setSelectedPriority(TaskPriority.LOW)}>
							<Box
								minWidth={70}
								style={[
									layout.itemsCenter,
									gutters.padding_8,
									borders.rounded_16,
									borders.w_1,
									borders.green400,
									selectedPriority === TaskPriority.LOW && backgrounds.green100, // Highlight selected
								]}
							>
								<Text>Low</Text>
							</Box>
						</Pressable>
					</HStack>
				</Box>
				<Button
					size="md"
					rounded="$2xl"
					variant="solid"
					action="primary"
					isFocusVisible={false}
					onPress={handleAddTask}
				>
					<ButtonText>Add Task</ButtonText>
				</Button>
			</VStack>
		</SafeScreen>
	);
}

export default NewTask;
