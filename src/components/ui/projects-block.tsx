"use client"

import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const projects = [
  {
    title: "Luau Scripting",
    media: "/project1.mp4",
    type: "video",
  },
  {
    title: "Blender 3D Modeling",
    media: "/project2.png",
    type: "image",
  },
  {
    title: "Project Three",
    media: "/project3.png",
    type: "image",
  },
];

export function ProjectsBlock() {
  return (
    <section id="projects" className="relative flex items-center justify-center min-h-screen w-full bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-4xl font-bold text-foreground md:text-5xl"
        >
          Personal Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-muted">
                    {project.type === "video" ? (
                      <video
                        key={project.media}
                        src={project.media}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        ref={(el) => { if (el) el.play().catch(() => {}); }}
                      />
                    ) : (
                      <img
                        src={project.media}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}