"use client";
import { motion } from "framer-motion";
import { Button, Badge } from "@/components/ui";
import { profile } from "@/lib/data/profile";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="container pt-14 pb-4">
      <div className="flex flex-col-reverse gap-10 md:grid md:grid-cols-5 md:gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="md:col-span-3"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-2 text-accent font-medium text-lg">
            {profile.title} • Cybersecurity & AI Enthusiast
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            {profile.about}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Next.js",
              "TypeScript",
              "React",
              "Docker",
              "Cybersecurity",
              "AI / CV"
            ].map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <Button asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
            </Button>
            <div className="flex gap-4 text-muted-foreground">
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2 w-full flex justify-center"
        >
          <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full ring-4 ring-accent/20 overflow-hidden shadow-lg">
            <Image
              src="/profile.jpeg"
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
