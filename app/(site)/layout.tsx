import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
