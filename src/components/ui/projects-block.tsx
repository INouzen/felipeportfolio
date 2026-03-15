"use client"

import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useCallback } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const projects = [
  {
    title: "Luau Scripting",
    media: "/project1.mp4",
    type: "video",
    missionId: "OP-001",
    status: "COMPLETE",
    unit: "JUGGERNAUT-01",
    classification: "GAME DEV",
  },
  {
    title: "Blender 3D Modeling",
    media: "/project2.png",
    type: "image",
    missionId: "OP-002",
    status: "COMPLETE",
    unit: "JUGGERNAUT-02",
    classification: "3D ART",
  },
  {
    title: "GFX Making",
    media: "/project3.png",
    type: "image",
    missionId: "OP-003",
    status: "ONGOING",
    unit: "JUGGERNAUT-03",
    classification: "CLASSIFIED",
  },
];

function BeepLight({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-2 w-2 rounded-full bg-primary"
      animate={{ opacity: [1, 0.1, 1], scale: [1, 0.8, 1] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function ProjectsBlock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex];

  const setApi = useCallback((api: CarouselApi) => {
    if (!api) return;
    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, []);

  return (
    <section id="projects" className="relative flex items-center justify-center min-h-screen w-full bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-2 text-xs uppercase tracking-[0.4em] text-primary" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
          // JUGGERNAUT SORTIE RECORDS
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-2 text-4xl font-bold text-foreground md:text-5xl uppercase tracking-tight">
          Personal Projects
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="mb-6 text-xs text-muted-foreground/50 uppercase tracking-widest" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
          SPEARHEAD SQUADRON // SECTOR 86 // CLEARANCE: LEVEL-3
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="mx-auto mb-8 h-px w-24 bg-primary" />

        {/* Mission briefing panel with beep lights */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
          className="mb-6 mx-auto max-w-2xl border border-primary/20 bg-primary/5 px-4 py-2 flex items-center justify-between text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-share-tech-mono)" }}
        >
          <span className="text-primary/60">MISSION: <span className="text-primary">{active.missionId}</span></span>
          <span className="text-primary/60">UNIT: <span className="text-primary">{active.unit}</span></span>
          <span className="text-primary/60">CLASS: <span className="text-primary">{active.classification}</span></span>
          <span className={`flex items-center gap-1.5 ${active.status === "COMPLETE" ? "text-primary" : "text-yellow-500"}`}>
            {active.status === "COMPLETE"
              ? <BeepLight delay={0} />
              : <motion.span className="inline-block h-2 w-2 rounded-full bg-yellow-500" animate={{ opacity: [1, 0.1, 1], scale: [1, 0.8, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
            }
            {active.status}
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
          <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full aspect-video overflow-hidden bg-muted border border-primary/30">

                    {/* Corner brackets with beep lights */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary z-10" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary z-10" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary z-10" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary z-10" />

                    {/* Beep lights at corners */}
                    <div className="absolute top-2 left-2 z-20"><BeepLight delay={0} /></div>
                    <div className="absolute top-2 right-2 z-20"><BeepLight delay={0.6} /></div>
                    <div className="absolute bottom-2 left-2 z-20"><BeepLight delay={1.2} /></div>
                    <div className="absolute bottom-2 right-2 z-20"><BeepLight delay={1.8} /></div>

                    {/* HUD top bar */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 pt-2" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
                      <span className="text-[10px] text-primary/70 uppercase tracking-widest">{project.unit}</span>
                      <span className="text-[10px] text-primary/70 uppercase tracking-widest">{project.missionId}</span>
                    </div>

                    {project.type === "video" ? (
                      <video key={project.media} src={project.media} autoPlay loop muted playsInline className="w-full h-full object-cover" ref={(el) => { if (el) el.play().catch(() => {}); }} />
                    ) : (
                      <img src={project.media} alt={project.title} className="w-full h-full object-cover" />
                    )}

                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-6">
                      <p className="text-xs text-primary uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-share-tech-mono)" }}>// OPERATION</p>
                      <h3 className="text-lg font-bold text-white uppercase tracking-widest">{project.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </motion.div>

        {/* Juggernaut unit selector */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="mt-6 flex justify-center gap-6" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
          {projects.map((p, i) => (
            <div key={i} className={`flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors ${i === activeIndex ? "text-primary" : "text-muted-foreground/40"}`}>
              <BeepLight delay={i * 0.4} />
              {p.unit}
            </div>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="mt-8 text-xs text-muted-foreground/70 uppercase tracking-widest italic" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
          "We are not tools of the government, or anyone else." — Shinei Nouzen
        </motion.p>
      </div>
    </section>
  );
}