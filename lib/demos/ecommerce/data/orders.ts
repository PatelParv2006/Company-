export interface Order {
  id: string
  customer: string
  email: string
  products: { name: string; quantity: number; price: number }[]
  date: string
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded"
  total: number
  paymentMethod: string
}

export const orders: Order[] = [
  {
    id: "ORD-8492",
    customer: "John Doe",
    email: "john.doe@email.com",
    products: [
      { name: "Aero Over-Ear Studio Headphones", quantity: 1, price: 349.00 },
      { name: "Lumina Wireless Charger", quantity: 2, price: 79.00 },
    ],
    date: "2026-04-18",
    status: "Shipped",
    total: 507.00,
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "ORD-8493",
    customer: "Jane Smith",
    email: "jane.smith@email.com",
    products: [
      { name: "Chronos Obsidian Watch", quantity: 1, price: 899.00 },
    ],
    date: "2026-04-18",
    status: "Processing",
    total: 899.00,
    paymentMethod: "Mastercard •••• 8181",
  },
  {
    id: "ORD-8494",
    customer: "Mike Johnson",
    email: "mike.j@email.com",
    products: [
      { name: "Minimalist Leather Backpack", quantity: 1, price: 245.00 },
      { name: "Nomad Canvas Duffel", quantity: 1, price: 120.00 },
    ],
    date: "2026-04-17",
    status: "Delivered",
    total: 365.00,
    paymentMethod: "Apple Pay",
  },
  {
    id: "ORD-8495",
    customer: "Sarah Williams",
    email: "sarah.w@email.com",
    products: [
      { name: "Velocity Running Sneakers", quantity: 1, price: 185.00 },
    ],
    date: "2026-04-17",
    status: "Processing",
    total: 185.00,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-8496",
    customer: "David Chen",
    email: "d.chen@email.com",
    products: [
      { name: "Heritage Mechanical Keyboard", quantity: 1, price: 210.00 },
      { name: "Apex Nano Wireless Mouse", quantity: 1, price: 129.00 },
    ],
    date: "2026-04-16",
    status: "Delivered",
    total: 339.00,
    paymentMethod: "Visa •••• 1234",
  },
  {
    id: "ORD-8497",
    customer: "Emma Rodriguez",
    email: "emma.r@email.com",
    products: [
      { name: "UltraBook Pro 14", quantity: 1, price: 1299.00 },
    ],
    date: "2026-04-16",
    status: "Shipped",
    total: 1299.00,
    paymentMethod: "Mastercard •••• 5555",
  },
  {
    id: "ORD-8498",
    customer: "Alex Turner",
    email: "alex.t@email.com",
    products: [
      { name: "Quantum RTX 5090 GPU", quantity: 1, price: 1599.00 },
      { name: "CoreX i9-X Processor", quantity: 1, price: 599.00 },
    ],
    date: "2026-04-15",
    status: "Delivered",
    total: 2198.00,
    paymentMethod: "Visa •••• 7890",
  },
  {
    id: "ORD-8499",
    customer: "Olivia Park",
    email: "olivia.p@email.com",
    products: [
      { name: "Crescent Crossbody Bag", quantity: 1, price: 195.00 },
    ],
    date: "2026-04-15",
    status: "Cancelled",
    total: 195.00,
    paymentMethod: "Apple Pay",
  },
  {
    id: "ORD-8500",
    customer: "Liam Foster",
    email: "liam.f@email.com",
    products: [
      { name: "Nebula OLED Smartphone", quantity: 1, price: 999.00 },
      { name: "Eclipse Noise-Isolating Earbuds", quantity: 1, price: 159.00 },
    ],
    date: "2026-04-14",
    status: "Delivered",
    total: 1158.00,
    paymentMethod: "Google Pay",
  },
  {
    id: "ORD-8501",
    customer: "Sophia Martinez",
    email: "sophia.m@email.com",
    products: [
      { name: "Aura Smart Lamp", quantity: 3, price: 110.00 },
    ],
    date: "2026-04-14",
    status: "Shipped",
    total: 330.00,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-8502",
    customer: "Noah Kim",
    email: "noah.k@email.com",
    products: [
      { name: "Zenith Curved Monitor 34\"", quantity: 1, price: 849.00 },
    ],
    date: "2026-04-13",
    status: "Delivered",
    total: 849.00,
    paymentMethod: "Visa •••• 3456",
  },
  {
    id: "ORD-8503",
    customer: "Isabella Nguyen",
    email: "isabella.n@email.com",
    products: [
      { name: "Phantom X Drone", quantity: 1, price: 1199.00 },
    ],
    date: "2026-04-12",
    status: "Refunded",
    total: 1199.00,
    paymentMethod: "Mastercard •••• 9999",
  },
  {
    id: "ORD-8504",
    customer: "Ethan Brooks",
    email: "ethan.b@email.com",
    products: [
      { name: "Studio Mic Pro", quantity: 1, price: 299.00 },
      { name: "Mechanical Macro Pad", quantity: 1, price: 89.00 },
    ],
    date: "2026-04-11",
    status: "Delivered",
    total: 388.00,
    paymentMethod: "Apple Pay",
  },
  {
    id: "ORD-8505",
    customer: "Mia Patel",
    email: "mia.p@email.com",
    products: [
      { name: "Vision VR Headset", quantity: 1, price: 999.00 },
    ],
    date: "2026-04-10",
    status: "Processing",
    total: 999.00,
    paymentMethod: "Visa •••• 6789",
  },
  {
    id: "ORD-8506",
    customer: "James Wilson",
    email: "james.w@email.com",
    products: [
      { name: "Titan Workstation Desktop", quantity: 1, price: 2499.00 },
      { name: "Heritage Mechanical Keyboard", quantity: 1, price: 210.00 },
      { name: "Apex Nano Wireless Mouse", quantity: 1, price: 129.00 },
    ],
    date: "2026-04-09",
    status: "Shipped",
    total: 2838.00,
    paymentMethod: "Mastercard •••• 1111",
  },
]
