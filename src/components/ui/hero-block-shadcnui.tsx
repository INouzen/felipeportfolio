"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const roles = ["Web Developer.", "Game Developer.", "BSIT Student.", "The Undertaker."];

export function HeroBlock() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-background min-h-screen w-full">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="absolute top-24 left-8 text-xs text-primary uppercase tracking-[0.3em] border-l-2 border-primary pl-3" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
        UNIT: SPEARHEAD // NOUZEN, L.F
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="mb-8 inline-block">
            <div className="mx-auto h-24 w-24 rounded-full border-2 border-primary overflow-hidden shadow-lg shadow-primary/20">
            <img src="/me.jpg" alt="Liam Felipe" className="h-full w-full object-cover" />
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mb-2 text-xs uppercase tracking-[0.4em] text-primary" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
            // CALLSIGN: UNDERTAKER
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mb-4 text-5xl font-bold text-foreground md:text-7xl tracking-tight">
            Liam Felipe
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-2 h-8 flex items-center justify-center">
            <span className="text-xl text-primary" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
              {displayed}<span className="animate-pulse">█</span>
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mx-auto mb-6 h-px w-24 bg-primary" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground tracking-wide">
            2nd Year BSIT Student from AMA Computer College Fairview.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mb-12 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2 uppercase tracking-widest text-xs rounded-none border border-primary bg-primary hover:bg-primary/80">
              <Mail className="h-4 w-4" />Get in Touch
            </Button>
            <Button size="lg" variant="outline" className="gap-2 uppercase tracking-widest text-xs rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects<ArrowDown className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }} className="flex justify-center gap-4">
            {[
              { icon: Github, href: "https://github.com/INouzen" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/liam-felipe-a79a72365/" },
              { icon: Mail, href: "mailto:liamfelipe7212005@gmail.com" },
            ].map((social, index) => (
              <motion.a key={index} href={social.href} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="flex h-12 w-12 items-center justify-center border border-primary text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
        <p className="text-xs text-muted-foreground/50 uppercase tracking-widest italic">"I want to keep moving forward."</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ opacity: { delay: 1, duration: 0.6 }, y: { delay: 1.5, duration: 1.5, repeat: Infinity } }} className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
        <ArrowDown className="h-6 w-6 text-primary" />
      </motion.div>
    </section>
  );
}