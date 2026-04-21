export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  inStock: boolean;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Aero Over-Ear Studio Headphones",
    price: 349.0,
    rating: 4.8,
    reviewCount: 124,
    category: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "Immerse yourself in sonic perfection. The Aero Studio Headphones feature active noise cancellation and memory foam ear cups for all-day listening."
  },
  {
    id: "p2",
    name: "Chronos Obsidian Watch",
    price: 899.0,
    rating: 4.9,
    reviewCount: 56,
    category: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "A masterclass in horology. The Chronos Obsidian features a matte black dial, sapphire crystal, and an automatic movement with a 48-hour power reserve."
  },
  {
    id: "p3",
    name: "Minimalist Leather Backpack",
    price: 245.0,
    rating: 4.6,
    reviewCount: 89,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "Crafted from full-grain Italian leather, this backpack is designed for the modern professional. Includes a padded laptop compartment and water-resistant lining."
  },
  {
    id: "p4",
    name: "Lumina Wireless Charger",
    price: 79.0,
    rating: 4.7,
    reviewCount: 312,
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "A sculptural approach to charging. Solid aluminum unibody with a soft-touch charging surface. Supports fast charging up to 15W."
  },
  {
    id: "p5",
    name: "Velocity Running Sneakers",
    price: 185.0,
    rating: 4.5,
    reviewCount: 210,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "Engineered for speed. The Velocity sneakers feature a carbon fiber plate and ultra-responsive foam for maximum energy return."
  },
  {
    id: "p6",
    name: "Heritage Mechanical Keyboard",
    price: 210.0,
    rating: 4.9,
    reviewCount: 78,
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "Tactile bliss. Featuring custom-lubed linear switches, thick PBT keycaps, and a solid brass weight for a premium typing experience."
  },
  {
    id: "p13",
    name: "Titan Workstation Desktop",
    price: 2499.0,
    rating: 4.9,
    reviewCount: 42,
    category: "Computers",
    image: "https://images.unsplash.com/photo-1771046831228-54766bba552b?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "Unleash ultimate power. The Titan Workstation is built for professionals, featuring liquid cooling and a minimalist brushed steel chassis."
  },
  {
    id: "p14",
    name: "UltraBook Pro 14",
    price: 1299.0,
    rating: 4.8,
    reviewCount: 156,
    category: "Computers",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "The peak of portability. A stunning 14-inch OLED display, 20-hour battery life, and a chassis carved from a single block of aluminum."
  },
  {
    id: "p16",
    name: "CoreX i9-X Processor",
    price: 599.0,
    rating: 5.0,
    reviewCount: 89,
    category: "Components",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "The heart of your dream build. 24 cores of pure processing power, designed for high-end content creation and gaming."
  },
  {
    id: "p17",
    name: "Quantum RTX 5090 GPU",
    price: 1599.0,
    rating: 4.9,
    reviewCount: 34,
    category: "Components",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "Experience the future of graphics. AI-powered ray tracing and massive 24GB VRAM for uncompromised 4K performance."
  },
  {
    id: "p18",
    name: "Nebula OLED Smartphone",
    price: 999.0,
    rating: 4.6,
    reviewCount: 742,
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "A pocket-sized powerhouse. Features a seamless 120Hz display and a triple-lens camera system with cinematic stabilization."
  },
  {
    id: "p21",
    name: "Zenith Curved Monitor 34\"",
    price: 849.0,
    rating: 4.9,
    reviewCount: 95,
    category: "Computers",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    description: "Panoramic immersion. 144Hz refresh rate, HDR 1000, and a 1500R curve for deep visual engagement."
  }
];
