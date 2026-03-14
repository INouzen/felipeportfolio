"use client"

import { motion } from "framer-motion";

export function AboutBlock() {
  return (
    <section id="about" className="relative flex items-center justify-center min-h-screen w-full bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-4xl font-bold text-foreground md:text-5xl"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground md:text-xl leading-relaxed"
        >
          My name is Liam Felipe, a 20-year-old Information Technology student at AMA Computer College Fairview. 
          I am passionate about technology and am actively pursuing knowledge in both web application development 
          and game development, with the goal of building a career in either field. Outside of academics, 
          I enjoy assembling Gunpla and model kits, which has strengthened my attention to detail and patience. 
          I am driven to complete my studies and establish myself in a professional environment where I can 
          continuously grow and contribute meaningfully to the field of technology.
        </motion.p>
      </div>
    </section>
  );
}