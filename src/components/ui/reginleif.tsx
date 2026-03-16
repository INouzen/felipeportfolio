"use client"

import { useEffect, useRef } from "react";

export function Reginleif() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const killedRef = useRef(false);

  useEffect(() => {
    killedRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const DRAW_W = 220;
    const DRAW_H = 140;

    const loadImg = (src: string) => {
      const img = new Image();
      img.src = src;
      return img;
    };

    const crawlFrames = [
      loadImg("/reginleif2.png"),
      loadImg("/reginleif3.png"),
      loadImg("/reginleif4.png"),
      loadImg("/reginleif5.png"),
      loadImg("/reginleif6.png"),
    ];

    const deployFrames = [
      loadImg("/reginleif11.png"),
      loadImg("/reginleif12.png"),
      loadImg("/reginleif13.png"),
      loadImg("/reginleif14.png"),
    ];

    type State = "hidden" | "deploy" | "rise" | "crawl";

    const FRAME_SPEEDS: Record<State, number> = {
      hidden: 0,
      deploy: 8,
      rise: 0,
      crawl: 7,
    };

    const getContactSection = () => document.querySelector<HTMLElement>("#contact");

    const getGroundY = (): number => {
      const el = getContactSection();
      if (!el) return window.innerHeight - 60;
      const rect = el.getBoundingClientRect();
      return Math.min(rect.bottom, window.innerHeight) - DRAW_H * 0.1;
    };

    const isContactVisible = (): boolean => {
      const el = getContactSection();
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    let state: State = "hidden";
    let frameIndex = 0;
    let frameTimer = 0;

    // Movement state
    let reg = {
      x: -DRAW_W,
      y: window.innerHeight + DRAW_H * 4,
      vx: 1.4,
      dir: 1 as 1 | -1, // 1 = right, -1 = left
    };

    let fc = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const setState = (newState: State) => {
      if (state === newState) return;
      state = newState;
      frameIndex = 0;
      frameTimer = 0;
    };

    const drawFrame = (img: HTMLImageElement, x: number, y: number, flipX: boolean) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const scale = Math.min(DRAW_W / img.naturalWidth, DRAW_H / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = x + (DRAW_W - dw) / 2;
      const dy = y + (DRAW_H - dh);
      
      ctx.save();
      if (flipX) {
        // Translate to the center of the sprite, flip, then translate back
        ctx.translate(dx + dw / 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, -dw / 2, dy, dw, dh);
      } else {
        ctx.drawImage(img, dx, dy, dw, dh);
      }
      ctx.restore();
    };

    let rafId: number;

    const animate = () => {
      if (killedRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fc++;

      if (state === "hidden") {
        if (isContactVisible()) {
          reg.x = -DRAW_W;
          reg.dir = 1;
          reg.vx = Math.abs(reg.vx);
          reg.y = getGroundY() + DRAW_H * 4;
          setState("deploy");
        }
        rafId = requestAnimationFrame(animate);
        return;
      }

      const groundY = getGroundY();
      const targetY = groundY - DRAW_H;

      if (state === "deploy") {
        frameTimer++;
        if (frameTimer >= FRAME_SPEEDS.deploy) {
          frameTimer = 0;
          frameIndex++;
          if (frameIndex >= deployFrames.length) setState("rise");
        }
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (state === "rise") {
        if (reg.y > targetY) {
          reg.y -= 2.5;
        } else {
          reg.y = targetY;
          setState("crawl");
        }
        drawFrame(deployFrames[deployFrames.length - 1], reg.x, reg.y, reg.dir < 0);
        rafId = requestAnimationFrame(animate);
        return;
      }

      // ── CRAWL LOGIC ──
      reg.y = targetY;
      frameTimer++;
      if (frameTimer >= FRAME_SPEEDS.crawl) {
        frameTimer = 0;
        frameIndex++;
        if (frameIndex >= crawlFrames.length) frameIndex = 0;
      }

      reg.x += reg.vx;

      // ── FLIP AT EDGES ──
      // If going right and hit right edge
      if (reg.vx > 0 && reg.x > canvas.width) {
        reg.vx *= -1;
        reg.dir = -1;
      } 
      // If going left and hit left edge
      else if (reg.vx < 0 && reg.x < -DRAW_W) {
        reg.vx *= -1;
        reg.dir = 1;
      }

      if (!isContactVisible()) {
        setState("hidden");
        rafId = requestAnimationFrame(animate);
        return;
      }

      const currentFrame = crawlFrames[Math.min(frameIndex, crawlFrames.length - 1)];
      if (currentFrame) {
        ctx.save();
        const tilt = Math.sin(fc * 0.08) * 0.025;
        ctx.translate(reg.x + DRAW_W / 2, reg.y + DRAW_H / 2);
        ctx.rotate(tilt);
        ctx.translate(-(reg.x + DRAW_W / 2), -(reg.y + DRAW_H / 2));
        
        // dir < 0 means we are moving left, so we flip the sprite
        drawFrame(currentFrame, reg.x, reg.y, reg.dir < 0);
        ctx.restore();
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      killedRef.current = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-1 w-full h-full" />;
}