"use client"

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactBlock() {
  return (
    <section id="contact" className="relative flex flex-col items-center justify-center w-full min-h-screen bg-background overflow-hidden pt-24 pb-28">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px" style={{ backgroundColor: "var(--primary)" }} />

      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-2 text-xs uppercase tracking-[0.4em] text-primary"
          style={{ fontFamily: "var(--font-share-tech-mono)" }}
        >
          // OPEN CHANNEL
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-4xl font-bold uppercase md:text-5xl"
        >
          Contact
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a href="mailto:liamfelipe7212005@gmail.com">
            <Button size="lg" className="gap-2 uppercase tracking-widest text-xs rounded-none border-primary bg-primary hover:bg-primary/80 w-full sm:w-auto">
              <Mail className="h-4 w-4" /> Send Message
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/liam-felipe-a79a72365/" target="_blank">
            <Button size="lg" variant="outline" className="gap-2 uppercase tracking-widest text-xs rounded-none border-primary text-primary hover:bg-primary w-full sm:w-auto">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </Button>
          </a>
          <a href="https://github.com/INouzen" target="_blank">
            <Button size="lg" variant="outline" className="gap-2 uppercase tracking-widest text-xs rounded-none border-primary text-primary hover:bg-primary w-full sm:w-auto">
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto max-w-sm p-4 grid grid-cols-2 gap-4"
          style={{
            fontFamily: "var(--font-share-tech-mono)",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {[
            { label: "STATUS", value: "AVAILABLE" },
            { label: "RESPONSE", value: "24-48 HRS" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className="text-sm font-bold text-primary flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}