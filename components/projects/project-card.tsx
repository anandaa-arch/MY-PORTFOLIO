"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

export type Project = {
  slug: string;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  image?: string;
  repo?: string;
  demo?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn("overflow-hidden glass")}> 
        {project.image ? (
          <div className="relative w-full h-40">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="h-40 bg-gradient-to-br from-blue-500/20 via-fuchsia-500/20 to-cyan-400/20" />
        )}
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            {project.features.slice(0, 3).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <div className="flex gap-3 text-sm">
            {project.repo && (
              <a className="text-accent" href={project.repo} target="_blank" rel="noreferrer">Code</a>
            )}
            {project.demo && (
              <a className="text-accent" href={project.demo} target="_blank" rel="noreferrer">Demo</a>
            )}
          </div>
          <Link className="text-sm text-accent" href={`/projects/${project.slug}`}>Details →</Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
