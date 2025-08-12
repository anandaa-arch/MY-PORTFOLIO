import Link from "next/link";
import { Section } from "@/components/section";
import { profile } from "@/lib/data/profile";
import { Button } from "@/components/ui";

export default function ContactPage() {
  return (
    <Section title="Contact">
      <div className="grid md:grid-cols-2 gap-8">
        <form action="https://formspree.io/f/your-form-id" method="POST" className="glass p-6 rounded-xl space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input id="name" name="name" required className="w-full rounded-md border bg-background px-3 py-2" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input id="email" name="email" type="email" required className="w-full rounded-md border bg-background px-3 py-2" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea id="message" name="message" rows={5} required className="w-full rounded-md border bg-background px-3 py-2" />
          </div>
          <Button type="submit" className="w-full">Send</Button>
        </form>
        <div className="space-y-4">
          <div className="glass p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Reach me</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>Email: <Link href={`mailto:${profile.email}`} className="text-accent">{profile.email}</Link></li>
              <li>Phone: <span>{profile.phone}</span></li>
              <li>Location: <span>{profile.location}</span></li>
            </ul>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Socials</h3>
            <ul className="space-x-3">
              <li className="inline"><a href={profile.socials.github} className="text-accent" target="_blank" rel="noreferrer">GitHub</a></li>
              <li className="inline"><a href={profile.socials.linkedin} className="text-accent" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li className="inline"><a href={profile.socials.twitter} className="text-accent" target="_blank" rel="noreferrer">X/Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
