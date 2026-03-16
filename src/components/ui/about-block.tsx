"use client"

import { motion } from "framer-motion";

export function AboutBlock() {
  return (
    <section id="about" className="relative flex items-center justify-center min-h-screen w-full bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-2 text-xs uppercase tracking-[0.4em] text-primary" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
          // PERSONNEL FILE
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-6 text-4xl font-bold text-foreground md:text-5xl uppercase tracking-tight" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
          About Me
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="mx-auto mb-8 h-px w-24 bg-primary" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base leading-relaxed tracking-wide mb-8 text-justify text-foreground"
          style={{ fontFamily: "var(--font-share-tech-mono)" }}
        >
          My name is Liam Felipe, a 20-year-old Information Technology student at AMA Computer College Fairview.
          I am passionate about technology and am actively pursuing knowledge in both web application development
          and game development, with the goal of building a career in either field. Outside of academics,
          I enjoy assembling Gunpla and model kits, which has strengthened my attention to detail and patience.
          I am driven to complete my studies and establish myself in a professional environment where I can
          continuously grow and contribute meaningfully to the field of technology.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 border border-primary/40 p-4"
          style={{ fontFamily: "var(--font-share-tech-mono)" }}
        >
          {[
            { label: "STATUS", value: "ACTIVE" },
            { label: "YEAR", value: "2ND" },
            { label: "TRACK", value: "WEB + GAME" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className="text-lg font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-xs text-muted-foreground/60 uppercase tracking-widest italic"
          style={{ fontFamily: "var(--font-share-tech-mono)" }}
        >
          "Even so, I will keep moving forward." — Shinei Nouzen
        </motion.p>
      </div>
    </section>
  );
}