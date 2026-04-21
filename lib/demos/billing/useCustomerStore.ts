import { create } from 'zustand';
import { getData, setData } from '@/lib/demos/billing/session-store';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gstin?: string;
  totalPurchases: number;
  dueAmount: number;
  createdAt: string;
}

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'totalPurchases' | 'dueAmount' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
}

const STORAGE_KEY = 'fintrack_customers';

const defaultCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Acme Corp',
    email: 'billing@acme.com',
    phone: '9876543210',
    address: '123 Business Park, Bangalore, KA - 560001',
    gstin: '29AAAAA0000A1Z5',
    totalPurchases: 150000,
    dueAmount: 25000,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cust-2',
    name: 'Global Tech Solutions',
    email: 'finance@globaltech.in',
    phone: '9822334455',
    address: '456 Tech Corridor, Hyderabad, TS - 500032',
    gstin: '36BBBBB1111B1Z2',
    totalPurchases: 450000,
    dueAmount: 0,
    createdAt: new Date().toISOString(),
  },
];

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: getData<Customer[]>(STORAGE_KEY, defaultCustomers),
  
  addCustomer: (customerData) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust-${Math.random().toString(36).substr(2, 9)}`,
      totalPurchases: 0,
      dueAmount: 0,
      createdAt: new Date().toISOString(),
    };
    const updatedCustomers = [...get().customers, newCustomer];
    set({ customers: updatedCustomers });
    setData(STORAGE_KEY, updatedCustomers);
  },
  
  updateCustomer: (id, customerData) => {
    const updatedCustomers = get().customers.map((c) => 
      c.id === id ? { ...c, ...customerData } : c
    );
    set({ customers: updatedCustomers });
    setData(STORAGE_KEY, updatedCustomers);
  },
  
  deleteCustomer: (id) => {
    const updatedCustomers = get().customers.filter((c) => c.id !== id);
    set({ customers: updatedCustomers });
    setData(STORAGE_KEY, updatedCustomers);
  },
  
  getCustomer: (id) => {
    return get().customers.find((c) => c.id === id);
  },
}));
