// Export the Task interface
export interface Task {
  id: string;
  caption: string;
  body: string;
  done: boolean;
  createdAt: number;
  updatedAt: number;
}

class TaskService {
  private readonly STORAGE_KEY = 'tasks';

  private getTasksFromStorage(): Task[] {
    const tasksJson = localStorage.getItem(this.STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  async getTasks(): Promise<Task[]> {
    return this.getTasksFromStorage();
  }

  async addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const tasks = this.getTasksFromStorage();
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    tasks.push(newTask);
    this.saveTasksToStorage(tasks);
    return newTask;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const tasks = this.getTasksFromStorage();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) throw new Error('Task not found');

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: Date.now()
    };
    tasks[taskIndex] = updatedTask;
    this.saveTasksToStorage(tasks);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const tasks = this.getTasksFromStorage();
    const filteredTasks = tasks.filter(t => t.id !== id);
    this.saveTasksToStorage(filteredTasks);
  }

  // Optional: Add methods for filtering and sorting
  getTasksByDateRange(startDate: Date, endDate: Date): Task[] {
    return this.getTasksFromStorage().filter(task => 
      task.createdAt >= startDate.getTime() && task.createdAt <= endDate.getTime()
    );
  }

  getTasksSortedByDate(ascending: boolean = true): Task[] {
    const tasks = this.getTasksFromStorage();
    return [...tasks].sort((a, b) => {
      const dateA = a.createdAt;
      const dateB = b.createdAt;
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }
}

// Create a singleton instance
export const taskService = new TaskService(); 