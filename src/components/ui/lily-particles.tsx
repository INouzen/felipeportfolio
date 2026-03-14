"use client"

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "petal" | "stamen" | "spark";
  rotation: number;
  rotSpeed: number;
}

export function LilyParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    if (!isLight) return;

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

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Spawn particles on mouse move
      for (let i = 0; i < 3; i++) {
        const type = Math.random() < 0.6 ? "petal" : Math.random() < 0.5 ? "stamen" : "spark";
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -Math.random() * 3 - 1,
          life: 1,
          maxLife: Math.random() * 60 + 40,
          size: Math.random() * 8 + 4,
          type,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
        });
      }

      // Cap particles
      if (particles.current.length > 150) {
        particles.current = particles.current.slice(-150);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      // Spider lily petal shape — long and curved
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size * 0.3, -size * 0.5, size * 0.5, -size * 1.5, 0, -size * 2);
      ctx.bezierCurveTo(-size * 0.5, -size * 1.5, -size * 0.3, -size * 0.5, 0, 0);

      const grad = ctx.createLinearGradient(0, 0, 0, -size * 2);
      grad.addColorStop(0, `rgba(180, 20, 20, ${alpha})`);
      grad.addColorStop(0.5, `rgba(220, 40, 40, ${alpha})`);
      grad.addColorStop(1, `rgba(255, 80, 80, ${alpha * 0.3})`);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const drawStamen = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      // Long thin stamen with tip
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -size * 2.5);
      ctx.strokeStyle = `rgba(200, 60, 60, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Tip dot
      ctx.beginPath();
      ctx.arc(0, -size * 2.5, size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 100, 100, ${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    const drawSpark = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 60, 60, ${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter(p => p.life > 0);

      for (const p of particles.current) {
        const progress = 1 - p.life / p.maxLife;
        const alpha = p.life > 10 ? 0.8 : p.life / 10 * 0.8;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.life--;

        if (p.type === "petal") {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, alpha);
        } else if (p.type === "stamen") {
          drawStamen(ctx, p.x, p.y, p.size, p.rotation, alpha);
        } else {
          drawSpark(ctx, p.x, p.y, p.size, alpha);
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isLight]);

  if (!isLight) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-9997"
    />
  );
}