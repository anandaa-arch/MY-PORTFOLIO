import { Section } from "@/components/section";
import { skills } from "@/lib/data/skills";
import { Badge } from "@/components/ui";

export default function ResumePage() {
  return (
    <Section title="Resume">
      <div className="flex items-center justify-between mb-4">
        <p className="text-muted-foreground">View or download my latest resume.</p>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="text-accent">Download PDF</a>
      </div>
      <div className="aspect-[1/1.414] w-full border rounded-xl overflow-hidden bg-muted">
        <iframe src="/resume.pdf#view=FitH" className="w-full h-full" title="Resume PDF" />
      </div>
      <div className="mt-10 space-y-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">Highlighted Skills</h3>
          <div className="flex flex-wrap gap-2">
            {[...skills.languages, ...skills.frontend, ...skills.backend, ...skills.devops].slice(0,12).map(s => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>
        {skills.professional && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">Professional & IAM Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.professional.map(s => <Badge key={s}>{s}</Badge>)}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
