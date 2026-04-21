export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Aero Over-Ear Studio Headphones",
    price: 349.0,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    category: "Headphones",
    rating: 4.8,
    reviews: 124,
    description: "Immerse yourself in sonic perfection. The Aero Studio Headphones feature active noise cancellation and memory foam ear cups for all-day listening.",
    tags: ["audio", "wireless", "premium"]
  },
  {
    id: "p2",
    name: "Chronos Obsidian Watch",
    price: 899.0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    category: "Watches",
    rating: 4.9,
    reviews: 56,
    description: "A masterclass in horology. The Chronos Obsidian features a matte black dial, sapphire crystal, and an automatic movement with a 48-hour power reserve.",
    tags: ["luxury", "mens", "automatic"]
  },
  {
    id: "p3",
    name: "Minimalist Leather Backpack",
    price: 245.0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    category: "Bags",
    rating: 4.6,
    reviews: 89,
    description: "Crafted from full-grain Italian leather, this backpack is designed for the modern professional. Includes a padded laptop compartment and water-resistant lining.",
    tags: ["leather", "travel", "work"]
  },
  {
    id: "p4",
    name: "Lumina Wireless Charger",
    price: 79.0,
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop",
    category: "Gadgets",
    rating: 4.7,
    reviews: 312,
    description: "A sculptural approach to charging. Solid aluminum unibody with a soft-touch charging surface. Supports fast charging up to 15W.",
    tags: ["tech", "desk", "wireless"]
  },
  {
    id: "p5",
    name: "Velocity Running Sneakers",
    price: 185.0,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    category: "Shoes",
    rating: 4.5,
    reviews: 210,
    description: "Engineered for speed. The Velocity sneakers feature a carbon fiber plate and ultra-responsive foam for maximum energy return.",
    tags: ["sports", "running", "performance"]
  },
  {
    id: "p6",
    name: "Heritage Mechanical Keyboard",
    price: 210.0,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
    category: "Gadgets",
    rating: 4.9,
    reviews: 78,
    description: "Tactile bliss. Featuring custom-lubed linear switches, thick PBT keycaps, and a solid brass weight for a premium typing experience.",
    tags: ["tech", "desk", "mechanical"]
  },
  {
    id: "p7",
    name: "Eclipse Noise-Isolating Earbuds",
    price: 159.0,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
    category: "Headphones",
    rating: 4.4,
    reviews: 432,
    description: "Tiny footprint, massive sound. The Eclipse earbuds offer 8 hours of playback, multipoint connection, and studio-grade EQ via the companion app.",
    tags: ["audio", "wireless", "compact"]
  },
  {
    id: "p8",
    name: "Nomad Canvas Duffel",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop",
    category: "Bags",
    rating: 4.8,
    reviews: 156,
    description: "Your perfect weekend companion. Heavyweight waxed canvas, solid brass hardware, and a separate shoe compartment.",
    tags: ["travel", "weekend", "canvas"]
  },
  {
    id: "p9",
    name: "Apex Smartwatch Series 4",
    price: 399.0,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
    category: "Watches",
    rating: 4.7,
    reviews: 890,
    description: "The ultimate health companion. Always-on OLED display, ECG monitoring, and a titanium case built for the elements.",
    tags: ["smart", "health", "tech"]
  },
  {
    id: "p10",
    name: "Aura Smart Lamp",
    price: 110.0,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop",
    category: "Gadgets",
    rating: 4.6,
    reviews: 65,
    description: "Set the mood. 16 million colors, circadian rhythm sync, and voice-activated via all major smart home ecosystems.",
    tags: ["home", "smart", "lighting"]
  },
  {
    id: "p11",
    name: "Crescent Crossbody Bag",
    price: 195.0,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
    category: "Bags",
    rating: 4.9,
    reviews: 112,
    description: "Elegant and compact. Saffiano leather construction with a minimalist magnetic closure. Perfect for daily essentials.",
    tags: ["womens", "leather", "daily"]
  },
  {
    id: "p12",
    name: "Pulse Portable Speaker",
    price: 145.0,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
    category: "Gadgets",
    rating: 4.5,
    reviews: 320,
    description: "360-degree sound in a waterproof casing. The Pulse speaker brings the party anywhere with 24-hour battery life.",
    tags: ["audio", "portable", "waterproof"]
  },
  {
    id: "p13",
    name: "Titan Workstation Desktop",
    price: 2499.0,
    image: "https://images.unsplash.com/photo-1771046831228-54766bba552b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Computers",
    rating: 4.9,
    reviews: 42,
    description: "Unleash ultimate power. The Titan Workstation is built for professionals, featuring liquid cooling and a minimalist brushed steel chassis.",
    tags: ["work", "power", "professional"]
  },
  {
    id: "p14",
    name: "UltraBook Pro 14",
    price: 1299.0,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    category: "Computers",
    rating: 4.8,
    reviews: 156,
    description: "The peak of portability. A stunning 14-inch OLED display, 20-hour battery life, and a chassis carved from a single block of aluminum.",
    tags: ["laptop", "apple-style", "slim"]
  },
  {
    id: "p15",
    name: "Apex Nano Wireless Mouse",
    price: 129.0,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.7,
    reviews: 215,
    description: "Precision at your fingertips. The Apex Nano features a 26k DPI sensor and a frictionless design for effortless movement.",
    tags: ["gaming", "wireless", "desk"]
  },
  {
    id: "p16",
    name: "CoreX i9-X Processor",
    price: 599.0,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop",
    category: "Components",
    rating: 5.0,
    reviews: 89,
    description: "The heart of your dream build. 24 cores of pure processing power, designed for high-end content creation and gaming.",
    tags: ["cpu", "hardware", "pro"]
  },
  {
    id: "p17",
    name: "Quantum RTX 5090 GPU",
    price: 1599.0,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop",
    category: "Components",
    rating: 4.9,
    reviews: 34,
    description: "Experience the future of graphics. AI-powered ray tracing and massive 24GB VRAM for uncompromised 4K performance.",
    tags: ["gpu", "gaming", "ai"]
  },
  {
    id: "p18",
    name: "Nebula OLED Smartphone",
    price: 999.0,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    category: "Mobiles",
    rating: 4.6,
    reviews: 742,
    description: "A pocket-sized powerhouse. Features a seamless 120Hz display and a triple-lens camera system with cinematic stabilization.",
    tags: ["mobile", "tech", "camera"]
  },
  {
    id: "p19",
    name: "Studio Mic Pro",
    price: 299.0,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.8,
    reviews: 128,
    description: "Broadcast-quality audio. Integrated pop filter and high-precision condenser capsule for crystal clear recording.",
    tags: ["audio", "streaming", "pro"]
  },
  {
    id: "p20",
    name: "Mechanical Macro Pad",
    price: 89.0,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.7,
    reviews: 56,
    description: "Optimize your workflow. 12 fully programmable keys with customizable RGB and tactile switches.",
    tags: ["tech", "workflow", "keyboard"]
  },
  {
    id: "p21",
    name: "Zenith Curved Monitor 34\"",
    price: 849.0,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
    category: "Computers",
    rating: 4.9,
    reviews: 95,
    description: "Panoramic immersion. 144Hz refresh rate, HDR 1000, and a 1500R curve for deep visual engagement.",
    tags: ["display", "gaming", "desk"]
  },
  {
    id: "p22",
    name: "Nomad SSD 2TB",
    price: 189.0,
    image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.8,
    reviews: 312,
    description: "Rugged and fast. Transfer files at up to 2000MB/s with an IP65 rating for water and dust resistance.",
    tags: ["storage", "tech", "portable"]
  },
  {
    id: "p23",
    name: "Vision VR Headset",
    price: 999.0,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop",
    category: "Gadgets",
    rating: 4.7,
    reviews: 145,
    description: "Step into another world. Dual 4K displays and spatial audio for the most immersive VR experience yet.",
    tags: ["tech", "gaming", "vr"]
  },
  {
    id: "p24",
    name: "Smart Glass Frame",
    price: 299.0,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    category: "Gadgets",
    rating: 4.5,
    reviews: 87,
    description: "Intelligence in sight. HUD display for notifications and navigation in a stylish, lightweight frame.",
    tags: ["smart", "tech", "eyes"]
  },
  {
    id: "p25",
    name: "Phantom X Drone",
    price: 1199.0,
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=800&auto=format&fit=crop",
    category: "Gadgets",
    rating: 4.9,
    reviews: 64,
    description: "Capture the world from above. 8K video recording, 45-minute flight time, and advanced obstacle avoidance.",
    tags: ["photo", "drone", "pro"]
  },
  {
    id: "p26",
    name: "Apex Pen Tablet",
    price: 349.0,
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.8,
    reviews: 210,
    description: "Natural creativity. 8192 levels of pressure sensitivity and a textured surface that feels like paper.",
    tags: ["design", "art", "pro"]
  },
  {
    id: "p27",
    name: "Velocity Wi-Fi 7 Router",
    price: 449.0,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    category: "Gadgets",
    rating: 4.7,
    reviews: 53,
    description: "The speed of light. Next-gen Wi-Fi 7 technology for lag-free gaming and seamless 8K streaming.",
    tags: ["networking", "tech", "home"]
  },
  {
    id: "p28",
    name: "Silent Breeze Desk Fan",
    price: 79.0,
    image: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=800&auto=format&fit=crop",
    category: "Gadgets",
    rating: 4.6,
    reviews: 142,
    description: "Cool and quiet. Bladeless design with active noise cancellation for a focused work environment.",
    tags: ["desk", "office", "comfort"]
  },
  {
    id: "p29",
    name: "Ergo Vertical Mouse",
    price: 99.0,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.7,
    reviews: 284,
    description: "Maximum comfort. A 57-degree vertical design that reduces wrist strain for all-day productivity.",
    tags: ["comfort", "desk", "pro"]
  },
  {
    id: "p30",
    name: "MacBook Pro M5",
    price: 249.0,
    image: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Laptop",
    rating: 4.9,
    reviews: 76,
    description: "Pure sound purity. High-resolution audio converter that brings your music to life with unmatched clarity.",
    tags: ["audio", "pro", "desk"]
  }
];

export const getFeaturedProducts = () => [
  products[12], // Titan Workstation
  products[13], // UltraBook Pro
  products[15], // CoreX i9
  products[16], // Quantum RTX 5090
  products[17], // Nebula OLED
  products[20], // Zenith Curved Monitor
];

export const getBestSellers = () => [
  products[0], // Aero Headphones
  products[1], // Chronos Watch
  products[3], // Lumina Wireless Charger
  products[5], // Heritage Mechanical Keyboard
  products[14], // Apex Nano Mouse
  products[18], // Studio Mic Pro
  products[21], // Nomad SSD
  products[22], // Vision VR
];

export const getProductById = (id: string) => products.find(p => p.id === id);
