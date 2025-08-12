import { ProjectCard } from "./projects/project-card";
import { Section } from "./section";
import { projects } from "@/lib/data/projects";

export function ProjectsGrid({ showAll = false }: { showAll?: boolean }) {
  const items = showAll ? projects : projects.slice(0, 6);
  return (
    <Section id="projects" title="Projects">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}
