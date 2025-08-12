"use client";
import { motion } from "framer-motion";
import React from "react";

export function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="container py-12">
      <motion.h2
        className="text-2xl md:text-3xl font-semibold mb-6"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}
