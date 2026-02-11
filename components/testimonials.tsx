"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";
import { motion } from "motion/react";

const testimonials = [
    {
        text: "Devix Solutions is hands down the best web developer we've worked with. They built a stunning, high-performance website that perfectly represents our brand.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Briana Patton",
        role: "Founder, TechStart",
    },
    {
        text: "I needed a complex mobile app, and Devix delivered beyond expectations. The functionality is flawless, and the user experience is top-notch.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Bilal Ahmed",
        role: "Product Owner",
    },
    {
        text: "The UI/UX design provided by Devix Solutions is world-class. They transformed our clunky interface into something beautiful and intuitive.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Saman Malik",
        role: "Creative Director",
    },
    {
        text: "Devix made our e-commerce platform from scratch. Speed, security, and design—everything is 10/10. Truly the best web developers out there.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Omar Raza",
        role: "CEO, ShopNow",
    },
    {
        text: "They built a custom app for our logistics business that solved all our tracking issues. Highly recommended for any custom software needs.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Zainab Hussain",
        role: "Operations head",
    },
    {
        text: "I was struggling with my website's design until Devix stepped in. Their UI/UX expertise completely turned it around. It converts visitors like crazy now.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Aliza Khan",
        role: "Marketing Lead",
    },
    {
        text: "Devix Solutions are wizards at web development. Our site load time dropped to under a second, and the animations are buttery smooth.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Farhan Siddiqui",
        role: "CTO",
    },
    {
        text: "We hired them for a full app overhaul. The new interface is sleek, modern, and exactly what our users wanted. Best decision we made.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Sana Sheikh",
        role: "App Founder",
    },
    {
        text: "From concept to deployment, Devix Solutions handled our SaaS platform perfectly. Their attention to UI details set us apart from competitors.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Hassan Ali",
        role: "SaaS Entrepreneur",
    },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            <div className="container z-10 mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                            <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">Testimonials</span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center text-slate-900 dark:text-white">
                        What our users say
                    </h2>
                    <p className="text-center mt-5 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        See what our customers have to say about us. Use this section to highlight your customer's satisfaction.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
};
