import { HeroBlock } from "@/components/ui/hero-block-shadcnui";
import { ProjectsBlock } from "@/components/ui/projects-block";
import { AboutBlock } from "@/components/ui/about-block";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <main className="relative">
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <HeroBlock />
      <AboutBlock />
      <ProjectsBlock />
    </main>
  );
}