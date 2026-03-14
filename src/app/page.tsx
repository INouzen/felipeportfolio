import { HeroBlock } from "@/components/ui/hero-block-shadcnui";
import { ProjectsBlock } from "@/components/ui/projects-block";
import { AboutBlock } from "@/components/ui/about-block";
import { Navbar } from "@/components/ui/navbar";
import { ContactBlock } from "@/components/ui/contact-block";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroBlock />
      <AboutBlock />
      <ProjectsBlock />
      <ContactBlock />
    </main>
  );
}