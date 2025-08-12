import { ProjectsGrid } from "@/components/projects-grid";
import { Section } from "@/components/section";

export default function ProjectsPage() {
  return (
    <>
      <Section title="Projects">
        <p className="text-muted-foreground mb-6">Some of my favorite builds and experiments.</p>
        <ProjectsGrid showAll />
      </Section>
    </>
  );
}
