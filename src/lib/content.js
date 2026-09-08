export const profile = {
  name: "Hluf Abebe",
  role: "Backend Developer",
  roles: ["Backend developer", "Distributed systems", "Fintech engineering"],
  location: "Addis Ababa, Ethiopia",
  email: "hlufabebe2015@gmail.com",
  phone: "+251 937 941 318",
  phoneHref: "+251937941318",
  cv: "/Doc/HilufAbebecv2.pdf",
  available: true,
  summary:
    "Backend developer with 4+ years building and scaling systems for fintech. I work mostly in Node.js, NestJS and TypeScript — with Go and Spring Boot in the mix — designing microservices, distributed systems and real-time services over gRPC and WebSockets. I care a lot about database performance: I once took a banking search platform from 6 seconds to under 50ms.",
  about: [
    "I build the parts of a product that have to stay up: payment flows, fund-transfer middleware, search that has to be fast, admin tooling that non-technical teams depend on. Most of my work is in fintech, where correctness and latency both matter.",
    "Right now I lead backend work on the Dashen Super App at EagleLion. Before that I built services for Safaricom Ethiopia's One Platform and a range of platforms at Ablaze Labs. I'm comfortable owning a service end to end — schema, API, tests, containerisation, and the CI/CD pipeline that ships it.",
  ],
};

export const socials = [
  { label: "GitHub", href: "https://github.com/HlufD", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hluf-abebe-6a6b8b132/",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:hlufabebe2015@gmail.com", icon: "mail" },
];

export const facts = [
  { label: "Experience", value: "4+ years" },
  { label: "Focus", value: "Fintech · Payments" },
  { label: "Stack", value: "Node · NestJS · Go" },
  { label: "Location", value: "Addis Ababa, ET" },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Go", "Java"],
  },
  {
    title: "Backend",
    items: ["Node.js", "NestJS", "Express", "Spring Boot"],
  },
  {
    title: "Data & messaging",
    items: ["PostgreSQL", "MongoDB", "Redis", "Kafka"],
  },
  {
    title: "APIs & realtime",
    items: ["REST", "gRPC", "WebSockets", "Microservices"],
  },
  {
    title: "Infra & CI/CD",
    items: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
  },
  {
    title: "Testing & observability",
    items: ["Jest", "Mocha", "Winston"],
  },
];

export const experience = [
  {
    role: "Backend Developer",
    org: "EagleLion System Technology",
    place: "Dashen Super App",
    period: "Jun 2025 — Present",
    points: [
      "Lead and mentor a team of developers on the Dashen Super App, guiding technical decisions and running code reviews to keep quality consistent across services.",
      "Designed and built a shared middleware service used by every fund-transfer flow — fee calculation, balance checks and limit checks — in one optimised, reusable place.",
      "Implemented merchant payment functionality for secure transaction processing between users and merchants.",
      "Built an admin dashboard that lets non-technical teams manage app-wide configuration.",
      "Cut customer and transaction search from ~6 seconds to under 50ms by redesigning MongoDB and PostgreSQL indexing and moving to key-based search.",
    ],
  },
  {
    role: "Backend Developer",
    org: "Safaricom Ethiopia",
    place: "One Platform · Digital Channels",
    period: "Feb 2025 — Jun 2025",
    points: [
      "Built backend services for “One Platform” with Spring Boot and PostgreSQL as part of a 20-person Digital Channels team.",
      "Built hierarchical merchant distribution and registration across multi-level regional hierarchies (Region → District), enabling organised onboarding at scale.",
      "Developed backend services for an event-organisation platform supporting event creation and management workflows.",
    ],
  },
  {
    role: "Backend Developer",
    org: "Ablaze Labs and Engineering",
    place: "Addis Ababa, Ethiopia",
    period: "Jun 2024 — Feb 2025",
    points: [
      "Built the core backend for a medical study and exam platform — quiz creation and taking, study-material uploads, and material ratings.",
      "Implemented student progress tracking, subscription management and authentication so universities could manage course materials for their students.",
      "Developed loyalty and referral functionality for a virtual gaming platform: referral tracking, reward calculation and a points/bonus system.",
      "Added structured application logging with Winston, improving observability and debugging across services.",
    ],
  },
];

export const education = [
  {
    title: "BSc, Electrical & Computer Engineering",
    org: "University of Gondar, Ethiopia",
    period: "2017 — 2022",
    points: [],
  },
];

export const projects = [
  {
    title: "Abbay Law",
    href: "https://www.abbaylaw.com/",
    description:
      "Marketing and services site for a private legal practice, with a content-managed blog and contact workflow.",
    tech: ["React", "Express", "MySQL", "CSS"],
    image: "/img/abbaylaw.png",
  },
  {
    title: "St. Michael Institute",
    href: "https://saintmichael.edu.et/",
    description:
      "Public website for St. Michael Business & IT Institute presenting programs, admissions and institutional information.",
    tech: ["React", "Ant Design", "CSS"],
    image: "/img/stMichel.jpg",
  },
];

export const emailjs = {
  serviceId: "service_g3wwi3t",
  templateId: "template_1cob6yi",
  publicKey: "6847iHCddkSjz_Y1v",
};

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];
