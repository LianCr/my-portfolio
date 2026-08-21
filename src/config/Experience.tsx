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
    company: "Wayfair",
    position: "Full Stack Developer",
    location: "Irvine, CA",
    image: "/company/wayfair.png",
    description: [
      "Own the *cart and checkout domain end to end*, defining the service contracts and business rules for cart lifecycle, guest-to-account cart merge, promotion eligibility, price reconciliation, inventory validation, and checkout readiness.",
      "Architected a *Node.js/TypeScript Backend-for-Frontend (BFF)* on Apollo GraphQL that consolidates catalog, pricing, promotion, inventory, and customer data behind typed queries and mutations, so the React client calls one contract instead of multiple downstream APIs.",
      "Built *server-authoritative cart services* with idempotent mutations, optimistic-concurrency version checks, deterministic merge rules, and transactional validation, so stale responses or concurrent sessions cannot overwrite a customer's latest changes.",
      "Moved promotion, pricing, and inventory validation into backend business rules with *structured GraphQL error codes*, letting the React client update optimistically while the server remains the single source of truth for what the customer is charged.",
      "Developed the *React 18 cart and checkout experience* with Redux Toolkit, optimistic UI updates, reusable components, and client-side validation, improving checkout responsiveness and supporting a *15% increase in checkout conversion*.",
      "Containerized services with *Docker* and deployed them on *AWS*, using Amazon RDS for relational commerce data and CloudWatch for structured logging, operational diagnostics, and production monitoring.",
    ],
    projects: [],
    startDate: "June 2024",
    endDate: "Present",
    technologies: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "Apollo GraphQL",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Jest",
    ],
    website: "https://www.wayfair.com/",
  },
  {
    isCurrent: false,
    isBlur: false,
    company: "SoFi",
    position: "Full Stack Developer",
    location: "San Francisco, CA (Remote)",
    image: "/company/sofi.png",
    description: [
      "Designed a *Node.js/Express service layer with Apollo GraphQL aggregation* for portfolio summaries, transaction history, and analytics data, replacing multiple client-side REST calls with consolidated queries and mutations.",
      "Cut portfolio-summary retrieval latency by *40%* by adding a *Redis caching layer* for frequently accessed views, reducing repeated reads against the primary MongoDB cluster.",
      "Implemented *real-time transaction-status updates over WebSockets*, consumed through React Hooks, reducing transaction-status support tickets by *20%*.",
      "Developed interactive *D3.js + React investment visualizations* for asset allocation and portfolio trends, contributing to a *25% increase in user engagement*.",
      "Built reusable *React 18 views with Redux Toolkit and Material UI* for account summaries and transaction filtering, keeping client state consistent with the consolidated GraphQL contract.",
      "Maintained *Jest unit and integration coverage* across the GraphQL service layer and React components, catching schema and resolver regressions in review before they reached production.",
    ],
    projects: [],
    startDate: "August 2023",
    endDate: "June 2024",
    technologies: [
      "React",
      "TypeScript",
      "D3.js",
      "Redux Toolkit",
      "Apollo GraphQL",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "WebSockets",
      "Material UI",
      "Jest",
    ],
    website: "https://www.sofi.com/",
  },
  {
    isCurrent: false,
    isBlur: false,
    company: "Meijer",
    position: "Software Developer",
    location: "Grand Rapids, MI",
    image: "/company/meijer.png",
    description: [
      "Built dynamic, multi-step *workforce-scheduling workflows* (employee availability, department scheduling rules) with Angular Reactive Forms and FormArray, reducing form submission errors by *25%*.",
      "Implemented *role-based access control (RBAC)* with JWT authentication and Angular Router Guards to protect sensitive scheduling and payroll-related workflows.",
      "Built *Node.js REST API integrations* that sync shift changes from the Angular client to backend workforce data, keeping schedule state consistent across concurrent user sessions.",
      "Developed reusable *PrimeNG and SASS components* for schedule views, shift tables, and availability editors, keeping the scheduling interface consistent across departments.",
      "Managed form and schedule state reactively with *RxJS*, debouncing input-driven lookups and keeping in-progress edits stable across navigation.",
      "Wrote *Jest unit tests* around validation rules and scheduling components, working through pull-request reviews and JIRA-tracked Agile sprints.",
    ],
    projects: [],
    startDate: "April 2022",
    endDate: "June 2023",
    technologies: [
      "Angular",
      "TypeScript",
      "PrimeNG",
      "RxJS",
      "Node.js",
      "JWT",
      "MongoDB",
      "SASS",
      "Jest",
    ],
    website: "https://www.meijer.com/",
  },
  {
    isCurrent: false,
    isBlur: false,
    company: "Alibaba Group",
    position: "UI Developer",
    location: "Beijing, China",
    image: "/company/alibaba.png",
    description: [
      "Led front-end development of a *vendor administration portal* in React and TypeScript, delivering modular workflows for product listing, inventory management, and internal operations tooling.",
      "Streamlined the *Webpack/NPM build pipeline* with code splitting that reduced initial bundle size by *15%*, improving load performance on low-bandwidth mobile connections.",
      "Structured portal state with *Redux*, keeping product-listing, inventory, and operations modules consistent as workflows grew across teams.",
      "Integrated *REST APIs* for product, inventory, and operations data with consistent loading, error, and empty states across the portal.",
      "Built *responsive, cross-browser layouts* with Bootstrap 5 and SASS for vendor and internal operations teams working across devices.",
      "Collaborated with backend engineers and designers on *API contracts and UI specifications*, iterating through code review in a large product organization.",
    ],
    projects: [],
    startDate: "February 2020",
    endDate: "March 2022",
    technologies: [
      "React",
      "TypeScript",
      "Redux",
      "JavaScript",
      "Bootstrap",
      "SASS",
      "Webpack",
      "Node.js",
    ],
    website: "https://www.alibabagroup.com/",
  },
];
