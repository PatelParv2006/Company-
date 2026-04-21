import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Completed" | "On Hold" | "Archived";
  progress: number;
  dueDate: string;
  team: string[];
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [
        {
          id: "1",
          name: "NexGen Platform Redesign",
          description: "Updating the core enterprise dashboard with Lumiere principles.",
          status: "Active",
          progress: 65,
          dueDate: "2024-12-15",
          team: ["Alex", "Sarah", "Mike"],
        },
        {
          id: "2",
          name: "Mobile App Implementation",
          description: "Bringing the Nexus experience to iOS and Android.",
          status: "On Hold",
          progress: 40,
          dueDate: "2025-01-20",
          team: ["Kevin", "Alex"],
        },
      ],
      addProject: (project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updatedProject } : p
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "nexus-projects",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
