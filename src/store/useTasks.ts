import { storage } from '@/App';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export enum TaskStatus {
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	DONE = 'DONE',
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
}

const dummyTasks: Task[] = [
	{
		id: '1',
		title: 'Grocery Shopping',
		description: 'Buy milk, eggs, bread, and cheese from the supermarket.',
		status: TaskStatus.TODO,
		deadline: new Date(),
	},
	{
		id: '2',
		title: 'Book Doctor Appointment',
		description: 'Schedule a check-up appointment for next week.',
		status: TaskStatus.IN_PROGRESS,
		deadline: new Date(),
	},
	{
		id: '3',
		title: 'Pay Bills',
		description: 'Pay electricity and internet bills by the due date.',
		status: TaskStatus.DONE,
		deadline: new Date(),
	},
];

interface TaskStore {
	tasks: Task[];
	toggleTaskStatus: (id: string) => void;
	removeTask: (id: string) => void;
	addTask: (task: Omit<Task, 'id'>) => void;
}

export const useTaskStore = create(
	persist<TaskStore>(
		set => ({
			tasks: dummyTasks,
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
		}),
		{
			name: 'task-storage',
			storage: createJSONStorage(() => zustandStorage),
		},
	),
);
