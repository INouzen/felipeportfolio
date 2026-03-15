"use client"

import { useEffect, useRef } from "react";

export function Reginleif() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const GROUND = canvas.height - 60;
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

    const fireFrames = [
      loadImg("/reginleif7.png"),
      loadImg("/reginleif8.png"),
      loadImg("/reginleif9.png"),
      loadImg("/reginleif10.png"),
      loadImg("/reginleif10.png"),
      loadImg("/reginleif9.png"),
      loadImg("/reginleif8.png"),
      loadImg("/reginleif7.png"),
    ];

    const deployFrames = [
      loadImg("/reginleif11.png"),
      loadImg("/reginleif11.png"),
      loadImg("/reginleif12.png"),
      loadImg("/reginleif12.png"),
      loadImg("/reginleif13.png"),
      loadImg("/reginleif13.png"),
      loadImg("/reginleif14.png"),
      loadImg("/reginleif14.png"),
    ];

    const damageFrames = [
      loadImg("/reginleif16.png"),
      loadImg("/reginleif16.png"),
      loadImg("/reginleif17.png"),
      loadImg("/reginleif17.png"),
      loadImg("/reginleif17.png"),
      loadImg("/reginleif18.png"),
      loadImg("/reginleif18.png"),
      loadImg("/reginleif19.png"),
      loadImg("/reginleif19.png"),
      loadImg("/reginleif18.png"),
      loadImg("/reginleif17.png"),
      loadImg("/reginleif16.png"),
    ];

    type State = "deploy" | "crawl" | "fire" | "damage" | "idle";

    let state: State = "deploy";
    let frameIndex = 0;
    let frameTimer = 0;

    const FRAME_SPEEDS: Record<State, number> = {
      deploy: 8,
      crawl: 7,
      fire: 5,
      damage: 6,
      idle: 12,
    };

    const targetY = GROUND - DRAW_H;

    let reg = {
      x: canvas.width / 2 - DRAW_W / 2,
      y: canvas.height + DRAW_H * 3,
      vx: 1.4,
      dir: 1 as 1 | -1,
    };

    let fc = 0;
    let fireCD = 280;
    let damageCD = 600;
    let idleCD = 450;
    let muzzleFlash = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    const getCurrentFrames = () => {
      switch (state) {
        case "crawl": return crawlFrames;
        case "fire": return fireFrames;
        case "deploy": return deployFrames;
        case "damage": return damageFrames;
        case "idle": return [crawlFrames[0]];
      }
    };

    const setState = (newState: State) => {
      if (state === newState) return;
      state = newState;
      frameIndex = 0;
      frameTimer = 0;
    };

    const drawFrame = (img: HTMLImageElement, x: number, y: number, flipX: boolean) => {
      if (!img.complete || img.naturalWidth === 0) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.min(DRAW_W / iw, DRAW_H / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = x + (DRAW_W - dw) / 2;
      const dy = y + (DRAW_H - dh);
      ctx.save();
      if (flipX) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, -(dx + dw), dy, dw, dh);
      } else {
        ctx.drawImage(img, dx, dy, dw, dh);
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fc++;

      const frames = getCurrentFrames();
      const speed = FRAME_SPEEDS[state];

      if (state === "deploy") {
        if (reg.y > targetY) {
          reg.y -= 2.5;
        } else {
          reg.y = targetY;
          frameTimer++;
          if (frameTimer >= speed) {
            frameTimer = 0;
            frameIndex++;
            if (frameIndex >= frames.length) {
              setState("crawl");
            }
          }
        }
      } else {
        frameTimer++;
        if (frameTimer >= speed) {
          frameTimer = 0;
          frameIndex++;
          if (frameIndex >= frames.length) {
            if (state === "fire") { setState("crawl"); muzzleFlash = 0; }
            else if (state === "damage") setState("crawl");
            else if (state === "idle") setState("crawl");
            else frameIndex = 0;
          }
        }
      }

      if (state === "crawl") {
        reg.x += reg.vx;
        if (reg.x > canvas.width + DRAW_W) reg.x = -DRAW_W;
        if (reg.x < -DRAW_W * 2) reg.x = canvas.width + DRAW_W;

        fireCD--;
        if (fireCD <= 0) {
          setState("fire");
          muzzleFlash = 12;
          fireCD = 280 + Math.floor(Math.random() * 120);
        }

        damageCD--;
        if (damageCD <= 0) {
          setState("damage");
          damageCD = 600 + Math.floor(Math.random() * 300);
        }

        idleCD--;
        if (idleCD <= 0) {
          setState("idle");
          idleCD = 450 + Math.floor(Math.random() * 200);
        }
      }

      if (muzzleFlash > 0) {
        muzzleFlash--;
        if (state === "fire" && frameIndex >= 2) {
          const fx = reg.dir > 0 ? reg.x + DRAW_W + 5 : reg.x - 20;
          const fy = reg.y + 30;
          ctx.save();
          ctx.globalAlpha = muzzleFlash / 12;
          ctx.fillStyle = "#ff8800";
          ctx.beginPath();
          ctx.arc(fx, fy, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffff88";
          ctx.beginPath();
          ctx.arc(fx, fy, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      const currentFrame = frames[Math.min(frameIndex, frames.length - 1)];

      if (state === "crawl") {
        ctx.save();
        const tilt = Math.sin(fc * 0.08) * 0.025;
        ctx.translate(reg.x + DRAW_W / 2, reg.y + DRAW_H / 2);
        ctx.rotate(tilt);
        ctx.translate(-(reg.x + DRAW_W / 2), -(reg.y + DRAW_H / 2));
        drawFrame(currentFrame, reg.x, reg.y, reg.dir < 0);
        ctx.restore();
      } else if (state === "damage") {
        ctx.save();
        ctx.translate((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4);
        drawFrame(currentFrame, reg.x, reg.y, reg.dir < 0);
        ctx.restore();
      } else {
        drawFrame(currentFrame, reg.x, reg.y, reg.dir < 0);
      }

      if (state === "damage" && fc % 3 === 0) {
        ctx.save();
        ctx.globalAlpha = 0.25 + Math.random() * 0.25;
        ctx.fillStyle = "#888888";
        ctx.beginPath();
        ctx.arc(
          reg.x + DRAW_W * 0.45 + (Math.random() - 0.5) * 20,
          reg.y + DRAW_H * 0.3 + (Math.random() - 0.5) * 10,
          5 + Math.random() * 7, 0, Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-1 w-full h-full" />;
}