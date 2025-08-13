export type Education = {
  slug: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: string;
  period: string;
  current?: boolean;
  logo?: string;
  description?: string;
  gpa?: string;
};

export const education: Education[] = [
  {
    slug: "mmcoe-be-ai-ds",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Artificial Intelligence & Data Science",
    institution: "MMCOE",
    location: "Pune",
    year: "2027",
    period: "2023 - 2027",
    current: true,
    logo: "/institutions/college.jpeg",
    description: "Currently pursuing 3rd year B.E. in AI & Data Science with focus on machine learning, computer vision, and cybersecurity applications.",
  },
];