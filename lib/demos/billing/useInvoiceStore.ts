import { create } from 'zustand';
import { getData, setData } from '@/lib/demos/billing/session-store';

export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

export interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  gstRate: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  gstAmount: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  notes?: string;
  createdAt: string;
}

interface InvoiceState {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  getInvoice: (id: string) => Invoice | undefined;
  getNextInvoiceNumber: () => string;
}

const STORAGE_KEY = 'fintrack_invoices';

const defaultInvoices: Invoice[] = [
  {
    id: 'inv-1',
    number: 'INV-2024-001',
    customerId: 'cust-1',
    customerName: 'Acme Corp',
    date: '2024-03-01',
    dueDate: '2024-03-15',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Cloud Hosting Subscription',
        quantity: 1,
        price: 5000,
        gstRate: 18,
        total: 5900,
      }
    ],
    subtotal: 5000,
    gstAmount: 900,
    discount: 0,
    total: 5900,
    status: 'Paid',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'inv-2',
    number: 'INV-2024-002',
    customerId: 'cust-2',
    customerName: 'Global Tech Solutions',
    date: '2024-03-05',
    dueDate: '2024-03-20',
    items: [
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'Web Development Services',
        quantity: 1,
        price: 50000,
        gstRate: 18,
        total: 59000,
      }
    ],
    subtotal: 50000,
    gstAmount: 9000,
    discount: 5000,
    total: 54000,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  }
];

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoices: getData<Invoice[]>(STORAGE_KEY, defaultInvoices),
  
  addInvoice: (invoiceData) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    const updatedInvoices = [newInvoice, ...get().invoices];
    set({ invoices: updatedInvoices });
    setData(STORAGE_KEY, updatedInvoices);
  },
  
  updateInvoice: (id, invoiceData) => {
    const updatedInvoices = get().invoices.map((inv) => 
      inv.id === id ? { ...inv, ...invoiceData } : inv
    );
    set({ invoices: updatedInvoices });
    setData(STORAGE_KEY, updatedInvoices);
  },
  
  deleteInvoice: (id) => {
    const updatedInvoices = get().invoices.filter((inv) => inv.id !== id);
    set({ invoices: updatedInvoices });
    setData(STORAGE_KEY, updatedInvoices);
  },
  
  getInvoice: (id) => {
    return get().invoices.find((inv) => inv.id === id);
  },
  
  getNextInvoiceNumber: () => {
    const count = get().invoices.length + 1;
    const year = new Date().getFullYear();
    return `INV-${year}-${count.toString().padStart(3, '0')}`;
  },
}));
