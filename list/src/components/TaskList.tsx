import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, Plus, X, Check, Pencil, Trash2 } from "lucide-react";
import { type Task, taskService } from "@/services/taskService";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskCaption, setNewTaskCaption] = useState("");
  const [newTaskBody, setNewTaskBody] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskCaption, setEditTaskCaption] = useState("");
  const [editTaskBody, setEditTaskBody] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      const loadedTasks = await taskService.getTasks();
      setTasks(loadedTasks);
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTaskCaption.trim()) return;

    const newTask = await taskService.addTask({
      caption: newTaskCaption,
      body: newTaskBody,
      done: false
    });

    setTasks([...tasks, newTask]);
    setNewTaskCaption("");
    setNewTaskBody("");
    setIsAddingTask(false);
  };

  const handleEditTask = async (id: string) => {
    if (!editTaskCaption.trim()) return;

    const updatedTask = await taskService.updateTask(id, {
      caption: editTaskCaption,
      body: editTaskBody,
    });

    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    setEditingTaskId(null);
  };

  const handleDeleteTask = async (id: string) => {
    await taskService.deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskDone = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTask = await taskService.updateTask(id, {
      ...task,
      done: !task.done
    });

    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="new-caption" className="text-sm font-medium">
                Caption
              </label>
              <Input
                id="new-caption"
                value={newTaskCaption}
                onChange={(e) => setNewTaskCaption(e.target.value)}
                placeholder="Enter task caption"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="new-body" className="text-sm font-medium">
                Body
              </label>
              <Textarea
                id="new-body"
                value={newTaskBody}
                onChange={(e) => setNewTaskBody(e.target.value)}
                placeholder="Enter task details"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddingTask(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className={`${task.done ? 'bg-gray-50' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              {editingTaskId === task.id ? (
                <div className="flex-1 space-y-2">
                  <Input
                    value={editTaskCaption}
                    onChange={(e) => setEditTaskCaption(e.target.value)}
                    placeholder="Enter task caption"
                  />
                  <Textarea
                    value={editTaskBody}
                    onChange={(e) => setEditTaskBody(e.target.value)}
                    placeholder="Enter task details"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setEditingTaskId(null)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => handleEditTask(task.id)}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <CardTitle className={`text-lg ${task.done ? 'line-through text-gray-500' : ''}`}>
                    {task.caption}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toggleTaskDone(task.id)}>
                        {task.done ? (
                          <>
                            <X className="mr-2 h-4 w-4" />
                            Mark as Undone
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Done
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setEditingTaskId(task.id);
                        setEditTaskCaption(task.caption);
                        setEditTaskBody(task.body);
                      }}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </CardHeader>
            {editingTaskId !== task.id && (
              <CardContent>
                <p className={`text-sm text-gray-500 ${task.done ? 'line-through' : ''}`}>
                  {task.body}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
} 