import { storage } from '@/App';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export enum TaskStatus {
	TODO = 'Todo',
	IN_PROGRESS = 'In Progress',
	DONE = 'Done',
}

export enum TaskPriority {
	LOW = 'Low',
	MEDIUM = 'Medium',
	HIGH = 'High',
}

const zustandStorage = {
	setItem: (name: string, value: string) => {
		return storage.set(name, value);
	},
	getItem: (name: string) => {
		const value = storage.getString(name);
		return value ?? null;
	},
	removeItem: (name: string) => {
		return storage.delete(name);
	},
};

export interface Task {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	deadline: Date;
	priority: TaskPriority;
}

interface TaskStore {
	tasks: Task[];
	filteredTasks: Task[]; // Added filteredTasks
	enableSorting: boolean;
	toggleTaskStatus: (id: string) => void;
	removeTask: (id: string) => void;
	addTask: (task: Omit<Task, 'id'>) => void;
	editTask: (id: string, updatedTask: Omit<Task, 'id'>) => void;
	filterTasksByPriority: (priority: TaskPriority | 'all') => void;
	sortFilteredTasks: (enable: boolean) => void;
}

export const useTaskStore = create(
	persist<TaskStore>(
		set => ({
			tasks: [],
			filteredTasks: [], // Initialize filteredTasks
			enableSorting: false,
			toggleTaskStatus: (id: string) =>
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id
							? {
									...task,
									status:
										task.status === TaskStatus.DONE
											? TaskStatus.TODO
											: TaskStatus.DONE,
							  }
							: task,
					),
					filteredTasks: state.filteredTasks.map(task =>
						task.id === id
							? {
									...task,
									status:
										task.status === TaskStatus.DONE
											? TaskStatus.TODO
											: TaskStatus.DONE,
							  }
							: task,
					),
				})),
			removeTask: (id: string) =>
				set(state => {
					const updatedTasks = state.tasks.filter(task => task.id !== id);
					const updatedFilteredTasks = state.filteredTasks.filter(
						task => task.id !== id,
					);
					return {
						tasks: updatedTasks,
						filteredTasks: updatedFilteredTasks, // Update filteredTasks
					};
				}),
			addTask: (task: Omit<Task, 'id'>) =>
				set(state => {
					const newTask = { ...task, id: Date.now().toString() };
					const updatedTasks = [...state.tasks, newTask];
					const filteredTasks = [...state.filteredTasks, newTask];

					return {
						tasks: updatedTasks,
						filteredTasks: filteredTasks.filter(
							t =>
								t.priority === newTask.priority ||
								state.filteredTasks.some(
									ft => ft.priority === newTask.priority,
								),
						), // Update filteredTasks
					};
				}),
			editTask: (id: string, updatedTask: Omit<Task, 'id'>) =>
				set(state => {
					const updatedTasks = state.tasks.map(task =>
						task.id === id ? { ...task, ...updatedTask } : task,
					);
					const updatedFilteredTasks = state.filteredTasks.map(task =>
						task.id === id ? { ...task, ...updatedTask } : task,
					);
					return {
						tasks: updatedTasks,
						filteredTasks: updatedFilteredTasks, // Update filteredTasks
					};
				}),
			filterTasksByPriority: (
				priority: TaskPriority | 'all', // New method implementation
			) =>
				priority === 'all'
					? set(state => ({
							filteredTasks: state.tasks,
					  }))
					: set(state => ({
							filteredTasks: state.tasks.filter(
								task => task.priority === priority,
							),
					  })),
			sortFilteredTasks: (enable: boolean) =>
				set(state => {
					const sortedTasks = [...state.filteredTasks];
					if (enable) {
						// Sort by priority if enabled
						sortedTasks.sort((a, b) => {
							const priorityOrder = {
								[TaskPriority.HIGH]: 1,
								[TaskPriority.MEDIUM]: 2,
								[TaskPriority.LOW]: 3,
							};
							return priorityOrder[a.priority] - priorityOrder[b.priority];
						});
					} else {
						// Sort by ID if not enabled
						sortedTasks.sort((a, b) => a.id.localeCompare(b.id));
					}
					return { filteredTasks: sortedTasks, enableSorting: enable };
				}),
		}),

		{
			name: 'task-storage',
			storage: createJSONStorage(() => zustandStorage),
		},
	),
);
