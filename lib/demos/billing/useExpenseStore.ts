import { create } from 'zustand';
import { getData, setData } from '@/lib/demos/billing/session-store';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  createdAt: string;
}

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
}

const STORAGE_KEY = 'fintrack_expenses';

const defaultExpenses: Expense[] = [
  {
    id: 'exp-1',
    description: 'Office Rent',
    amount: 20000,
    date: '2024-03-01',
    category: 'Rent',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'exp-2',
    description: 'Internet Bill',
    amount: 1500,
    date: '2024-03-05',
    category: 'Utilities',
    createdAt: new Date().toISOString(),
  }
];

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: getData<Expense[]>(STORAGE_KEY, defaultExpenses),
  
  addExpense: (expenseData) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    const updatedExpenses = [newExpense, ...get().expenses];
    set({ expenses: updatedExpenses });
    setData(STORAGE_KEY, updatedExpenses);
  },
  
  updateExpense: (id, expenseData) => {
    const updatedExpenses = get().expenses.map((e) => 
      e.id === id ? { ...e, ...expenseData } : e
    );
    set({ expenses: updatedExpenses });
    setData(STORAGE_KEY, updatedExpenses);
  },
  
  deleteExpense: (id) => {
    const updatedExpenses = get().expenses.filter((e) => e.id !== id);
    set({ expenses: updatedExpenses });
    setData(STORAGE_KEY, updatedExpenses);
  },
}));
