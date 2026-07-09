import { Project, Skill, Experience, AchievementStat } from './types';

export const personalInfo = {
  name: "Jaydeep Bodar",
  title: "Full Stack Developer (MERN)",
  focus: "React.js / Node.js / Next.js / TypeScript",
  location: "Surat, Gujarat",
  email: "jaydeepbodar732@gmail.com",
  phone: "+91 72838 93044",
  availability: "Immediately Available",
  summary: "Results-driven Full Stack Developer (MERN) with 3+ years of experience building scalable, high-performance web applications using MongoDB, Express.js, React.js, and Node.js — complemented by Next.js, TypeScript, and cloud integrations including AWS S3. Delivered production-grade SaaS platforms, AI-powered analytics dashboards, real-time crypto exchange systems, and logistics management solutions. Proven track record of owning end-to-end development, shipping clean maintainable code, and driving measurable improvements in Agile environments. Immediately available to join and contribute from Day 1.",
  github: "https://github.com/jaydeepbodar", // standard placeholder with clean username
  linkedin: "https://www.linkedin.com/in/jaydeep-bodar-b353a7176?utm_source=share_via&utm_content=profile&utm_medium=member_android", // live professional profile link
};

export const skills: Skill[] = [
  // Frontend
  { name: "React.js", category: "Frontend", level: "Expert" },
  { name: "Next.js", category: "Frontend", level: "Expert" },
  { name: "Remix.js", category: "Frontend", level: "Advanced" },
  { name: "TypeScript", category: "Frontend", level: "Expert" },
  { name: "JavaScript (ES6+)", category: "Frontend", level: "Expert" },
  { name: "Redux", category: "Frontend", level: "Expert" },
  { name: "Tailwind CSS", category: "Frontend", level: "Expert" },
  { name: "HTML5", category: "Frontend", level: "Expert" },
  { name: "CSS3", category: "Frontend", level: "Expert" },
  { name: "Bootstrap", category: "Frontend", level: "Advanced" },
  { name: "Responsive Design", category: "Frontend", level: "Expert" },

  // Backend
  { name: "Node.js", category: "Backend", level: "Expert" },
  { name: "Express.js", category: "Backend", level: "Expert" },
  { name: "REST APIs", category: "Backend", level: "Expert" },
  { name: "Prisma ORM", category: "Backend", level: "Expert" },
  { name: "MVC Architecture", category: "Backend", level: "Expert" },

  // Databases
  { name: "MongoDB", category: "Databases", level: "Expert" },
  { name: "PostgreSQL", category: "Databases", level: "Advanced" },
  { name: "MySQL", category: "Databases", level: "Advanced" },
  { name: "Aggregation Pipelines", category: "Databases", level: "Expert" },
  { name: "Query Optimization", category: "Databases", level: "Expert" },

  // Auth & Payments
  { name: "NextAuth", category: "Auth & Payments", level: "Expert" },
  { name: "JWT", category: "Auth & Payments", level: "Expert" },
  { name: "Session Management", category: "Auth & Payments", level: "Expert" },
  { name: "Stripe", category: "Auth & Payments", level: "Expert" },
  { name: "Stripe Webhooks", category: "Auth & Payments", level: "Expert" },

  // Real-Time & Charts
  { name: "Socket.IO", category: "Real-Time & Charts", level: "Expert" },
  { name: "Recharts", category: "Real-Time & Charts", level: "Expert" },
  { name: "ApexCharts", category: "Real-Time & Charts", level: "Expert" },
  { name: "Swiper.js", category: "Real-Time & Charts", level: "Expert" },

  // Tools
  { name: "Git", category: "Tools", level: "Expert" },
  { name: "GitHub", category: "Tools", level: "Expert" },
  { name: "Vercel", category: "Tools", level: "Expert" },
  { name: "Postman", category: "Tools", level: "Expert" },
  { name: "Nodemailer", category: "Tools", level: "Expert" },
  { name: "VS Code", category: "Tools", level: "Expert" },
  { name: "WordPress Gutenberg", category: "Tools", level: "Advanced" },

  // Cloud (AWS)
  { name: "AWS S3", category: "Cloud (AWS)", level: "Advanced" },

  // Methodologies
  { name: "Agile", category: "Methodologies", level: "Expert" },
  { name: "SDLC", category: "Methodologies", level: "Expert" },
  { name: "Component-Based Architecture", category: "Methodologies", level: "Expert" },
  { name: "Code Reviews", category: "Methodologies", level: "Expert" },
  { name: "RESTful Design", category: "Methodologies", level: "Expert" }
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Databases",
  "Auth & Payments",
  "Real-Time & Charts",
  "Tools",
  "Cloud (AWS)",
  "Methodologies"
];

export const projects: Project[] = [
  {
    id: "value-collaborator",
    title: "Value Collaborator Platform",
    company: "Sigma Solve",
    tags: ["Next.js", "Tailwind CSS", "Context API", "Google OAuth", "JWT", "ShadCN UI"],
    impact: "Developed a multi-tenant SaaS platform for enterprise collaboration, value stream management, and business analysis.",
    features: [
      "Developed a multi-tenant SaaS platform for enterprise collaboration, value stream management, business analysis, and transformation planning.",
      "Built secure authentication using Google OAuth, JWT-based Authentication, and Role-Based Access Control (RBAC) for multiple user roles.",
      "Developed live recording session interfaces with real-time transcription, session management, and AI-assisted collaboration workflows.",
      "Built responsive and reusable UI components using React.js, Next.js, TypeScript, Tailwind CSS, and ShadCN UI following a scalable component-based architecture.",
      "Developed dynamic dashboards with search, filtering, sorting, pagination, and role-based data visualization for enterprise users."
    ],
    iconName: "users",
    category: "SaaS & Collaboration"
  },
  {
    id: "blendx",
    title: "BlendX (Gym Subscription SaaS)",
    company: "Sigma Solve",
    tags: ["Remix.js", "AWS S3", "ABC API", "Prisma", "PostgreSQL", "Context API"],
    impact: "Built end-to-end subscription lifecycle workflows using Remix.js with server-side rendering, improving page load performance and automating transaction reconciliation.",
    features: [
      "Built end-to-end subscription lifecycle workflows (creation, renewal, cancellation, and upgrade) using Remix.js with server-side rendering, improving page load performance.",
      "Engineered an admin dashboard and customer portal featuring real-time amenities and pricing configuration that propagate instantly across the platform.",
      "Integrated AWS S3 for secure file storage and management, handling document uploads, retrieval, and access control for subscription-related assets.",
      "Integrated ABC API to automate subscription billing and transaction reconciliation, eliminating manual processing overhead.",
      "Utilized React Context API for lightweight, decoupled subscription state tracking and global tenant settings.",
      "Optimized database queries using Prisma ORM, improving application-wide query efficiency and response times."
    ],
    iconName: "dumbbell",
    category: "SaaS & Payments"
  },
  {
    id: "tms",
    title: "TMS (Transportation Management)",
    company: "Sigma Solve",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Context API", "Component Library", "Responsive Design"],
    impact: "Streamlined modern driver logistics, automated verification workflows, and built live carrier rating modules.",
    features: [
      "Built a scalable logistics platform using Next.js and Tailwind CSS, supporting carrier onboarding, driver assignment, and a multi-level parent/sub-order hierarchy.",
      "Leveraged React Context API for localized dashboard state management, minimizing complex prop drilling during carrier selection.",
      "Developed a finance dashboard visualizing revenue margins, vendor pricing, and order-level financial breakdowns in real time.",
      "Owned the document verification workflow and carrier rating module, enforcing compliance standards and driving measurable improvements in carrier service quality.",
      "Architected a reusable UI component library, establishing the foundation for scalable feature expansion across the logistics platform."
    ],
    iconName: "truck",
    category: "Logistics"
  },
  {
    id: "alpha-city",
    title: "Alpha City (Crypto Exchange Platform)",
    company: "Sigma Solve",
    tags: ["Next.js", "React Redux", "RTK Query", "Socket.IO", "ApexCharts", "TypeScript"],
    impact: "Built real-time trading frontend with live crypto feeds, order book sync, and interactive charts.",
    features: [
      "Built a responsive, real-time trading frontend using Next.js, React Redux, and RTK Query for streamlined server state caching and client-side trading portfolio updates.",
      "Integrated Socket.IO for live crypto price feeds and order book synchronization, delivering sub-second UI updates.",
      "Developed interactive trading charts and P&L dashboards using ApexCharts; optimized API call batching to minimize component re-renders.",
      "Integrated Margin, Borrower, Deposit, Withdraw, and Transfer APIs for secure and reliable transaction handling."
    ],
    iconName: "bitcoin",
    category: "Real-time & Charts"
  },
  {
    id: "minbank-ai",
    title: "MinBank AI (Financial Dashboard)",
    company: "iFlair Web Technologies",
    tags: ["React.js", "Recharts", "Tailwind CSS", "Context API"],
    impact: "Standardized UI component reporting structures with interactive multi-chart risk indicator modules.",
    features: [
      "Built interactive multi-chart dashboards (Bar, Radar, and Area charts) using Recharts with Tailwind CSS-styled reusable components, standardizing the UI component system across all reporting modules.",
      "Implemented React Context API for global state management, eliminating redundant prop-drilling across dashboard modules."
    ],
    iconName: "trending-up",
    category: "AI & Analytics"
  },
  {
    id: "sirius-ai",
    title: "Sirius AI (AI Chatbot Platform)",
    company: "iFlair Web Technologies",
    tags: ["Next.js", "React Redux", "Node.js", "Express.js", "PostgreSQL", "REST APIs"],
    impact: "Led the production AIBI chatbot frontend and optimized PostgreSQL query speed.",
    features: [
      "Led frontend development of the AIBI module using Next.js with a scalable, production-ready component architecture; architected and delivered REST APIs using Node.js and Express.js.",
      "Implemented React Redux state store to handle real-time streaming responses and historical conversational dialogue state seamlessly.",
      "Integrated PostgreSQL and optimized complex SQL queries for chatbot analytics and reporting modules."
    ],
    iconName: "bot",
    category: "AI & Analytics"
  },
  {
    id: "gotourit",
    title: "GoTourIt (e-Commerce Admin)",
    company: "iFlair Web Technologies",
    tags: ["React.js", "WordPress Gutenberg", "JavaScript", "CSS3"],
    impact: "Integrated React with custom block configurations and advanced multi-parameter client filtering.",
    features: [
      "Integrated the WordPress Gutenberg editor with a React.js admin dashboard; built advanced product filtering (by date, price, and sort order) and a drag-and-drop section manager."
    ],
    iconName: "shopping-bag",
    category: "E-Commerce"
  },
  {
    id: "ecommerce-platform",
    title: "Full-Stack e-Commerce Platform",
    company: "iFlair Web Technologies",
    tags: ["Next.js", "Tailwind CSS", "Swiper.js", "NextAuth.js", "Stripe", "MongoDB", "Express.js", "Node.js"],
    impact: "Architected a role-based commerce system with automated Stripe webhooks and MongoDB aggregations.",
    features: [
      "Architected a role-based full-stack system (Retailer / User / Admin) using NextAuth.js for secure session management and access control.",
      "Integrated Stripe with Webhooks for automated payment confirmation.",
      "Built custom revenue analytics dashboards fueled by high-performance MongoDB aggregation pipelines with custom Swiper.js image sliders."
    ],
    iconName: "credit-card",
    category: "E-Commerce"
  },
  {
    id: "link-publisher",
    title: "Link Publisher Web Application",
    company: "Elsner Technologies",
    tags: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "Responsive Layouts"],
    impact: "Built and deployed a performant, production-ready frontend from scratch with consistent cross-browser experiences.",
    features: [
      "Built and deployed the Link Publisher web application using HTML5, CSS3, and jQuery, delivering a performant, production-ready frontend from scratch.",
      "Implemented responsive layouts and resolved platform-specific rendering issues, achieving a consistent visual experience across all major browsers and devices.",
      "Collaborated with cross-functional teams and project managers to refine system specifications into interactive, high-fidelity UI modules."
    ],
    iconName: "globe",
    category: "Frontend Development"
  }
];

export const experienceTimeline: Experience[] = [
  {
    id: "sigma-solve",
    company: "Sigma Solve",
    role: "Full Stack Developer",
    period: "Dec 2024 – Present",
    desc: "Owning end-to-end full-stack development, shipping clean maintainable code, and driving measurable improvements in Agile environments.",
    achievements: [
      "Built a multi-tenant SaaS platform (Value Collaborator Platform) for enterprise collaboration, value stream mapping, and live transcription with Google OAuth, JWT, and ShadCN UI.",
      "Built end-to-end subscription workflows and customer portals for BlendX Gym SaaS using Remix.js, ABC API, Prisma, and AWS S3.",
      "Engineered next-generation TMS logistics dashboards supporting carrier onboarding, driver assignment, and parent/sub-orders.",
      "Integrated live crypto trading price feeds and order books with Socket.IO, resulting in sub-second updates for Alpha City."
    ],
    skillsUsed: ["Next.js", "Remix.js", "Prisma", "ABC API", "AWS S3", "Socket.IO", "React Redux", "RTK Query", "PostgreSQL", "Tailwind CSS", "Context API"],
    color: "teal"
  },
  {
    id: "iflair",
    company: "iFlair Web Technologies",
    role: "Web Developer",
    period: "Dec 2022 – Oct 2024",
    desc: "Engineered performant full stack solutions with an emphasis on AI-driven analytics dashboards, robust Express APIs, and scalable e-commerce systems.",
    achievements: [
      "Built interactive multi-chart dashboards (Bar, Radar, and Area charts) using Recharts with Tailwind CSS-styled reusable components for MinBank AI.",
      "Led the Sirius AI chatbot AIBI modules and PostgreSQL query optimization, dramatically improving reporting performance.",
      "Architected a role-based full-stack e-Commerce platform with secure NextAuth.js session controls and automated Stripe transaction reconciliation."
    ],
    skillsUsed: ["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Recharts", "NextAuth.js", "Stripe Webhooks", "Context API"],
    color: "violet"
  },
  {
    id: "elsner",
    company: "Elsner Technologies",
    role: "Frontend Developer",
    period: "Jan 2022 – Aug 2022",
    desc: "Focused on clean UI layout production, cross-browser compatibility, and modular front-end interfaces.",
    achievements: [
      "Built and deployed the Link Publisher web application using HTML5, CSS3, and jQuery, delivering a performant, production-ready frontend from scratch.",
      "Implemented responsive layouts and resolved platform-specific rendering issues, achieving a consistent visual experience across all major browsers and devices."
    ],
    skillsUsed: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "Responsive Layouts"],
    color: "emerald"
  }
];

export const statistics: AchievementStat[] = [
  {
    value: "3+",
    label: "Years Experience",
    desc: "MERN Stack Full Stack Engineering"
  },
  {
    value: "5+",
    label: "Production Apps Shipped",
    desc: "Fintech, Logistics, AI, E-Commerce"
  },
  {
    value: "< 1s",
    label: "Sync Price Feed",
    desc: "Sub-second updates via Socket.IO"
  },
  {
    value: "100%",
    label: "Responsive Design",
    desc: "Pixel-perfect desktop & mobile experience"
  }
];

export const education = {
  degree: "Bachelor of Engineering",
  major: "Computer Engineering",
  period: "2018 – 2022",
  institution: "A D Patel Institute of Technology",
  gpa: "CGPA: 8.09 / 10",
  location: "Anand, Gujarat, India"
};
