/* ─────────────────────────────────────────────────────────────
    ✏️  EDIT THIS FILE — all portfolio content lives here.
    Items marked "placeholder" should be replaced with real info.
    ───────────────────────────────────────────────────────────── */

export const profile = {
  name: "Nayan Mondal",
  roles: [
    "MERN Stack Developer",
    "SaaS Product Builder",
    "Real-time App Engineer",
    "Interface Tinkerer",
  ],
  tagline:
    "I build subscription platforms, real-time apps and storefronts that stay fast when real people start using them.",
  about:
    "I'm Nayan, a MERN stack developer who likes turning big product ideas into software people actually enjoy using. I've built a multi-tenant real-estate SaaS where every subscriber gets a website on their own subdomain, a full e-commerce store, a real-time chat app and an online book reader. I care about clean architecture, quick load times and interfaces that feel alive.",
  email: "nayan210091@diit.edu.bd", // placeholder
  location: "Dhaka, Bangladesh", // placeholder
  socials: {
    github: "https://github.com/mondalnayan007", // placeholder
    linkedin: "https://www.linkedin.com/in/mondalnayan007", // placeholder
    facebook: "https://www.facebook.com/na.y.an.68370", // placeholder
  },
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: 2, suffix: "", label: "Full-stack products shipped" },
  { value: 20, suffix: "+", label: "Technologies in daily use" },
  { value: 1, suffix: "", label: "Multi-tenant SaaS architecture" },
]; // placeholder numbers

export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  gallery?: string[]; // Added gallery support
  description: string;
  details: string;
  features: string[];
  tech: string[];
  highlights: string[];
  icon: "building" | "cart" | "chat" | "book";
  from: string;
  to: string;
  live: string;
  github: string;
};

export const projects: Project[] = [
  {
    id: "realestate",
    title: "Multi-Agent Real Estate SaaS",
    category: "SaaS · Multi-tenant",
    image: "/project_images/realestate.png",
    gallery: [
      "/project_images/realestate.png",
      "/project_images/realestate.png", // Replace with extra gallery screenshots if available
      "/project_images/realestate.png",
    ],
    description:
      "Agents subscribe to a plan and instantly get their own branded property website on a personal subdomain.",
    details:
      "A subscription platform for real-estate agents. After purchasing a plan, each agent is provisioned a dedicated website at their own subdomain, with listings, enquiries and branding managed from a single dashboard.",
    features: [
      "Subscription plans with checkout and billing status",
      "Automatic subdomain website for every subscriber",
      "Tenant-aware data so each agent only sees their own content",
      "Dashboard to manage listings, leads and profile",
      "Role-based access for admin, agent and visitor",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "Payments API"],
    highlights: ["Subdomain per agent", "Subscriptions", "Multi-tenant"],
    icon: "building",
    from: "#4f46e5",
    to: "#06b6d4",
    live: "https://bdproperties.site",
    github: "https://github.com/mondalnayan007/real-estate-client",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    category: "Full-stack · Retail",
    image: "/project_images/ecommerce.png",
    gallery: [
      "/project_images/ecommerce.png",
      "/project_images/ecommerce.png",
      "/project_images/ecommerce.png",
    ],
    description:
      "A complete online shop with product discovery, cart, checkout and an admin panel for managing the catalogue.",
    details:
      "A production-style shopping experience covering the whole buyer journey, from browsing and filtering products to placing an order, with an admin side for inventory and order management.",
    features: [
      "Search, filters and sorting across the catalogue",
      "Cart and wishlist that persist between visits",
      "Secure authentication and order history",
      "Admin panel for products, stock and orders",
      "Responsive design tuned for mobile shoppers",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Redux", "Tailwind"],
    highlights: ["Cart & checkout", "Admin panel", "Order tracking"],
    icon: "cart",
    from: "#db2777",
    to: "#f59e0b",
    live: "https://skin-bae-mart.vercel.app",
    github: "https://github.com/mondalnayan007/skinBae-mart",
  },
  {
    id: "chat",
    title: "Real-time Chat App",
    category: "WebSockets · Realtime",
    image: "/project_images/chatting.png",
    gallery: [
      "/project_images/chatting.png",
      "/project_images/chatting.png",
      "/project_images/chatting.png",
    ],
    description:
      "Instant messaging with live presence, typing indicators and message history that never loses a conversation.",
    details:
      "A chat application built around WebSockets, where messages arrive the moment they are sent. Conversations are stored so history is there when users come back.",
    features: [
      "Instant message delivery over WebSockets",
      "Online presence and typing indicators",
      "Persistent conversation history",
      "Clean, responsive chat interface",
      "Authenticated users with private conversations",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    highlights: ["Live messaging", "Typing status", "Online presence"],
    icon: "chat",
    from: "#059669",
    to: "#22d3ee",
    live: "https://live-chatting-web-app-client.vercel.app/",
    github: "https://github.com/mondalnayan007/live-chatting-web-app-client",
  },
  {
    id: "books",
    title: "Online Book Reader",
    category: "Content · Reading",
    image: "/project_images/book.png",
    gallery: [
      "/project_images/book.png",
      "/project_images/book.png",
      "/project_images/book.png",
    ],
    description:
      "A distraction-free reading experience where users browse a library and read books right in the browser.",
    details:
      "A digital library with a comfortable in-browser reader. Readers can find a book, pick up where they stopped and adjust the page to how they like to read.",
    features: [
      "Browsable library with categories and search",
      "In-browser reader with chapter navigation",
      "Remembers your reading progress",
      "Reading themes and adjustable text size",
      "Fast loading on slow connections",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Framer Motion"],
    highlights: ["Read in browser", "Saved progress", "Reading themes"],
    icon: "book",
    from: "#7c3aed",
    to: "#f472b6",
    live: "https://boi-poka-peach.vercel.app/",
    github: "https://github.com/mondalnayan007/boi-poka",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: "layout" as const,
    items: ["React", "Next.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"],
  },
  {
    title: "Backend",
    icon: "server" as const,
    items: ["Node.js", "Express", "REST APIs", "Socket.io", "JWT Auth", "Payments", "Multi-tenancy"],
  },
  {
    title: "Database",
    icon: "database" as const,
    items: ["MongoDB", "Mongoose", "Aggregation", "Indexing", "Schema design"],
  },
  {
    title: "Tooling",
    icon: "wrench" as const,
    items: ["Git & GitHub", "Postman", "Vercel", "Figma", "VS Code", "npm"],
  },
];

export const marqueeSkills = [
  "MongoDB", "Express", "React", "Node.js", "Next.js", "TypeScript", "Socket.io",
  "Tailwind CSS", "Redux", "GSAP", "Three.js", "Framer Motion", "REST", "JWT",
];

export const experience = [
  {
    period: "2025 — Now",
    title: "Full-Stack Developer",
    org: "Independent products",
    description:
      "Designing and building SaaS products end to end, including a multi-tenant real-estate platform with subscriptions and per-agent subdomains.",
    tags: ["SaaS", "Multi-tenancy", "Subscriptions"],
  },
  {
    period: "2024",
    title: "Real-time & Commerce Apps",
    org: "Personal projects",
    description:
      "Shipped a real-time chat app on WebSockets and a full e-commerce store with cart, checkout and an admin panel.",
    tags: ["Socket.io", "E-commerce", "Redux"],
  },
  {
    period: "2023",
    title: "Content Platforms",
    org: "Personal projects",
    description:
      "Built an online book reader with progress tracking and reading themes while deepening React and Node fundamentals.",
    tags: ["React", "Node.js", "UX"],
  },
  {
    period: "Earlier",
    title: "Learning the MERN stack",
    org: "Self-taught / education",
    description:
      "Started with JavaScript fundamentals, then moved through MongoDB, Express, React and Node by building something at every step.",
    tags: ["JavaScript", "MongoDB", "Express"],
  },
];