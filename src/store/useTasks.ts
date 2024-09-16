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
	toggleTaskStatus: (id: string) => void;
	removeTask: (id: string) => void;
	addTask: (task: Omit<Task, 'id'>) => void;
	editTask: (id: string, updatedTask: Omit<Task, 'id'>) => void;
}

export const useTaskStore = create(
	persist<TaskStore>(
		set => ({
			tasks: [],
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
				})),
			removeTask: (id: string) =>
				set(state => ({
					tasks: state.tasks.filter(task => task.id !== id),
				})),
			addTask: (task: Omit<Task, 'id'>) =>
				set(state => ({
					tasks: [...state.tasks, { ...task, id: Date.now().toString() }],
				})),
			editTask: (
				id: string,
				updatedTask: Omit<Task, 'id'>, // New method implementation
			) =>
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id ? { ...task, ...updatedTask } : task,
					),
				})),
		}),
		{
			name: 'task-storage',
			storage: createJSONStorage(() => zustandStorage),
		},
	),
);
