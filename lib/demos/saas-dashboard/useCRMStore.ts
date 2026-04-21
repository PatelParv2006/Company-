import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "Lead" | "Customer" | "Partner";
  dealValue: number;
  lastContact?: string;
}

interface CRMState {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
}

export const useCRMStore = create<CRMState>()(
  persist(
    (set) => ({
      contacts: [
        {
          id: "c1",
          name: "John Doe",
          email: "john@acme.com",
          company: "Acme Corp",
          status: "Customer",
          dealValue: 15000,
        },
        {
          id: "c2",
          name: "Jane Smith",
          email: "jane@globex.io",
          company: "Globex Solutions",
          status: "Lead",
          dealValue: 5000,
        },
      ],
      addContact: (contact) =>
        set((state) => ({ contacts: [...state.contacts, contact] })),
      updateContact: (id, updatedContact) =>
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === id ? { ...c, ...updatedContact } : c
          ),
        })),
      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "nexus-crm",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
