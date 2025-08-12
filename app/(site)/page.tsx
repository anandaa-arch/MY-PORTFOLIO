import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ProjectsGrid } from "@/components/projects-grid";
import { Skills } from "@/components/skills";
import { profile } from "@/lib/data/profile";
import { Certifications } from "@/components/certifications";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section id="about" title={`About ${profile.name}`}>
        <p className="text-muted-foreground max-w-3xl">{profile.about}</p>
      </Section>
      <Skills />
  <ProjectsGrid showAll={false} />
  <Certifications />
    </>
  );
}
