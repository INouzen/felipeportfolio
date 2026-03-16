"use client"

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function EducationalBlock() {
  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "AMA Computer College Fairview",
      period: "2024 — PRESENT",
      location: "Lot 28-31, Blk 61. Bristol St. Cor. Regalado Avenue, Fairview Quezon CIty, 1121 Quezon City, Philippines, Bristol Street, Novaliches,",
    },
    {
      degree: "Senior High School - STEM",
      school: "Mater Carmeli School of Novaliches",
      period: "2015 — 2024",
      location: "Fr. Francisco Palau St., Sacred Heart Village, Novaliches, Quezon City, Metro Manila, Philippines",
    }
  ];

  const amber = "#f59e0b";
  const amberBorder = "rgba(245, 158, 11, 0.4)";
  const amberBg = "rgba(245, 158, 11, 0.1)";
  const amberCard = "rgba(245, 158, 11, 0.06)";

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen bg-background overflow-hidden pt-24 pb-40">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="relative z-10 w-full max-w-3xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-2 text-xs uppercase tracking-[0.4em] text-center"
          style={{ fontFamily: "var(--font-share-tech-mono)", color: amber }}
        >
          // PERSONNEL LOG: EDUCATION
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-2 text-4xl font-bold uppercase text-center md:text-5xl tracking-tight"
          style={{ fontFamily: "var(--font-share-tech-mono)" }}
        >
          Education
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 h-px w-24"
          style={{ backgroundColor: amber }}
        />
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6"
              style={{
                backgroundColor: amberCard,
                border: `1px solid ${amberBorder}`,
                borderLeftWidth: "2px",
                borderLeftColor: amber,
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" style={{ color: amber }} /> {edu.degree}
                </h3>
                <span
                  className="text-[10px] font-mono shrink-0 ml-4 px-2 py-1"
                  style={{
                    fontFamily: "var(--font-share-tech-mono)",
                    color: amber,
                    backgroundColor: amberBg,
                    border: `1px solid ${amberBorder}`,
                  }}
                >
                  {edu.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{edu.school} — {edu.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}