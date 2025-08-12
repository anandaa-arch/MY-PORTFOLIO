import { Section } from "./section";
import { certifications } from "@/lib/data/certifications";
import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui";

export function Certifications() {
  if (!certifications.length) return null;
  return (
    <Section id="certifications" title="Certifications">
      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((c) => (
          <Card key={c.slug} className="glass">
            <CardHeader>
              <CardTitle className="text-lg">{c.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{c.issuer} • {c.date}</p>
            </CardHeader>
            <CardContent>
              {c.description && (
                <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
              )}
              {c.skills && (
                <div className="flex flex-wrap gap-2">
                  {c.skills.slice(0,8).map(s => <Badge key={s}>{s}</Badge>)}
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between text-sm">
              {c.url && <a className="text-accent" href={c.url} target="_blank" rel="noreferrer">Verify →</a>}
              {c.file && <a className="text-accent ml-auto" href={c.file} target="_blank" rel="noreferrer">View Certificate</a>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
