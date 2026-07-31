export interface Project {
  name: string;
  liveUrl?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  projects?: Project[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: string[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    isBlur: false,
    company: "Ryzlink Corporation (DBA Chuwa America)",
    position: "Full Stack Engineer",
    location: "Los Angeles",
    image: "/company/ryzlink.png",
    description: [
      "Owned the end-to-end cart and checkout-readiness experience for a *MERN* e-commerce platform, delivering customer-facing workflows across *React*, *Redux Toolkit*, *Node.js*, *Express*, *MongoDB*, and JWT-secured REST APIs.",
      "Architected an event-driven cart synchronization layer using *Redux listener middleware*, revision guards, queued mutations, and bounded conflict retries, preventing stale responses from overwriting newer customer actions.",
      "Built a *server-authoritative commerce rules engine* that revalidated pricing, inventory, availability, and promotion eligibility before checkout, protecting transactional workflows from stale or manipulated client state.",
      "Designed Node.js and Express services for cart lifecycle management, guest-cart migration, and checkout preparation, using *MongoDB atomic versioning* to preserve consistency across sessions, tabs, and devices.",
      "Developed a failure-safe guest-to-customer conversion flow using localStorage, JWT authentication, and server-side cart reconciliation, preserving shopping intent across sign-in, network interruption, and session transitions.",
      "Prototyped an AI-powered checkout recovery assistant using *OpenAI* tool calling and structured outputs to interpret inventory, promotion, and synchronization failures and recommend contextual recovery actions with deterministic fallbacks.",
      "Strengthened release reliability through frontend and backend automated testing, production-build validation, pull-request reviews, and Agile collaboration across engineering, QA, and product.",
    ],
    projects: [],
    startDate: "December 2025",
    endDate: "Present",
    technologies: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MongoDB",
      "Material UI",
      "JWT",
      "OpenAI",
    ],
    website: "https://ryzlink.com/about",
  },
  {
    isCurrent: false,
    isBlur: false,
    company: "ZentraPay",
    position: "Full-Stack Developer",
    location: "Remote",
    image: "/company/zentrapay.png",
    description: [
      "Contributed to a digital banking platform letting consumer and small-business users review balances, explore transaction history, monitor multi-currency financial trends, and securely manage accounts.",
      "Developed reusable *Angular* standalone components with TypeScript, *Signals*, *RxJS*, Reactive Forms, and Angular Material for account summaries, transaction filtering, cursor-based pagination, and role-based workflows.",
      "Built accessible *D3.js* visualizations for multi-currency balances and portfolio trends, including responsive SVG rendering, keyboard-accessible tooltips, ARIA labels, and foreign-exchange normalization.",
      "Developed Node.js and TypeScript *BFF* services with *Apollo GraphQL* to aggregate account, transaction, user, and exchange-rate data from downstream APIs.",
      "Implemented secure authentication using *WebAuthn*, JWT access tokens, *Redis*-backed refresh-token rotation, session revocation, and role-based authorization.",
      "Improved transaction-query performance through *PostgreSQL* indexing, debounced filtering, timestamp-based cursor pagination, and Redis caching for frequently accessed reference data.",
      "Contributed to modernization modules using *React*, *Next.js*, and *RTK Query*, centralizing application state and reducing duplicated frontend data requests.",
      "Supported *AWS* deployments across S3, CloudFront, API Gateway, and Lambda, with environment-specific workflows through *GitHub Actions*, plus unit, integration, and end-to-end coverage using Jasmine, Jest, and Cypress.",
    ],
    projects: [],
    startDate: "January 2025",
    endDate: "December 2025",
    technologies: [
      "Angular",
      "TypeScript",
      "RxJS",
      "D3.js",
      "Apollo GraphQL",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "WebAuthn",
      "AWS",
      "GitHub Actions",
      "Cypress",
    ],
    website: "https://zentrapay.mystrikingly.com/",
  },
];
