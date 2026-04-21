import { create } from 'zustand';
import { getData, setData } from '@/lib/demos/billing/session-store';

export type PaymentMethod = 'UPI' | 'Cash' | 'Card';

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  date: string;
  method: PaymentMethod;
  notes?: string;
  createdAt: string;
}

interface PaymentState {
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id' | 'createdAt'>) => void;
  deletePayment: (id: string) => void;
}

const STORAGE_KEY = 'fintrack_payments';

const defaultPayments: Payment[] = [
  {
    id: 'pay-1',
    invoiceId: 'inv-1',
    invoiceNumber: 'INV-2024-001',
    customerName: 'Acme Corp',
    amount: 5900,
    date: '2024-03-02',
    method: 'UPI',
    createdAt: new Date().toISOString(),
  }
];

export const usePaymentStore = create<PaymentState>((set, get) => ({
  payments: getData<Payment[]>(STORAGE_KEY, defaultPayments),
  
  addPayment: (paymentData) => {
    const newPayment: Payment = {
      ...paymentData,
      id: `pay-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    const updatedPayments = [newPayment, ...get().payments];
    set({ payments: updatedPayments });
    setData(STORAGE_KEY, updatedPayments);
  },
  
  deletePayment: (id) => {
    const updatedPayments = get().payments.filter((p) => p.id !== id);
    set({ payments: updatedPayments });
    setData(STORAGE_KEY, updatedPayments);
  },
}));
