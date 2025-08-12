import { profile } from "@/lib/data/profile";

export function Footer() {
  return (
    <footer className="border-t py-8 mt-16">
      <div className="container text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
  <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="opacity-80">Built with Next.js, TypeScript, and Tailwind.</p>
      </div>
    </footer>
  );
}
