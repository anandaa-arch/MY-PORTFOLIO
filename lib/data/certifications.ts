export type Certification = {
  slug: string;
  title: string;
  issuer: string;
  date: string; // ISO or readable
  description?: string;
  file?: string; // path under /public
  url?: string; // external verification link
  skills?: string[];
};

export const certifications: Certification[] = [
  {
    slug: "tata-cybersecurity-simulation",
    title: "Cybersecurity Security Analyst Job Simulation",
    issuer: "Tata / Forage",
    date: "2025",
    description:
      "Completed TCS Cybersecurity virtual internship (Forage) focusing on Identity & Access Management, best practices, and producing clear technical documentation & presentations.",
    file: "/certificates/tata-cybersecurity.pdf", // Place your PDF or PNG here
    url: "", // Add verification link if available
    skills: [
      "IAM Fundamentals",
      "Access Management",
      "Cybersecurity Documentation",
      "Risk Awareness",
      "Stakeholder Communication",
    ],
  },
];
