export const projects = [
  {
    id: "billing-web-app",
    title: "Billing Web Application",
    category: "Admin Systems",
    description: "A comprehensive billing and invoice management system designed for enterprise efficiency.",
    longDescription: "This robust billing web application simplifies the complex process of invoice generation, subscription management, and payment tracking. Built with modern web technologies, it offers a secure, scalable architecture capable of handling high-volume transaction data while providing a sleek, intuitive user interface for finance teams.",
    problem: "Finance teams struggle with fragmented legacy billing tools that lack automation, leading to manual data entry errors and delayed payment collections.",
    solution: "A unified, automated billing platform that centralizes all financial operations, integrates directly with payment gateways, and provides real-time analytics on revenue flow.",
    features: [
      "Automated Invoice Generation",
      "Subscription & Recurring Billing",
      "Real-time Revenue Analytics",
      "Multi-currency Support",
      "Role-based Access Control",
      "Payment Gateway Integration"
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Stripe API"],
    grad: "from-blue-500 to-indigo-600"
  },
  {
    id: "ecommerce-demo",
    title: "E-Commerce Demo",
    category: "Web Apps",
    description: "A high-performance, headless e-commerce storefront with complex state management.",
    longDescription: "Digital Curator is a premium e-commerce experience designed to showcase high-end products. It features a fully responsive design, advanced filtering, a seamless cart drawer, and a smooth checkout flow. The application prioritizes speed and accessibility, leveraging static site generation and client-side state persistence to deliver a native-app-like shopping experience.",
    problem: "Traditional e-commerce platforms often suffer from slow page loads and clunky checkout experiences, resulting in high cart abandonment rates.",
    solution: "A headless commerce architecture utilizing a modern tech stack to deliver sub-second page transitions, optimistic UI updates, and a frictionless, single-page checkout process.",
    features: [
      "Headless Storefront Architecture",
      "Persistent Cart State Management",
      "Dynamic Product Filtering",
      "Optimized Image Delivery",
      "Seamless Checkout Flow",
      "Admin Inventory Dashboard"
    ],
    techStack: ["Next.js", "React 19", "Zustand", "Tailwind CSS", "Framer Motion", "Vercel"],
    grad: "from-emerald-500 to-teal-600"
  },
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "SaaS",
    description: "An interactive, drag-and-drop SaaS operations dashboard with integrated AI assistance.",
    longDescription: "A powerful command center for SaaS operations. This dashboard features a highly interactive Kanban board with full freedom reordering, real-time data visualization, and an integrated contextual AI assistant. It is designed to act as the central hub for team collaboration, task management, and high-level metric tracking.",
    problem: "Teams rely on multiple disconnected tools for project management, analytics, and team communication, causing workflow friction.",
    solution: "A consolidated dashboard that merges drag-and-drop task management with real-time data visualization and AI-powered insights into a single, cohesive interface.",
    features: [
      "Interactive Kanban Board",
      "Drag-and-Drop Task Management",
      "Real-time Data Visualization",
      "Contextual AI Assistant",
      "Subscription Tier Management",
      "Dark Mode Support"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts", "AI SDK"],
    grad: "from-purple-500 to-pink-600"
  }
];
