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
  const techBadge = "bg-white dark:bg-black p-2.5 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10";
  // Counter-rotation styles to keep icons upright while parent orbits spin
  const counter1 = { animation: "spin 25s linear infinite reverse" } as React.CSSProperties;
  const counter2 = { animation: "spin 35s linear infinite" } as React.CSSProperties; // parent is reverse, so counter = normal
  const counter3 = { animation: "spin 45s linear infinite reverse" } as React.CSSProperties;
  const counter4 = { animation: "spin 55s linear infinite" } as React.CSSProperties; // parent is reverse, so counter = normal
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg md:h-[650px]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Center CTA — compact with pulse glow */}
        <div className="z-20 pointer-events-auto relative">
          <div className="absolute -inset-3 rounded-full bg-purple-500/20 animate-ping" style={{ animationDuration: '2.5s' }} />
          <div className="absolute -inset-2 rounded-full bg-purple-500/10 animate-pulse" />
          <GradientButton onClick={onClick} className="text-sm px-5 py-2.5 rounded-full relative">
            Get Started
          </GradientButton>
        </div>

        {/* Orbit 1 (Inner) — Core frameworks */}
        <div className="absolute w-[200px] h-[200px] md:w-[250px] md:h-[250px] border border-slate-200 dark:border-white/5 rounded-full animate-[spin_25s_linear_infinite]">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter1}>
            <Icons.React className="w-7 h-7 text-blue-500" />
          </div>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ${techBadge}`} style={counter1}>
            <Icons.Next className="w-7 h-7 text-slate-800 dark:text-white" />
          </div>
          <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter1}>
            <Icons.TypeScript className="w-7 h-7 text-blue-600" />
          </div>
          <div className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter1}>
            <span className="text-lg font-bold text-yellow-500">JS</span>
          </div>
        </div>

        {/* Orbit 2 — Styling & UI tools */}
        <div className="absolute w-[350px] h-[350px] md:w-[430px] md:h-[430px] border border-slate-200 dark:border-white/8 rounded-full animate-[spin_35s_linear_infinite_reverse]">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter2}>
            <Icons.Tailwind className="w-7 h-7 text-cyan-500" />
          </div>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ${techBadge}`} style={counter2}>
            <span className="text-lg font-bold text-green-500">Vue</span>
          </div>
          <div className={`absolute top-[15%] right-[5%] ${techBadge}`} style={counter2}>
            {/* Figma */}
            <svg viewBox="0 0 24 24" className="w-7 h-7"><path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z" fill="#F24E1E" /><path d="M12 2h3.5a3.5 3.5 0 010 7H12V2z" fill="#FF7262" /><path d="M12 9.5h3.5a3.5 3.5 0 010 7H12v-7z" fill="#1ABCFE" /><path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 01-7 0z" fill="#0ACF83" /><path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" fill="#A259FF" /></svg>
          </div>
          <div className={`absolute bottom-[15%] left-[5%] ${techBadge}`} style={counter2}>
            <span className="text-lg font-bold text-orange-500">HTML</span>
          </div>
          <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter2}>
            <span className="text-lg font-bold text-blue-500">CSS</span>
          </div>
          <div className={`absolute top-[15%] left-[10%] ${techBadge}`} style={counter2}>
            {/* Redux */}
            <svg viewBox="0 0 24 24" fill="#764ABC" className="w-7 h-7"><path d="M16.634 16.504c.87-.075 1.543-.818 1.5-1.713-.044-.893-.773-1.594-1.672-1.594h-.056c-.923.032-1.644.79-1.612 1.714.031.45.213.843.481 1.124-1.018 2.005-2.573 3.472-4.909 4.698-1.578.826-3.22 1.132-4.877.914-1.362-.188-2.416-.856-3.065-1.957-.942-1.59-.994-3.322-.145-5.055.606-1.247 1.533-2.17 2.125-2.6-.119-.406-.3-1.099-.375-1.604-4.584 3.322-4.11 7.82-2.741 10.08C2.478 22.1 4.36 23 6.41 23c.694 0 1.388-.094 2.081-.287 4.434-1.06 7.792-4.316 8.143-5.209zm5.255-4.345c-2.422-2.843-5.99-4.403-10.055-4.403h-.522c-.293-.587-.9-.968-1.58-.968h-.057c-.922.03-1.643.79-1.611 1.713.031.893.78 1.594 1.673 1.594h.056c.703-.024 1.318-.494 1.556-1.124h.575c2.422 0 4.715.718 6.8 2.116 1.59 1.068 2.735 2.443 3.388 4.09.556 1.25.537 2.474-.056 3.485-.89 1.527-2.39 2.37-4.39 2.37-.97 0-1.876-.227-2.514-.452-.35.314-.972.838-1.41 1.158 1.343.552 2.712.855 4.022.855 2.986 0 5.191-1.656 6.039-3.309.893-1.794.846-4.901-1.914-7.125zM6.874 18.068c.031.893.78 1.594 1.672 1.594h.057c.922-.031 1.643-.79 1.611-1.714-.031-.893-.78-1.594-1.672-1.594h-.057c-.063 0-.15 0-.225.024-1.328-2.218-1.876-4.628-1.645-7.2.169-1.941.794-3.634 1.853-5.014.878-1.152 2.573-1.714 3.695-1.752 3.175-.063 4.527 3.888 4.622 5.47l1.381.425C18.003 3.637 15.143.82 12.197.82c-2.766 0-5.322 2.008-6.325 4.965-1.381 3.966-.481 7.776 1.094 10.77-.169.238-.281.587-.262.98l.17.533z" /></svg>
          </div>
        </div>

        {/* Orbit 3 — Backend & databases */}
        <div className="absolute w-[520px] h-[520px] md:w-[620px] md:h-[620px] border border-slate-200 dark:border-white/5 rounded-full animate-[spin_45s_linear_infinite]">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter3}>
            {/* Node.js */}
            <svg viewBox="0 0 24 24" fill="#339933" className="w-7 h-7"><path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.582-.203.699-.249 1.319-.602.065-.037.15-.023.217.014l2.256 1.339a.29.29 0 00.272 0l8.795-5.076a.277.277 0 00.134-.238V6.996a.28.28 0 00-.137-.242l-8.79-5.07a.278.278 0 00-.271 0L3.075 6.754a.28.28 0 00-.138.24v10.074c0 .1.053.19.137.24l2.41 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.11.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.55L2.28 18.463a1.854 1.854 0 01-.922-1.603V6.786c0-.66.352-1.276.922-1.602l8.795-5.082a1.92 1.92 0 011.846 0l8.794 5.082c.57.326.922.943.922 1.602v10.074c0 .66-.352 1.276-.922 1.603l-8.795 5.076c-.28.163-.6.247-.922.247" /></svg>
          </div>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ${techBadge}`} style={counter3}>
            {/* MongoDB */}
            <svg viewBox="0 0 24 24" fill="#47A248" className="w-7 h-7"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z" /></svg>
          </div>
          <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter3}>
            {/* PostgreSQL */}
            <svg viewBox="0 0 24 24" fill="#336791" className="w-7 h-7"><path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.4.524 9.594 1.01 8.858.723 7.467.29 5.978.29c-1.08 0-2.294.27-3.3 1.136C.94 3.012.14 5.757.14 9.058c0 3.31 1.33 5.882 2.616 7.742.326.47.638.894.93 1.27-.2.14-.34.3-.34.52 0 1.04 1.44 1.84 2.32 2.16.18.06.4.13.63.19-.09.46-.14.95-.14 1.46 0 .95.38 1.6 1.13 1.6s1.61-.55 2.27-1.43c.7-.93 1.27-2.17 1.51-3.14.32.01.65.01.98-.01.3.99.89 2.25 1.59 3.15.66.88 1.52 1.43 2.27 1.43.75 0 1.13-.65 1.13-1.6 0-.32-.02-.65-.07-.99.94-.14 1.83-.41 2.49-.83.74-.47 1.05-1.05 1.05-1.73 0-.47-.17-.85-.44-1.13 1.75-2.09 3.29-4.97 3.29-8.21 0-1.86-.26-3.34-1.12-4.52-.58-.8-1.4-1.37-2.7-1.71a4.84 4.84 0 00-1.4-.22z" /></svg>
          </div>
          <div className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter3}>
            {/* Firebase */}
            <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#FFA000" d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771z" /><path fill="#F57C00" d="M20.11 18.365l-2.15-13.31a.541.541 0 00-.928-.206l-13.14 13.516 7.232 4.22a1.63 1.63 0 001.608 0z" /><path fill="#FFCA28" d="M13.733 7.025L11.49 2.862a.538.538 0 00-.952 0L3.89 15.672z" /></svg>
          </div>
          <div className={`absolute top-[15%] right-[8%] ${techBadge}`} style={counter3}>
            <Icons.GitHub className="w-7 h-7 text-slate-800 dark:text-white" />
          </div>
          <div className={`absolute bottom-[15%] left-[8%] ${techBadge}`} style={counter3}>
            <Icons.Docker className="w-7 h-7 text-blue-600" />
          </div>
        </div>

        {/* Orbit 4 (Outer) — Extended ecosystem */}
        <div className="absolute w-[680px] h-[680px] md:w-[800px] md:h-[800px] border border-slate-200 dark:border-white/[0.03] rounded-full animate-[spin_55s_linear_infinite_reverse]">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter4}>
            {/* Vercel */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-slate-800 dark:text-white"><path d="M24 22.525H0l12-21.05z" /></svg>
          </div>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ${techBadge}`} style={counter4}>
            {/* Supabase */}
            <svg viewBox="0 0 24 24" className="w-7 h-7"><path d="M13.7 22.3c-.4.5-1.3.2-1.3-.5V13h8.6c.9 0 1.4 1 .8 1.7L13.7 22.3z" fill="#3ECF8E" /><path d="M10.3 1.7c.4-.5 1.3-.2 1.3.5V11H3c-.9 0-1.4-1-.8-1.7l8.1-7.6z" fill="#3ECF8E" opacity=".7" /></svg>
          </div>
          <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter4}>
            {/* Python */}
            <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#306998" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.868s-.109-3.403 3.35-3.403h5.766s3.24.052 3.24-3.134V3.177S18.26 0 11.914 0zM8.708 1.836a1.052 1.052 0 110 2.104 1.052 1.052 0 010-2.104z" /><path fill="#FFD43B" d="M12.087 24c6.093 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.123s3.9.445 3.9-5.735c0-6.18-3.404-5.96-3.404-5.96h-2.03v2.868s.11 3.403-3.349 3.403H9.454s-3.24-.052-3.24 3.134v5.347S5.74 24 12.087 24zm3.206-1.836a1.052 1.052 0 110-2.104 1.052 1.052 0 010 2.104z" /></svg>
          </div>
          <div className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 ${techBadge}`} style={counter4}>
            {/* GraphQL */}
            <svg viewBox="0 0 24 24" fill="#E10098" className="w-7 h-7"><path d="M12.002 0a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm8.54 4.931a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm0 9.862a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm-17.08 0a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm0-9.862a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm8.54 14.793a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zM5.55 5.945l-1.12.649 9.59 16.612 1.12-.649zM18.57 5.945l-12.14 7.01 1.12 1.94 12.14-7.01zM3.463 9.138v14.024h1.296V9.138zm15.778 0v14.024h1.296V9.138zM5.55 18.055l12.14 7.01 1.12-1.94-12.14-7.01z" /></svg>
          </div>
          <div className={`absolute top-[12%] right-[15%] ${techBadge}`} style={counter4}>
            {/* AWS */}
            <svg viewBox="0 0 24 24" fill="#FF9900" className="w-7 h-7"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.055.127.055.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.374 6.18 6.18 0 01-.248-.467c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.256-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.489.489 0 01-.127.024c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.152c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.424.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.751-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296z" /></svg>
          </div>
          <div className={`absolute bottom-[12%] left-[15%] ${techBadge}`} style={counter4}>
            <Icons.Flutter className="w-7 h-7 text-cyan-400" />
          </div>
          <div className={`absolute top-[12%] left-[15%] ${techBadge}`} style={counter4}>
            {/* Prisma */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-slate-700 dark:text-white"><path d="M21.807 18.285L13.553.757a1.324 1.324 0 00-1.129-.755 1.31 1.31 0 00-1.206.626l-8.952 14.5a1.356 1.356 0 00.016 1.455l4.756 7.44a1.356 1.356 0 001.134.624 1.38 1.38 0 00.291-.032l12.36-2.974a1.356 1.356 0 00.984-1.356zM16.63 17.548l-7.545 1.834a.453.453 0 01-.553-.577l5.078-14.634a.452.452 0 01.858-.057l3.648 11.036a1.2 1.2 0 01-.487 1.398z" /></svg>
          </div>
          <div className={`absolute bottom-[12%] right-[15%] ${techBadge}`} style={counter4}>
            {/* Svelte */}
            <svg viewBox="0 0 24 24" fill="#FF3E00" className="w-7 h-7"><path d="M20.684 3.313C18.642.68 15.079-.324 12.1.745L6.951 2.88a7.25 7.25 0 00-3.898 3.504 7.587 7.587 0 00-.588 4.14 7.258 7.258 0 00-1.075 2.7 7.665 7.665 0 001.104 5.763c2.042 2.634 5.604 3.637 8.584 2.57l5.148-2.137a7.25 7.25 0 003.899-3.504 7.587 7.587 0 00.588-4.14 7.26 7.26 0 001.075-2.7 7.665 7.665 0 00-1.104-5.763z" /></svg>
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
          <div className="flex items-center gap-2 leading-none">
            <div className="flex items-center justify-center">
              <Logo className="w-8 h-8 block translate-y-px" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Devix Solutions
            </span>
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

      <section id="tech-stack" className="py-24 relative">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Our Tech Stack</h2>
          <p className="text-purple-600 dark:text-purple-400 mt-2 max-w-xl mx-auto">We leverage 20+ modern technologies across frontend, backend, databases, cloud, and DevOps to deliver production-grade solutions.</p>
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
