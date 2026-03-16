import { Navbar } from "@/components/ui/navbar";
import { HeroBlock } from "@/components/ui/hero-block-shadcnui";
import { AboutBlock } from "@/components/ui/about-block";
import { ProjectsBlock } from "@/components/ui/projects-block";
import { EducationalBlock } from "@/components/ui/education-block";
import { ContactBlock } from "@/components/ui/contact-block";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroBlock />
      <AboutBlock />
      <ProjectsBlock />
      <EducationalBlock />
      <ContactBlock />
    </main>
  );
}