"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import projectsData from "@/data/projects.json";
import teamData from "@/data/team.json";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundBeams } from "@/components/ui/background-beams";
import AnoAI from "@/components/ui/animated-shader-background";
import AnimatedFolder, { Project } from "@/components/ui/3d-folder";
import { GradientButton } from "@/components/ui/gradient-button";
import { Logo } from "@/components/ui/logo";

// --- Icons (Theme Aware) ---
const Icons = {
  React: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" className="opacity-20" /><path d="M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" /><path d="M12 22a9.97 9.97 0 0 1-7.071-2.929" className="opacity-20" /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg>,
  Next: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M 12 2 C 6.4771525 2 2 6.4771525 2 12 C 2 17.522847 6.4771525 22 12 22 C 17.522847 22 22 17.522847 22 12 C 22 6.4771525 17.522847 2 12 2 z M 12 4 C 16.418278 4 20 7.581722 20 12 C 20 16.418278 16.418278 20 12 20 C 7.581722 20 4 16.418278 4 12 C 4 7.581722 7.581722 4 12 4 z M 9 8 L 9 16 L 11 16 L 11 10.828125 L 14.171875 16 L 16 16 L 16 8 L 14 8 L 14 13.171875 L 10.828125 8 L 9 8 z" fill="currentColor" /></svg>,
  Tailwind: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.177-1.194-2.538-2.576-5.513-2.576z" /></svg>,
  ArrowRight: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
  Code: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 18" /></svg>,
  Check: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  Cursor: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M13.64 21.975l-3.35-8.086-7.85-3.047a.975.975 0 01.354-1.815h.044L20.8 10.96a.975.975 0 011.026 1.403l-6.91 10.23a.975.975 0 01-1.276-.618z" /></svg>,
  GitHub: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48 3.97-1.325 6.833-5.071 6.833-9.489C22 6.477 17.522 2 12 2z" /></svg>,
  Vite: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M2 9L12 22L22 9L12 2" strokeLinejoin="round" /><path d="M12 2V22" /></svg>,
  Flutter: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l3.693 3.693 9.049-9.138-6.27-1.013zM11.55 21.223l3.693 3.791H22l-6.756-6.804-3.694 3.013z" /></svg>,
  Docker: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.928 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.184.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.953 0h2.118a.185.185 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.119a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m18.428-2.673c-.08-.07-.15-.098-.242-.098l-2.05.006-.062.002-.572.002c-.106.002-.206 0-.3.004l-.564.004c-.31.002-.533.004-.707.008l-.513.007c-.36.006-.576.01-.734.015-.71.026-1.127.058-1.46.09-.432.043-.844.116-1.225.215-.9.234-1.637.666-2.134 1.25-.492.578-.718 1.264-.654 1.983.076.853.642 1.487 1.632 1.832 0 0 .825.293 2.505.474l.115.011c.712.071 1.65.112 2.656.12.923.007 1.764-.016 2.404-.055l.138-.009c.665-.045 1.157-.107 1.488-.198.662-.18 1.154-.53 1.42-1.01.277-.5.293-1.078.046-1.67-.184-.442-.515-.76-.983-.982" /></svg>,
  TypeScript: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22,0H2C0.9,0,0,0.9,0,2v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V2C24,0.9,23.1,0,22,0z M12.8,17.4v-8h-2.2v8H8.5v-8H6.3v-1.9 h6.5V17.4z M18.2,17.4h-2.2v-1.1c-0.6,0.8-1.5,1.2-2.5,1.2c-1.9,0-2.8-1.2-2.8-3.4v-4.7l2.2,0v4.2c0,1.2,0.3,1.8,1.2,1.8 c0.9,0,1.8-0.7,1.8-2.6v-3.5h2.2V17.4z" /></svg>
};

// --- Components ---

const OrbitingCircles = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg md:h-[600px]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Center Content */}
        <div className="z-20 pointer-events-auto">
          <GradientButton onClick={onClick} className="text-base px-6 py-3 rounded-full">
            Get Started
          </GradientButton>
        </div>

        {/* Orbit 1 (Inner) */}
        <div className="absolute w-[250px] h-[250px] border border-slate-200 dark:border-white/5 rounded-full animate-[spin_20s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <Icons.Next className="w-8 h-8 text-slate-800 dark:text-white" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <span className="text-xl font-bold text-green-500">Vue</span>
          </div>
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <Icons.TypeScript className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Orbit 2 (Middle) */}
        <div className="absolute w-[450px] h-[450px] border border-slate-200 dark:border-white/10 rounded-full animate-[spin_30s_linear_infinite_reverse]">
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">C</div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <Icons.Tailwind className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
          </div>
          <div className="absolute bottom-1/4 left-[10%] bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <span className="text-xl font-bold text-orange-500">HTML</span>
          </div>
          <div className="absolute top-1/4 right-[10%] bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <Icons.Vite className="w-8 h-8 text-yellow-400 dark:text-yellow-300" />
          </div>
          <div className="absolute bottom-1/2 left-[5%] bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <Icons.Flutter className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        {/* Orbit 3 (Outer) */}
        <div className="absolute w-[650px] h-[650px] border border-slate-200 dark:border-white/5 rounded-full animate-[spin_40s_linear_infinite]">
          <div className="absolute top-[15%] right-[15%] bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <Icons.React className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold">A</div>
          </div>
          <div className="absolute top-[60%] left-[5%] bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <Icons.GitHub className="w-8 h-8 text-slate-800 dark:text-white" />
          </div>
          <div className="absolute bottom-[20%] right-[10%] bg-white dark:bg-black p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10">
            <Icons.Docker className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfiniteMarquee = ({ items, reverse = false, speed = 20 }: { items: string[], reverse?: boolean, speed?: number }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap mask-gradient w-full">
      <motion.div
        className="flex gap-8 py-4"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex-shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-slate-700 dark:text-slate-300 text-sm font-medium whitespace-nowrap hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm">
              {item.startsWith("checkbox:") ? (
                <>
                  <Icons.Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {item.replace("checkbox:", "")}
                </>
              ) : (
                item
              )}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};


const CursorButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="relative inline-block group cursor-none">
      <motion.button
        onClick={onClick}
        className="bg-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center gap-2 relative z-10 hover:bg-purple-500 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-yellow-400 text-lg">✦</span> Contact Us Now
      </motion.button>

      {/* Fake Cursor */}
      <motion.div
        className="absolute -bottom-8 -right-8 pointer-events-none z-20 hidden md:block"
        animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md mb-1 whitespace-nowrap shadow-lg">Just Click</div>
        <Icons.Cursor className="w-6 h-6 text-white drop-shadow-md -rotate-12" />
      </motion.div>
    </div>
  )
}


// --- Page ---

import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Faq } from "@/components/faq";
import { Testimonials } from "@/components/testimonials";
import { JoinTeamCta } from "@/components/join-team-cta";
// import { ProjectsCarousel } from "@/components/projects-carousel";

// ... [Keep existing imports]

import { BookCallModal } from "@/components/ui/book-call-modal";

export default function Home() {
  // const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map raw data to the Component's Project interface
  const allProjects: Project[] = projectsData.map((p) => ({
    id: p._id,
    image: p.image || "",
    title: p.title,
    description: p.description,
    link: p.link,
    // Add custom field for filtering if needed locally
    tech: p.tech
  }));

  // Filtering Logic
  const ecommerceProjects = allProjects.filter(p =>
    (p as any).tech.some((t: string) => t.toUpperCase().includes("SHOPIFY") || t.toUpperCase().includes("ECOM")) ||
    p.title.toUpperCase().includes("ECOM") ||
    p.description?.toUpperCase().includes("COMMERCE")
  );

  const webAppProjects = allProjects.filter(p =>
    (p as any).tech.some((t: string) =>
      t.toUpperCase().includes("REACT") ||
      t.toUpperCase().includes("NEXT") ||
      t.toUpperCase().includes("MERN") ||
      t.toUpperCase().includes("SUPABASE")
    )
  );

  const folders = [
    {
      title: "All Projects",
      gradient: "linear-gradient(135deg, #6366f1, #a855f7)", // Indigo to Purple
      projects: allProjects,
    },
    {
      title: "E-CommerceStore",
      gradient: "linear-gradient(135deg, #10b981, #3b82f6)", // Emerald to Blue
      projects: ecommerceProjects,
    },
    {
      title: "Web Applications",
      gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", // Amber to Red
      projects: webAppProjects,
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden transition-colors duration-300">

      {/* Backgrounds */}
      <AnoAI />
      {/* <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 animate-pulse"></div>
        <div className="absolute inset-0 dark:block hidden" style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.1
        }}></div>
        <div className="absolute inset-0 dark:hidden block" style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.05
        }}></div>
      </div> */}

      {/* Dynamic Beams */}
      <BackgroundBeams className="hidden dark:block" />

      {/* Navbar [Keep as is, just ensure cleaner code structure if needed] */}
      <nav className="fixed w-full top-0 z-50 px-4 py-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl px-6 py-3 flex justify-between items-center relative transition-colors duration-300">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Devix</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">

            <Link href="#services" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Services</Link>
            <Link href="#projects" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Projects</Link>
            <Link href="#testimonials" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Testimonials</Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Removed */}
            <GradientButton
              onClick={() => setIsBookCallOpen(true)}
              className="text-sm px-6 py-3 min-w-[unset]"
            >
              Book a call
            </GradientButton>
          </div>
        </div>
      </nav>

      <header className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden text-center z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-1.5 rounded-full shadow-lg mb-8 hover:bg-white/80 dark:hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-500">
              <Icons.Check className="w-3 h-3 text-slate-500 dark:text-slate-300" />
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">Done over <span className="font-bold text-slate-900 dark:text-white">50+</span> projects.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8"
          >
            A Dedicated Team <br /> For <FlipWords words={["Founders", "Startups", "SaaS Leaders"]} />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-4 mb-24"
          >
            <GradientButton
              onClick={() => setIsBookCallOpen(true)}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
            >
              LET'S TALK
            </GradientButton>
            <Link href="#projects" className="flex items-center gap-2 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold py-3 px-6 rounded-lg border border-slate-200 dark:border-white/10 transition-all shadow-sm">
              OUR WORK
            </Link>
          </motion.div>

          {/* Trusted By Marquee (Added) */}
          <div className="mb-24">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-widest uppercase mb-4">Trusted by innovative teams</p>
            <InfiniteMarquee speed={40} items={["Aceternity", "Webflow", "Vercel", "Stripe", "Supabase", "Linear", "Raycast", "Framer", "Prisma"]} />
          </div>

          {/* Light Speed Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-500 dark:text-slate-200 mb-2">
              Boost Sales & Conversions
            </h2>
            <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              at
              <span className="relative inline-block px-1">
                <span className="relative z-10 text-slate-900 dark:text-white">light speed</span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute inset-0 bg-purple-100 dark:bg-white/10 -z-0 border border-purple-200 dark:border-white/20 rounded-sm"
                >
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-600 dark:bg-white rounded-full shadow-[0_0_10px_white]"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-600 dark:bg-white rounded-full shadow-[0_0_10px_white]"></div>
                </motion.div>
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      <Services />

      <section className="py-24 relative">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Our Tech Stack</h2>
          <p className="text-purple-600 dark:text-purple-400 mt-2">TypeScript to build exceptional digital experiences.</p>
        </div>
        <OrbitingCircles onClick={() => setIsBookCallOpen(true)} />
      </section>

      <section id="projects" className="py-24 relative z-10">
        <div className="container mx-auto px-6 text-center max-w-7xl">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Our Work</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 mb-16">Projects that made a difference.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
            {folders.map((folder, idx) => (
              folder.projects.length > 0 && (
                <AnimatedFolder
                  key={folder.title}
                  title={folder.title}
                  projects={folder.projects}
                  gradient={folder.gradient}
                  className="w-full max-w-md"
                />
              )
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section id="team" className="py-24">
        <div className="container mx-auto px-6 text-center max-w-7xl">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16">Meet Our Team</h2>
          {/* Team grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Keep team mapping */}
            {teamData.slice(0, 2).map((member) => (
              <div key={member._id} className="bg-white dark:bg-black border border-slate-100 dark:border-white/5 rounded-3xl p-8 shadow-xl hover:border-purple-500/30 transition-all relative text-center group">
                {/* ... Keep team card details ... */}
                <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-6 left-6 bg-slate-50 dark:bg-white/5 p-2 rounded-full text-purple-600 dark:text-purple-400 border border-slate-200 dark:border-white/10 relative z-10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="w-24 h-24 mx-auto rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-4 border-4 border-white dark:border-black shadow-lg relative z-10">
                  {member.avatar && <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white relative z-10">{member.name}</h3>
                <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full mt-2 mb-8 relative z-10 border border-purple-200 dark:border-purple-500/20">
                  {member.role === "Founder" || member.role.includes("Full Stack") ? "Full Stack Developer" : member.role}
                </div>
                <div className="flex justify-center gap-6 text-xs text-slate-500 dark:text-slate-500 border-t border-slate-100 dark:border-white/5 pt-6 relative z-10">
                  <span className="flex items-center gap-1">
                    <Icons.Code className="w-3 h-3" /> Joined 2025
                  </span>
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    India
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JoinTeamCta />

      <Testimonials />

      <Faq />

      <footer className="py-24 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-12">
            If you scrolled this far, Its time to LEVEL UP
          </h2>
          <div className="mb-24">
            <CursorButton onClick={() => setIsBookCallOpen(true)} />
          </div>
          <div className="mb-12">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">Trust me we are good at this :)</p>
            <InfiniteMarquee
              items={["checkbox:Branding", "checkbox:Contact Page need to update", "checkbox:Pitch deck urgent", "checkbox:Mobile app needs polish", "checkbox:Working...", "checkbox:Branding"]}
              speed={30}
              reverse={true}
            />
          </div>
        </div>
      </footer>
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} source="page_button" />
    </div>
  );
}
