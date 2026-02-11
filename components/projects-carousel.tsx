"use client";

import Link from "next/link";
import projectsData from "@/data/projects.json";
import { motion } from "framer-motion";

// Theme aware icons repeated here or imported if we had a shared icon file. 
// For speed, just re-defining simple icons used in this component.
const Icons = {
    ArrowRight: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
    Code: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 18" /></svg>,
};

// Define StatsCard component for reuse
const StatsCard = () => (
    <div className="w-[85vw] md:w-[400px] flex-shrink-0 bg-white dark:bg-[#0A0A0A] p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-white/5 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full"></div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">$100,000+ Saved for Brands</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">so they can reinvest where it matters the most</p>
        <div className="relative h-32 w-full mt-auto">
            <div className="absolute bottom-0 w-full text-right text-green-500 text-xs font-semibold mb-1">Savings (This Month)</div>
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path d="M0 40 L0 35 C10 35 15 10 30 15 C45 20 50 35 60 25 C70 15 80 5 100 20 L100 40 Z" fill="url(#gradient-carousel)" opacity="0.2" />
                <path d="M0 35 C10 35 15 10 30 15 C45 20 50 35 60 25 C70 15 80 5 100 20" fill="none" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="1 1" />
                <defs>
                    <linearGradient id="gradient-carousel" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    </div>
);

export const ProjectsCarousel = () => {
    return (
        <section id="projects" className="py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Our Work</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Projects that made a difference.</p>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="flex mask-gradient-horizontal">
                    <motion.div
                        className="flex gap-8 pr-8"
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 60, // Slower duration for better readability
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {/* First Set */}
                        {projectsData.map((project, index) => (
                            <Link
                                href={project.link || "#"}
                                key={`set1-${project._id}`}
                                target="_blank"
                                className="w-[85vw] md:w-[600px] flex-shrink-0 bg-white dark:bg-[#0A0A0A] p-4 rounded-3xl shadow-xl border border-slate-100 dark:border-white/5 hover:border-purple-500/30 transition-all group block md:hover:-translate-y-2 duration-300"
                            >
                                <div className="bg-slate-100 dark:bg-[#111] rounded-2xl overflow-hidden aspect-[16/10] relative mb-6">
                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse absolute inset-0 -z-10"></div>
                                    {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-80 group-hover:opacity-100" />}
                                    <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/60 backdrop-blur rounded-full w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Icons.ArrowRight className="w-4 h-4 text-slate-900 dark:text-white -rotate-45" />
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                            <Icons.Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 mb-4 ml-14 line-clamp-2">{project.description}</p>
                                </div>
                            </Link>
                        ))}
                        <StatsCard />

                        {/* Second Set (Duplicate) */}
                        {projectsData.map((project, index) => (
                            <Link
                                href={project.link || "#"}
                                key={`set2-${project._id}`}
                                target="_blank"
                                className="w-[85vw] md:w-[600px] flex-shrink-0 bg-white dark:bg-[#0A0A0A] p-4 rounded-3xl shadow-xl border border-slate-100 dark:border-white/5 hover:border-purple-500/30 transition-all group block md:hover:-translate-y-2 duration-300"
                            >
                                <div className="bg-slate-100 dark:bg-[#111] rounded-2xl overflow-hidden aspect-[16/10] relative mb-6">
                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse absolute inset-0 -z-10"></div>
                                    {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-80 group-hover:opacity-100" />}
                                    <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/60 backdrop-blur rounded-full w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Icons.ArrowRight className="w-4 h-4 text-slate-900 dark:text-white -rotate-45" />
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                            <Icons.Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 mb-4 ml-14 line-clamp-2">{project.description}</p>
                                </div>
                            </Link>
                        ))}
                        <StatsCard />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
