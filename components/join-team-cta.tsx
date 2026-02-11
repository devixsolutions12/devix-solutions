"use client";

import Link from "next/link";

export const JoinTeamCta = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-3xl p-12 md:p-20 text-center shadow-xl relative overflow-hidden group">

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-900/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 group-hover:bg-purple-500/10 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 group-hover:bg-blue-500/10 transition-colors duration-500"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                            Want to Join Our Team?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
                            We're always looking for talented people to join our growing team. If you're passionate about building great products, we'd love to hear from you.
                        </p>
                        <Link
                            href="mailto:solutionsdevix@gmail.com"
                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all transform hover:scale-105"
                        >
                            Get In Touch
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
