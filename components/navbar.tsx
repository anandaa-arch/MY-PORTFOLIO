"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/data/profile";
import type { Route } from "next";

const nav: { href: Route; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/60 border-b">
      <div className="container flex h-14 items-center justify-between">
  <Link href="/" className="font-semibold tracking-tight">{profile.name}</Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "text-sm transition-colors hover:text-accent",
                pathname === n.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/resume.pdf" className="text-sm text-accent" target="_blank" rel="noreferrer">Download</a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
