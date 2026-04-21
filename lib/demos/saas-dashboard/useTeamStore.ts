import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: "Online" | "Offline" | "Busy";
}

interface TeamState {
  members: TeamMember[];
  addMember: (member: TeamMember) => void;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      members: [
        {
          id: "m1",
          name: "Alex Rivera",
          role: "Design Lead",
          email: "alex@nexus.ai",
          avatar: "AR",
          status: "Online",
        },
        {
          id: "m2",
          name: "Sarah Chen",
          role: "Product Manager",
          email: "sarah@nexus.ai",
          avatar: "SC",
          status: "Online",
        },
        {
          id: "m3",
          name: "Mike Johnson",
          role: "Senior Engineer",
          email: "mike@nexus.ai",
          avatar: "MJ",
          status: "Busy",
        },
      ],
      addMember: (member) =>
        set((state) => ({ members: [...state.members, member] })),
    }),
    {
      name: "nexus-team",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
