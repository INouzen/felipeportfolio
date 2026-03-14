import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Nunito, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { EightySixCursor } from "@/components/ui/cursor";
import { LenaChat } from "@/components/ui/lena-chat";
import { LilyParticlesWrapper } from "@/components/ui/lily-particles-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Felipe's Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${nunito.variable} ${shareTechMono.variable}`}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <EightySixCursor />
          <LenaChat />
          <LilyParticlesWrapper />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}