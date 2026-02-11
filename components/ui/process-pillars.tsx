"use client";

import { motion } from "framer-motion";

export const ProcessPillars = () => {
    const pillars = [
        { label: "Step 1", height: "h-[20%]", delay: 0 },
        { label: "Step 2", height: "h-[40%]", delay: 0.2 },
        { label: "Step 3", height: "h-[60%]", delay: 0.4 },
        { label: "Step 4", height: "h-[80%]", delay: 0.6 },
        { label: "Step 5", height: "h-[100%]", delay: 0.8 },
    ];

    return (
        <div className="flex items-end gap-4 h-52">
            {pillars.map((pillar) => (
                <div
                    key={pillar.label}
                    className="relative flex flex-col justify-end border border-slate-200 dark:border-white/10 rounded-xl h-full w-24 overflow-hidden bg-slate-50/50 dark:bg-black p-1"
                >
                    <motion.div
                        className={`w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg flex items-center justify-center ${pillar.height}`}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.8,
                            delay: pillar.delay,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        style={{ transformOrigin: "bottom" }}
                    >
                        <motion.span
                            className="text-white font-bold text-sm tracking-wide"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.3,
                                delay: pillar.delay + 0.4,
                            }}
                        >
                            {pillar.label}
                        </motion.span>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};
