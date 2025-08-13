import { Section } from "./section";
import { education } from "@/lib/data/education";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "./ui";
import Image from "next/image";

export function Education() {
  if (!education.length) return null;
  return (
    <Section id="education" title="Education">
      <div className="space-y-6">
        {education.map((edu) => (
          <Card key={edu.slug} className="glass w-full">
            <CardHeader>
              <div className="flex items-start gap-6">
                {edu.logo && (
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-xl">{edu.degree}</CardTitle>
                  <p className="text-accent font-medium text-lg mt-1">{edu.field}</p>
                  <p className="text-muted-foreground mt-2">
                    {edu.institution}, {edu.location} • {edu.period}
                    {edu.current && <Badge className="ml-3">Current</Badge>}
                  </p>
                </div>
              </div>
            </CardHeader>
            {edu.description && (
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                {edu.gpa && (
                  <p className="text-muted-foreground mt-3">GPA: {edu.gpa}</p>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}