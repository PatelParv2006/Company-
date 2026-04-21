import { create } from 'zustand';
import { getData, setData } from '@/lib/demos/billing/session-store';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  gstRate: number;
  stock: number;
  createdAt: string;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const STORAGE_KEY = 'fintrack_products';

const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Cloud Hosting Subscription',
    price: 5000,
    gstRate: 18,
    category: 'Software',
    stock: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Web Development Services',
    price: 50000,
    gstRate: 18,
    category: 'Service',
    stock: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-3',
    name: 'Logo Design',
    price: 15000,
    gstRate: 12,
    category: 'Design',
    stock: 20,
    createdAt: new Date().toISOString(),
  },
];

export const useProductStore = create<ProductState>((set, get) => ({
  products: getData<Product[]>(STORAGE_KEY, defaultProducts),
  
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    const updatedProducts = [...get().products, newProduct];
    set({ products: updatedProducts });
    setData(STORAGE_KEY, updatedProducts);
  },
  
  updateProduct: (id, productData) => {
    const updatedProducts = get().products.map((p) => 
      p.id === id ? { ...p, ...productData } : p
    );
    set({ products: updatedProducts });
    setData(STORAGE_KEY, updatedProducts);
  },
  
  deleteProduct: (id) => {
    const updatedProducts = get().products.filter((p) => p.id !== id);
    set({ products: updatedProducts });
    setData(STORAGE_KEY, updatedProducts);
  },
  
  getProduct: (id) => {
    return get().products.find((p) => p.id === id);
  },
}));
