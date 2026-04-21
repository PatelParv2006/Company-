import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "Low" | "Medium" | "High";
  assignee: string;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (id: string, newStatus: Task["status"]) => void;
  setTasks: (tasks: Task[]) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: "t1",
          title: "Update Brand Guidelines",
          description: "Finalize the color palette for the Lumina design system.",
          status: "todo",
          priority: "High",
          assignee: "Sarah",
        },
        {
          id: "t2",
          title: "API Integration docs",
          description: "Document the CRM data flow for the team.",
          status: "in-progress",
          priority: "Medium",
          assignee: "Mike",
        },
        {
          id: "t3",
          title: "Fix Chart Animations",
          description: "Ensuring smooth transitions on the analytics dashboard.",
          status: "done",
          priority: "Low",
          assignee: "Alex",
        },
      ],
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      moveTask: (id, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status: newStatus } : t
          ),
        })),
      setTasks: (tasks) => set({ tasks }),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "nexus-tasks",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
