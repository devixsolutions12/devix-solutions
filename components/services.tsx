"use client";

import { motion } from "framer-motion";

const services = [
    {
        title: "Website Development",
        description: "We build high-performance, scalable websites using the latest technologies like Next.js, React, and Tailwind CSS.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                <rect x="2" y="3" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 8l-2 2 2 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 8l2 2-2 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "App Development",
        description: "Native and cross-platform mobile applications that provide seamless user experiences on iOS and Android.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                <rect x="5" y="1" width="14" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="5" y1="5" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="5" y1="19" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="21" r="0.5" fill="currentColor" />
                <rect x="8" y="8" width="8" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <line x1="8" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                <line x1="8" y1="16" x2="11" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            </svg>
        ),
    },
    {
        title: "UI/UX Design",
        description: "User-centric design that combines aesthetics with functionality to increase engagement and conversion rates.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
                <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        title: "Strategy & Branding",
        description: "Comprehensive branding strategies that define your identity and position your business for long-term success.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "SEO & Maintenance",
        description: "Ongoing optimization and support to ensure your digital presence is always performing at its peak.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "AI Agents & Integration",
        description: "Custom AI agents and intelligent integrations that automate workflows and enhance your website with smart capabilities.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="9" cy="10" r="1.5" fill="currentColor" />
                <circle cx="15" cy="10" r="1.5" fill="currentColor" />
                <path d="M9 15c0 0 1.5 2 3 2s3-2 3-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="4" y1="12" x2="1" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="23" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
];

export const Services = () => {
    return (
        <section id="services" className="py-24 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Services We Offer
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        From updates to complete overhauls, we provide a full suite of digital solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-black p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-white/5 hover:border-purple-500/30 transition-all group hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
