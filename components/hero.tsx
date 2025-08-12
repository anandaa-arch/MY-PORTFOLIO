"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { profile } from "@/lib/data/profile";

export function Hero() {
  return (
    <section className="container pt-16 pb-8">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm text-muted-foreground">{profile.title}</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
            {profile.name} — Building delightful web experiences
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl">
            {profile.about}
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <a href="#projects">See Projects</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">Download Resume</a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="glass rounded-2xl p-8 h-64"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="h-full w-full bg-gradient-to-br from-fuchsia-500/30 via-cyan-400/20 to-blue-500/30 rounded-xl" />
        </motion.div>
      </div>
    </section>
  );
}
