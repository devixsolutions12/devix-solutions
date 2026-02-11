"use client";

import { motion } from "framer-motion";
import { ProcessPillars } from "@/components/ui/process-pillars";

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "We dive deep into your business goals, target audience, and market landscape to create a solid foundation."
    },
    {
        number: "02",
        title: "Strategy",
        description: "Developing a comprehensive roadmap that aligns technology and design with your business objectives."
    },
    {
        number: "03",
        title: "Design",
        description: "Crafting intuitive and visually stunning interfaces that resonate with your users."
    },
    {
        number: "04",
        title: "Development",
        description: "Writing clean, scalable code to bring the designs to life using modern technologies."
    },
    {
        number: "05",
        title: "Testing",
        description: "Rigorous testing across devices and scenarios to ensure a bug-free experience."
    },
    {
        number: "06",
        title: "Launch",
        description: "Deploying your product to the world and providing ongoing support for growth."
    }
];

export const Process = () => {
    return (
        <section id="process" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Our Process
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        A proven methodology for delivering excellence.
                    </p>
                    <div className="flex justify-center mt-8">
                        <ProcessPillars />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0A0A0A] overflow-hidden group"
                        >
                            <span className="absolute -right-4 -top-4 text-9xl font-bold text-slate-100 dark:text-white/5 select-none transition-colors group-hover:text-purple-100 dark:group-hover:text-purple-900/10">
                                {step.number}
                            </span>
                            <div className="relative z-10">
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-6 text-sm">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
