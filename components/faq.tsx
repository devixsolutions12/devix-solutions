"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What services do you offer?",
        answer: "We specialize in web development, mobile app creation, digital marketing, and custom software development. Our team delivers modern, scalable solutions tailored to your business needs.",
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary depending on complexity. A standard website might take 2-4 weeks, while a complex web application could take 8-12 weeks. We provide a detailed timeline during our initial consultation.",
    },
    {
        question: "What's your pricing structure?",
        answer: "We offer project-based pricing to ensure transparency and no hidden costs. Our rates are competitive and reflect the quality and expertise we bring to every project. Contact us for a custom quote.",
    },
    {
        question: "Do you provide ongoing support after project completion?",
        answer: "Yes, we offer various support and maintenance packages to ensure your website or app remains secure, up-to-date, and optimized for performance.",
    },
    {
        question: "What technologies do you work with?",
        answer: "We are experts in the modern React ecosystem (Next.js, React Native), Tailwind CSS for styling, and scalable backends using Node.js, Supabase, or Firebase.",
    },
];

export const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Have Questions? <br /> We got Answers
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-slate-200 dark:border-slate-800 last:border-0"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center py-6 text-left focus:outline-none group text-slate-900 dark:text-white"
                            >
                                <span className="text-lg md:text-xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {faq.question}
                                </span>
                                <span className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                                    <svg
                                        className="w-5 h-5 text-slate-500 dark:text-slate-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-6 text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
