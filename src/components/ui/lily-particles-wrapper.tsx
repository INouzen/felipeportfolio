"use client"

import dynamic from "next/dynamic";

const LilyParticles = dynamic(
  () => import("@/components/ui/lily-particles").then((mod) => mod.LilyParticles),
  { ssr: false }
);

export function LilyParticlesWrapper() {
  return <LilyParticles />;
}