"use client"

import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useEffect, useState } from "react";

const LEGION_ALERTS = [
  "LEGION CONTACT DETECTED // SECTOR 86",
  "JUGGERNAUT UNIT ONLINE // PROCESSOR: UNDERTAKER",
  "PARA-RAID LINK ESTABLISHED // SPEARHEAD SQ.",
  "WARNING: AMEISE-CLASS UNITS APPROACHING",
  "SHEPHERD SIGNAL INTERCEPTED // STAY ALERT",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [alertIndex, setAlertIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAlert(false);
      setTimeout(() => {
        setAlertIndex((i) => (i + 1) % LEGION_ALERTS.length);
        setShowAlert(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Legion Alert Ticker */}
      <div
        className="fixed top-0 left-0 right-0 z-60 h-6 border-b border-primary/50 flex items-center px-4 overflow-hidden bg-primary/5"
        style={{ fontFamily: "var(--font-share-tech-mono)" }}
      >
        <span className="text-primary text-[10px] uppercase tracking-widest mr-3 shrink-0 animate-pulse">
          ⚠ LEGION ALERT
        </span>
        <div className="w-px h-3 bg-primary/50 mr-3 shrink-0" />
        <AnimatePresence mode="wait">
          {showAlert && (
            <motion.span
              key={alertIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] text-primary/70 uppercase tracking-widest truncate"
            >
              {LEGION_ALERTS[alertIndex]}
            </motion.span>
          )}
        </AnimatePresence>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-primary/50 uppercase tracking-widest">
            UNIT: JUGGERNAUT-01
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-8 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-primary/30 shadow-lg shadow-primary/5 py-2"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <a href="/" className="flex items-center gap-2">
          <motion.img
            src="/logo.png"
            alt="Nouzen logo"
            className="h-6 w-6 object-contain"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.span
            style={{ fontFamily: "var(--font-nunito)" }}
            className="text-lg font-black lowercase tracking-tight text-foreground"
            whileHover={{ letterSpacing: "0.05em" }}
            transition={{ duration: 0.2 }}
          >
            nouzen.
          </motion.span>
        </a>

        <div className="flex items-center gap-8">
          <div
            className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-muted-foreground"
            style={{ fontFamily: "var(--font-share-tech-mono)" }}
          >
            {[
              { label: "About", href: "#about" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
                className="relative text-muted-foreground hover:text-primary transition-colors"
                whileHover="hover"
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-primary block"
                  variants={{ hover: { width: "100%" } }}
                  initial={{ width: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>
          <ModeToggle />
        </div>
      </motion.nav>
    </>
  );
}