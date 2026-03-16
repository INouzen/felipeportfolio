"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CornerDecorations() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrolling(false);
      }, 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top left */}
      <motion.div
        animate={scrolling
          ? { width: 0, height: 0, opacity: 0 }
          : { width: 128, height: 128, opacity: 1 }
        }
        transition={scrolling
          ? { duration: 0.3, ease: "easeInOut" }
          : { duration: 0.15, ease: "easeOut" } // ← snaps in fast when locked
        }
        className="fixed top-0 left-0 bg-primary/20 pointer-events-none z-2"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />
      {/* Bottom right */}
      <motion.div
        animate={scrolling
          ? { width: 0, height: 0, opacity: 0 }
          : { width: 128, height: 128, opacity: 1 }
        }
        transition={scrolling
          ? { duration: 0.3, ease: "easeInOut" }
          : { duration: 0.15, ease: "easeOut", delay: 0.04 } // ← snaps in fast
        }
        className="fixed bottom-0 right-0 bg-primary/20 pointer-events-none z-2"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />
    </>
  );
}