"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Phone, Mail, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface BookCallModalProps {
    isOpen: boolean;
    onClose: () => void;
    source?: string;
}

export function BookCallModal({ isOpen, onClose, source = "website" }: BookCallModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { error: dbError } = await supabase
                .from("leads")
                .insert([
                    {
                        name,
                        email,
                        whatsapp,
                        source,
                        details: "Booked via pop-up form",
                    },
                ]);

            if (dbError) throw dbError;

            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                onClose();
                setName("");
                setEmail("");
                setWhatsapp("");
            }, 3000);
        } catch (err) {
            console.error("Error submitting lead:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1
            }
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
                    >
                        {/* Gradient Glow Effect */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

                        {/* Header */}
                        <div className="relative flex items-center justify-between p-6 border-b border-white/10">
                            <div>
                                <motion.h2 variants={itemVariants} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                    Book a Call
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-sm text-white/50 mt-1">
                                    Let's discuss your vision.
                                </motion.p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="relative p-6">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                                >
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-400/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                        <Send className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Request Sent!</h3>
                                    <p className="text-white/60 max-w-[200px]">Our team will review your details and trigger a response shortly.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2 pl-1">Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2 pl-1">Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all"
                                                placeholder="name@company.com"
                                            />
                                        </div>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2 pl-1">WhatsApp</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                                            <input
                                                type="tel"
                                                required
                                                value={whatsapp}
                                                onChange={(e) => setWhatsapp(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </motion.div>

                                    {error && <motion.p variants={itemVariants} className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</motion.p>}

                                    <motion.button
                                        variants={itemVariants}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 bg-black border border-white/20 rounded-xl text-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isLoading ? "Processing..." : "Secure Your Spot"}
                                            {!isLoading && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                        </span>
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
