import { Section } from "@/components/section";
import { Badge, Card, CardContent, CardFooter } from "@/components/ui";
import { certifications } from "@/lib/data/certifications";

export default function ExperiencePage() {
  return (
    <Section title="Experience">
      <div className="space-y-6">
        {(() => {
          const cert = certifications.find(c => c.slug === "tata-cybersecurity-simulation");
          return (
            <div className="glass p-5 rounded-xl">
              <div className="md:grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">Tata Cybersecurity Security Analyst Job Simulation — Forage</h3>
                      <p className="text-muted-foreground">Virtual Internship • 2025</p>
                    </div>
                    <div className="flex flex-wrap gap-2"><Badge>Cybersecurity</Badge><Badge>IAM</Badge><Badge>Documentation</Badge></div>
                  </div>
                  <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-1">
                    <li>Completed TCS Cybersecurity virtual internship focused on Identity & Access Management.</li>
                    <li>Applied cybersecurity best practices to simulated enterprise scenarios.</li>
                    <li>Produced clear technical documentation and concise stakeholder-ready presentations.</li>
                  </ul>
                </div>
                {cert?.file && (
                  <div className="md:col-span-2 mt-6 md:mt-0">
                    <Card className="h-full flex flex-col overflow-hidden">
                      <CardContent className="p-0 flex-1">
                        <iframe
                          src={cert.file + '#view=FitH'}
                          title={cert.title}
                          className="w-full h-52 md:h-full bg-muted"
                        />
                      </CardContent>
                      <CardFooter className="flex flex-col items-start gap-2 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {cert.skills?.slice(0,5).map(s => <Badge key={s} className="text-[10px] px-2 py-0.5">{s}</Badge>)}
                        </div>
                        <a
                          href={cert.file}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent"
                        >
                          Open Certificate →
                        </a>
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </Section>
  );
}
