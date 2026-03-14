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
  type: "petal" | "stamen" | "spark" | "slash";
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
  const mouse = useRef({ x: 0, y: 0, vx: 0, vy: 0, speed: 0 });
  const animRef = useRef<number>(0);
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
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      mouse.current = { x: e.clientX, y: e.clientY, vx: dx, vy: dy, speed };
      lastX = e.clientX;
      lastY = e.clientY;

      trail.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trail.current.length > 20) trail.current.shift();

      const isFast = speed > 20;
      const count = isFast ? 6 : 2;

      for (let i = 0; i < count; i++) {
        const type = isFast
          ? Math.random() < 0.4 ? "petal" : Math.random() < 0.5 ? "slash" : "spark"
          : Math.random() < 0.6 ? "petal" : "stamen";

        const spread = isFast ? 30 : 10;
        const speed2 = isFast ? 5 : 1.5;

        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * spread,
          y: e.clientY + (Math.random() - 0.5) * spread,
          vx: (Math.random() - 0.5) * speed2 + (isFast ? dx * 0.1 : 0),
          vy: -Math.random() * (isFast ? 5 : 2) - 1 + (isFast ? dy * 0.1 : 0),
          life: Math.random() * (isFast ? 40 : 60) + 20,
          maxLife: Math.random() * 60 + 20,
          size: Math.random() * (isFast ? 12 : 8) + 4,
          type,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * (isFast ? 0.3 : 0.1),
        });
      }

      if (particles.current.length > 200) {
        particles.current = particles.current.slice(-200);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const { r, g, b } = primary;

    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, alpha: number) => {
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
      grad.addColorStop(0.5, `rgba(${Math.min(r + 40, 255)}, ${Math.min(g + 40, 255)}, ${Math.min(b + 40, 255)}, ${alpha})`);
      grad.addColorStop(1, `rgba(${Math.min(r + 80, 255)}, ${Math.min(g + 80, 255)}, ${Math.min(b + 80, 255)}, ${alpha * 0.3})`);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const drawStamen = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -size * 2.5);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -size * 2.5, size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.min(r + 40, 255)}, ${Math.min(g + 40, 255)}, ${Math.min(b + 40, 255)}, ${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    const drawSpark = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    const drawSlash = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(-size * 1.5, 0);
      ctx.lineTo(size * 1.5, 0);
      const grad = ctx.createLinearGradient(-size * 1.5, 0, size * 1.5, 0);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };

    const drawTrail = (ctx: CanvasRenderingContext2D) => {
      if (trail.current.length < 2) return;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(trail.current[0].x, trail.current[0].y);
      for (let i = 1; i < trail.current.length; i++) {
        ctx.lineTo(trail.current[i].x, trail.current[i].y);
      }
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.current = trail.current.map(p => ({ ...p, age: p.age + 1 })).filter(p => p.age < 15);
      drawTrail(ctx);
      particles.current = particles.current.filter(p => p.life > 0);
      for (const p of particles.current) {
        const alpha = p.life > 10 ? 0.8 : p.life / 10 * 0.8;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.life--;
        if (p.type === "petal") drawPetal(ctx, p.x, p.y, p.size, p.rotation, alpha);
        else if (p.type === "stamen") drawStamen(ctx, p.x, p.y, p.size, p.rotation, alpha);
        else if (p.type === "slash") drawSlash(ctx, p.x, p.y, p.size, p.rotation, alpha);
        else drawSpark(ctx, p.x, p.y, p.size, alpha);
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
            ? "border-primary text-primary bg-primary/10 hover:bg-primary/20"
            : "border-muted-foreground/30 text-muted-foreground/50 hover:border-primary/50 hover:text-primary/50"
        }`}
        style={{ fontFamily: "var(--font-share-tech-mono)" }}
      >
        <Sparkles className="h-3 w-3" />
        {enabled ? "FX ON" : "FX OFF"}
      </button>
    </>
  );
}