// Parse resume PDF and update lib/data/profile.ts, skills.ts, projects.ts
// Usage: node scripts/update-from-resume.cjs <path-to-resume.pdf>

const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

const root = path.resolve(__dirname, "..");
const fileProfile = path.join(root, "lib", "data", "profile.ts");
const fileSkills = path.join(root, "lib", "data", "skills.ts");
const fileProjects = path.join(root, "lib", "data", "projects.ts");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function writeBackup(file) {
  const bak = `${file}.bak`;
  if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);
}

function toLines(text) {
  return text
    .replace(/\r\n|\r/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function extractEmail(text) {
  const m = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  return m?.[0] || null;
}

function extractPhones(text) {
  const matches = text.match(/(?:\+\d{1,3}[- ]?)?\d{10,12}|\(\d{3}\)\s?\d{3}[- ]?\d{4}/g);
  return matches || [];
}

function extractLinks(text) {
  const links = Array.from(
    new Set(
      (text.match(/https?:\/\/[\w.-]+(?:\/[\w\-._~:\/?#[\]@!$&'()*+,;=%]*)?/g) || [])
    )
  );
  const byHost = Object.fromEntries(
    links.map((u) => {
      try {
        const url = new URL(u);
        return [url.hostname.replace(/^www\./, ""), u];
      } catch {
        return [u, u];
      }
    })
  );
  return {
    github: byHost["github.com"] || null,
    linkedin: byHost["linkedin.com"] || null,
    twitter: byHost["x.com"] || byHost["twitter.com"] || null,
    website:
      Object.keys(byHost).find(
        (h) => !["github.com", "linkedin.com", "twitter.com", "x.com"].includes(h)
      ) && byHost[Object.keys(byHost).find(
        (h) => !["github.com", "linkedin.com", "twitter.com", "x.com"].includes(h)
      )]
  };
}

function extractName(lines) {
  // Assume the first non-empty line is the name if it contains spaces and letters
  const first = lines[0] || "";
  if (/^[A-Za-z][A-Za-z .'-]{2,}$/.test(first)) return first.trim();
  // Fallback: find a line with two words capitalized
  for (const l of lines.slice(0, 5)) {
    if (/^[A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+/.test(l)) return l.trim();
  }
  return null;
}

function sliceSection(lines, nameVariants) {
  const startIdx = lines.findIndex((l) =>
    nameVariants.some((s) => l.toLowerCase().startsWith(s))
  );
  if (startIdx === -1) return [];
  let end = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const l = lines[i].toLowerCase();
    if (
      ["experience", "projects", "project", "education", "skills", "technical skills", "work experience", "certifications", "achievements", "summary"].some(
        (s) => l.startsWith(s)
      )
    ) {
      end = i;
      break;
    }
  }
  return lines.slice(startIdx + 1, end);
}

function extractSkills(lines) {
  const body = sliceSection(lines, ["skills", "technical skills"]);
  if (!body.length) return [];
  const text = body.join(", ");
  return Array.from(
    new Set(
      text
        .split(/[•\u2022,|\/\n]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 1)
    )
  );
}

function extractProjects(lines) {
  const body = sliceSection(lines, ["projects", "project"]);
  const items = [];
  for (const l of body) {
    // Likely bullet lines or titles
    if (/^[•\u2022\-]/.test(l) || /[:\-]\s/.test(l) || /^[A-Za-z].{3,}/.test(l)) {
      items.push(l.replace(/^[•\u2022\-]\s?/, ""));
    }
  }
  return items.slice(0, 6);
}

function categorizeSkills(list) {
  const norm = (s) => s.toLowerCase();
  const has = (kw) => list.some((x) => norm(x).includes(kw));
  const groups = {
    languages: [],
    frontend: [],
    backend: [],
    devops: [],
    tooling: [],
  };
  const pushTo = (key, kws) => {
    for (const s of list) if (kws.some((k) => norm(s).includes(k))) groups[key].push(s);
  };
  pushTo("languages", ["typescript", "javascript", "python", "java", "c++", "c#", "sql"]); 
  pushTo("frontend", ["react", "next", "tailwind", "redux", "mui", "chakra", "vite", "framer"]);
  pushTo("backend", ["node", "express", "prisma", "postgres", "mongodb", "fastapi", "django", "nextauth", "rest", "graphql"]);
  pushTo("devops", ["docker", "kubernetes", "aws", "vercel", "gcp", "azure", "github actions", "ci", "cd"]);
  pushTo("tooling", ["eslint", "prettier", "jest", "vitest", "playwright", "cypress", "webpack", "babel"]);
  // Deduplicate and add any uncategorized to tooling
  const flat = new Set(Object.values(groups).flat());
  for (const s of list) if (!flat.has(s)) groups.tooling.push(s);
  for (const k of Object.keys(groups)) groups[k] = Array.from(new Set(groups[k]));
  return groups;
}

async function main() {
  const resumePath = process.argv[2] || path.join(root, "public", "resume.pdf");
  if (!fs.existsSync(resumePath)) {
    console.error("Resume not found:", resumePath);
    process.exit(1);
  }
  const buf = fs.readFileSync(resumePath);
  const data = await pdf(buf);
  const text = data.text || "";
  const lines = toLines(text);

  const name = extractName(lines) || "Anand Raj";
  const email = extractEmail(text);
  const phones = extractPhones(text);
  const links = extractLinks(text);
  const skillsList = extractSkills(lines);
  const projectsList = extractProjects(lines);

  // Build profile
  const profile = {
    name,
    title: "Full Stack Developer",
    email: email || "",
    phone: phones[0] || "",
    location: lines.find((l) => /(india|remote|\b[A-Z][a-z]+,?\s?[A-Z]{2}|\b[A-Za-z]+\s?\bCity\b)/i.test(l)) || "",
    website: links.website || "",
    socials: {
      github: links.github || "",
      linkedin: links.linkedin || "",
      twitter: links.twitter || "",
    },
    about:
      lines.find((l) => /summary|about/i.test(l))
        ? sliceSection(lines, ["summary", "about"]).slice(0, 3).join(" ")
        : undefined,
  };

  const skills = categorizeSkills(skillsList);

  const knownTech = [
    "next.js","react","typescript","javascript","tailwind","node","express","prisma","postgres","mongodb","fastapi","python","aws","vercel"
  ];
  const projects = projectsList.map((raw) => {
    const title = raw.replace(/[:\-].*$/, "").trim();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const tags = Array.from(new Set(knownTech.filter((t) => raw.toLowerCase().includes(t.replace(".", "")))));
    return {
      slug: slug || `proj-${Math.random().toString(36).slice(2, 7)}`,
      title: title || raw.slice(0, 40),
      description: raw,
      features: [],
      tags: tags.length ? tags.map((t) => t[0].toUpperCase() + t.slice(1)) : ["Project"],
    };
  });

  // Write updates
  if (fs.existsSync(fileProfile)) {
    writeBackup(fileProfile);
    const about = profile.about || "Full‑stack developer focused on building accessible, performant, and beautiful web apps with Next.js, TypeScript, and cloud‑native tooling.";
    const content = `export const profile = {\n  name: ${JSON.stringify(profile.name)},\n  title: ${JSON.stringify(profile.title)},\n  email: ${JSON.stringify(profile.email)},\n  phone: ${JSON.stringify(profile.phone)},\n  location: ${JSON.stringify(profile.location)},\n  website: ${JSON.stringify(profile.website || "")},\n  socials: {\n    github: ${JSON.stringify(profile.socials.github || "")},\n    linkedin: ${JSON.stringify(profile.socials.linkedin || "")},\n    twitter: ${JSON.stringify(profile.socials.twitter || "")},\n  },\n  about: ${JSON.stringify(about)},\n};\n`;
    fs.writeFileSync(fileProfile, content, "utf8");
  }

  if (fs.existsSync(fileSkills) && Object.values(skills).some((a) => a.length)) {
    writeBackup(fileSkills);
    const content = `export const skills = {\n  languages: ${JSON.stringify(skills.languages || [])},\n  frontend: ${JSON.stringify(skills.frontend || [])},\n  backend: ${JSON.stringify(skills.backend || [])},\n  devops: ${JSON.stringify(skills.devops || [])},\n  tooling: ${JSON.stringify(skills.tooling || [])},\n};\n`;
    fs.writeFileSync(fileSkills, content, "utf8");
  }

  if (fs.existsSync(fileProjects) && projects.length) {
    writeBackup(fileProjects);
    const existing = read(fileProjects);
    // Preserve import type line from existing file
    const headerMatch = existing.match(/^import[^\n]+\n/);
    const header = headerMatch ? headerMatch[0] : "import type { Project } from \"@/components/projects/project-card\";\n\n";
    const body = `export const projects: Project[] = ${JSON.stringify(projects, null, 2)} as any;\n`;
    const normalized = body
      .replace(/\"features\": \[\]/g, '"features": ["Key features listed in resume"]')
      .replace(/\"tags\": \[(.*?)\]/g, (m) => m.replace(/\"(\w)/g, '"$1'.toUpperCase()));
    fs.writeFileSync(fileProjects, header + "\n" + normalized, "utf8");
  }

  // Write extracted snapshot
  const out = path.join(root, "lib", "data", "extracted.json");
  fs.writeFileSync(out, JSON.stringify({ profile, skills, projects }, null, 2));
  console.log("Extraction complete. Files updated. Snapshot:", path.relative(root, out));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
