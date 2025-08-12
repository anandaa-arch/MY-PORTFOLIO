import type { Project } from "@/components/projects/project-card";

export const projects: Project[] = [

  {
    slug: "transpiler-ai-code-converter",
    title: "Transpiler – AI-Powered Online Code Converter and Debugger (SIH Project)",
    description:
      "Dockerized online tool to convert code between languages (e.g., Python ↔ C++), integrating OpenAI API for AI-assisted debugging and backend execution in secure, sandboxed environments.",
    features: [
      "Language transpilation: Python ↔ C++ and more",
      "OpenAI-powered code debugging and suggestions",
      "Dockerized backend for secure, sandboxed code execution",
      "User-friendly web interface for code input/output"
    ],
    tags: ["Docker", "OpenAI", "Python", "C++", "SIH"],
  },
  {
    slug: "varnanetra",
    title: "Varnanetra",
    description: "AI‑powered assistive vision project that helps users identify and describe surroundings using speech and computer vision.",
    features: [
      "Speech‑to‑text with Whisper",
      "Real‑time object detection and descriptions",
      "Accessible UI and multi‑language support",
    ],
    tags: ["Python", "Whisper", "FastAPI", "React", "Tailwind"],
    //image: "/projects/varnanetra.png",
    repo: "",
    demo: "",
  },
  {
    slug: "accenture-elderly-care-system",
    title: "Accenture Hackathon Elderly Care System",
    description:
      "Elderly Care Companion: Flask-based web app with AI-driven health monitoring, reminders, and a multilingual chatbot to enhance elderly care, submitted to the Accenture Hackathon.",
    features: [
      "AI-driven health monitoring and reminders",
      "Multilingual chatbot for elderly assistance",
      "Flask backend with modern web UI",
      "Hackathon-ready deployment"
    ],
    tags: ["Flask", "AI", "Chatbot", "HealthTech", "Hackathon"],
    image: "/projects/Elderly.png",
  },
  {
    slug: "object-detection-tool",
    title: "Object Detection Tool",
    description: "B.E. 2nd semester project building a tool for object detection and visual feedback.",
    features: [
      "Model integration and inference pipeline",
      "Simple UI to upload/test images",
      "Summaries of detected objects",
    ],
    tags: ["Python", "Computer Vision"],
  },
  
];
