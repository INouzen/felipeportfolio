"use client"

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section"));
    let isScrolling = false;
    let current = 0;

    const goTo = (index: number) => {
      if (index < 0 || index >= sections.length) return;
      current = index;
      sections[index].scrollIntoView({ behavior: "smooth" });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0) goTo(current + 1);
      else goTo(current - 1);

      setTimeout(() => { isScrolling = false; }, 900);
    };

    // Find which section is currently closest to viewport
    const updateCurrent = () => {
      let closest = 0;
      let minDist = Infinity;
      sections.forEach((s, i) => {
        const dist = Math.abs(s.getBoundingClientRect().top);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      current = closest;
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;
      isScrolling = true;
      updateCurrent();
      if (diff > 0) goTo(current + 1);
      else goTo(current - 1);
      setTimeout(() => { isScrolling = false; }, 900);
    };

    // Remove CSS snap since JS handles it now
    document.documentElement.style.scrollSnapType = "none";
    document.querySelectorAll("section").forEach(s => {
      (s as HTMLElement).style.scrollSnapAlign = "none";
    });

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("scroll", updateCurrent, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", updateCurrent);
    };
  }, []);

  return null;
}