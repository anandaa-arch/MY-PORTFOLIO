import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data/projects";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <div className="container py-12">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          {project.image ? (
            <div className="relative w-full aspect-video overflow-hidden rounded-xl border">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="aspect-video rounded-xl border bg-gradient-to-br from-blue-500/20 via-fuchsia-500/20 to-cyan-400/20" />
          )}
          <div className="mt-4 flex gap-3">
            {project.repo && (
              <Button asChild>
                <a href={project.repo} target="_blank" rel="noreferrer">Code</a>
              </Button>
            )}
            {project.demo && (
              <Button variant="secondary" asChild>
                <a href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
              </Button>
            )}
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.description}</p>
              <h3 className="mt-6 font-semibold">Features</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
