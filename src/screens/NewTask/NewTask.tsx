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
	const {
		layout,
		backgrounds,
		gutters,
		fonts,
		borders,
		navigationTheme,
		variant,
	} = useTheme();
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
						bgColor={navigationTheme.colors.background}
						style={[layout.z10, layout.absolute, gutters.paddingHorizontal_8]}
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
							style={[fonts.gray800]}
						/>
					</Input>
				</FormControl>
				<FormControl>
					<FormControlLabel
						bgColor={navigationTheme.colors.background}
						style={[layout.z10, layout.absolute, gutters.paddingHorizontal_8]}
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
							style={[fonts.gray800]}
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
						themeVariant={variant === 'dark' ? 'dark' : 'light'}
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
									selectedPriority === TaskPriority.HIGH && backgrounds.red400, // Highlight selected
								]}
							>
								<Text style={fonts.bold}>High</Text>
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
										backgrounds.yellow400, // Highlight selected
								]}
							>
								<Text style={fonts.bold}>Medium</Text>
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
									selectedPriority === TaskPriority.LOW && backgrounds.green400, // Highlight selected
								]}
							>
								<Text style={fonts.bold}>Low</Text>
							</Box>
						</Pressable>
					</HStack>
				</Box>
				<Button
					mt="$4"
					size="lg"
					rounded="$2xl"
					variant="solid"
					action="primary"
					isFocusVisible={false}
					onPress={handleAddTask}
				>
					<ButtonText style={[fonts.bold, fonts.size_18]}>
						Create Task
					</ButtonText>
				</Button>
			</VStack>
		</SafeScreen>
	);
}

export default NewTask;
