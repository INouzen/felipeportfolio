"use client"

import { useEffect, useRef } from "react";

export function EightySixCursor() {
  const decoRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let decoX = 0, decoY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (pointRef.current) {
        pointRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      decoX += (mouseX - decoX) * 0.25;
      decoY += (mouseY - decoY) * 0.25;
      rotationRef.current += 0.8;

      if (decoRef.current) {
        decoRef.current.style.transform = `translate(${decoX}px, ${decoY}px) rotate(${rotationRef.current}deg)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    const raf = requestAnimationFrame(animate);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-9999">
      {/* Outer ring — lags and rotates */}
      <div ref={decoRef} className="absolute -translate-x-1/2 -translate-y-1/2 top-0 left-0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="14" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="20" y1="2" x2="20" y2="10" stroke="var(--color-primary)" strokeWidth="1.5" />
          <line x1="20" y1="30" x2="20" y2="38" stroke="var(--color-primary)" strokeWidth="1.5" />
          <line x1="2" y1="20" x2="10" y2="20" stroke="var(--color-primary)" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="38" y2="20" stroke="var(--color-primary)" strokeWidth="1.5" />
          <line x1="28" y1="12" x2="31" y2="9" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="12" y1="12" x2="9" y2="9" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="28" y1="28" x2="31" y2="31" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="12" y1="28" x2="9" y2="31" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="20" cy="20" r="2" fill="var(--color-primary)" fillOpacity="0.6" />
        </svg>
      </div>

      {/* Center point — snaps instantly, no rotation */}
      <div
        ref={pointRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-primary"
      />
    </div>
  );
}