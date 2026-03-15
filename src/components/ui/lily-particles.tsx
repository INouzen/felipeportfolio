"use client"

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Sparkles } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "petal" | "spark" | "slash" | "stamen";
  rotation: number;
  rotSpeed: number;
}

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export function LilyParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const trail = useRef<TrailPoint[]>([]);
  const animRef = useRef<number>(0);
  const lastMouseTime = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isLight = resolvedTheme === "light";
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) {
      particles.current = [];
      trail.current = [];
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      cancelAnimationFrame(animRef.current);
      return;
    }

    if (!isDark && !isLight) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastX = 0;
    let lastY = 0;

    const primary = isDark
      ? { r: 96, g: 165, b: 250 }
      : { r: 220, g: 38, b: 38 };

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseTime.current < 25) return;
      lastMouseTime.current = now;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastX = e.clientX;
      lastY = e.clientY;

      trail.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trail.current.length > 14) trail.current.shift();

      const isFast = speed > 25;
      const count = isFast ? 4 : 2;

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        const type = isFast
          ? rand < 0.35 ? "petal" : rand < 0.6 ? "slash" : rand < 0.85 ? "spark" : "stamen"
          : rand < 0.6 ? "petal" : "stamen";

        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * (isFast ? 24 : 10),
          y: e.clientY + (Math.random() - 0.5) * (isFast ? 24 : 10),
          vx: (Math.random() - 0.5) * (isFast ? 4.5 : 1.5) + (isFast ? dx * 0.08 : 0),
          vy: -Math.random() * (isFast ? 4.5 : 2) - 0.8 + (isFast ? dy * 0.08 : 0),
          life: Math.random() * (isFast ? 35 : 55) + 20,
          maxLife: Math.random() * (isFast ? 35 : 55) + 20,
          size: Math.random() * (isFast ? 11 : 7) + 3,
          type,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * (isFast ? 0.22 : 0.08),
        });
      }

      if (particles.current.length > 100) {
        particles.current = particles.current.slice(-100);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const { r, g, b } = primary;

    const drawPetal = (x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size * 0.3, -size * 0.5, size * 0.5, -size * 1.5, 0, -size * 2);
      ctx.bezierCurveTo(-size * 0.5, -size * 1.5, -size * 0.3, -size * 0.5, 0, 0);
      const grad = ctx.createLinearGradient(0, 0, 0, -size * 2);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
      grad.addColorStop(0.6, `rgba(${Math.min(r + 50, 255)}, ${Math.min(g + 50, 255)}, ${Math.min(b + 50, 255)}, ${alpha * 0.8})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.2})`);
      ctx.fillStyle = grad;
      ctx.fill();
      // Subtle outline
      ctx.strokeStyle = `rgba(${Math.min(r + 80, 255)}, ${Math.min(g + 80, 255)}, ${Math.min(b + 80, 255)}, ${alpha * 0.4})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();
    };

    const drawStamen = (x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      // Stem
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -size * 2.5);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      // Glowing tip
      const tipGrad = ctx.createRadialGradient(0, -size * 2.5, 0, 0, -size * 2.5, size * 0.5);
      tipGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      tipGrad.addColorStop(0.4, `rgba(${Math.min(r + 80, 255)}, ${Math.min(g + 80, 255)}, ${Math.min(b + 80, 255)}, ${alpha * 0.8})`);
      tipGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(0, -size * 2.5, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = tipGrad;
      ctx.fill();
      ctx.restore();
    };

    const drawSpark = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      // Glow effect
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 0.8);
      grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      grad.addColorStop(0.3, `rgba(${Math.min(r + 80, 255)}, ${Math.min(g + 80, 255)}, ${Math.min(b + 80, 255)}, ${alpha * 0.9})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const drawSlash = (x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      // Main slash
      const grad = ctx.createLinearGradient(-size * 1.5, 0, size * 1.5, 0);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      grad.addColorStop(0.3, `rgba(${Math.min(r + 60, 255)}, ${Math.min(g + 60, 255)}, ${Math.min(b + 60, 255)}, ${alpha})`);
      grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha})`);
      grad.addColorStop(0.7, `rgba(${Math.min(r + 60, 255)}, ${Math.min(g + 60, 255)}, ${Math.min(b + 60, 255)}, ${alpha})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.moveTo(-size * 1.5, 0);
      ctx.lineTo(size * 1.5, 0);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();
      // Thin bright core
      ctx.beginPath();
      ctx.moveTo(-size * 1.2, 0);
      ctx.lineTo(size * 1.2, 0);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();
    };

    const drawTrail = () => {
      if (trail.current.length < 2) return;
      ctx.save();
      for (let i = 1; i < trail.current.length; i++) {
        const t = i / trail.current.length;
        const alpha = t * 0.2;
        ctx.beginPath();
        ctx.moveTo(trail.current[i - 1].x, trail.current[i - 1].y);
        ctx.lineTo(trail.current[i].x, trail.current[i].y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = t * 2;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.current = trail.current
        .map(p => ({ ...p, age: p.age + 1 }))
        .filter(p => p.age < 12);

      drawTrail();

      particles.current = particles.current.filter(p => p.life > 0);

      for (const p of particles.current) {
        const alpha = p.life > 10 ? 0.85 : (p.life / 10) * 0.85;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.97;
        p.rotation += p.rotSpeed;
        p.life--;

        if (p.type === "petal") drawPetal(p.x, p.y, p.size, p.rotation, alpha);
        else if (p.type === "stamen") drawStamen(p.x, p.y, p.size, p.rotation, alpha);
        else if (p.type === "slash") drawSlash(p.x, p.y, p.size, p.rotation, alpha);
        else drawSpark(p.x, p.y, p.size, alpha);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
      particles.current = [];
      trail.current = [];
    };
  }, [isDark, isLight, enabled]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-9997" />
      <button
        onClick={() => setEnabled(!enabled)}
        className={`fixed bottom-20 left-8 z-9998 flex items-center gap-2 border px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${
          enabled
            ? "border-green-500 text-green-500 bg-green-500/10 hover:bg-green-500/20"
            : "border-red-500 text-red-500 bg-red-500/10 hover:bg-red-500/20"
        }`}
        style={{ fontFamily: "var(--font-share-tech-mono)" }}
      >
        <Sparkles className="h-3 w-3" />
        {enabled ? "FX ON" : "FX OFF"}
      </button>
    </>
  );
}