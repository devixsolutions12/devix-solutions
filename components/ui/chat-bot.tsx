"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, User, Bot, MoreVertical, RefreshCw, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { BookCallModal } from "./book-call-modal";

// --- Types ---
interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const SYSTEM_PROMPT = `
You are an expert Senior Sales Consultant for **Devix Solutions**.
**Your Goal:** Understand client needs and **FORCE** them to "Book a Call" to get a price.
**Critical Rules:**
1. **NEVER** give a final price. You can give a vague range if pushed (e.g. "$500+"), but immediately say "However, price depends on specific requirements. Let's precise this on a call."
2. **Collect Data:** Ask about their project (App/Web, features).
3. **Capture Info:** Once they show interest, ask for their **Gmail or WhatsApp** to "have our team contact you".
4. **Push for Call:** Your ultimate goal is to get them to click the "Book a Call" button or provide contact info. Say "I can't finalize the best market-fit price here. Please book a call with our senior engineer."
5. **Tone:** Professional, persuasive, but firm on not giving final quotes here.
`;

const LLM_API_URL = "https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQnBYbTBIZW5IcUdMVlBrT0ppeG84TjE2UlZrNTVqd29PSE0wZ05ZVFFKS2ZZZVVjY05uQ052WU1ueTg3WjBVek5WTGRXNmcwUi1jWDI1OXFLdEZuejBiR1hQUFE9PQ==";
const STORAGE_KEY = "devix_chat_history";
const SESSION_KEY = "devix_session_id";

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [isBookCallOpen, setIsBookCallOpen] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isLoaded = useRef(false);

    // Initialize Session
    useEffect(() => {
        if (typeof window !== "undefined") {
            let currentSession = localStorage.getItem(SESSION_KEY);
            if (!currentSession) {
                currentSession = crypto.randomUUID();
                localStorage.setItem(SESSION_KEY, currentSession);
                // Create session in Supabase
                supabase.from('chat_sessions').insert([{ id: currentSession }]).then();
            }
            setSessionId(currentSession);
        }
    }, []);

    // Load History
    useEffect(() => {
        if (typeof window !== "undefined" && !isLoaded.current) {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    setMessages(JSON.parse(saved));
                } catch (e) { console.error(e); }
            } else {
                setMessages([{
                    id: "welcome",
                    role: "assistant",
                    content: "Hello! I'm the Devix Solutions Agent. Looking for a website or app? I can help you find the best solution.",
                }]);
            }
            isLoaded.current = true;
        }
    }, []);

    // Save History locally & Sync to Supabase
    useEffect(() => {
        if (messages.length > 0 && isLoaded.current) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => { scrollToBottom(); }, [messages, isOpen]);

    const handleNewChat = () => {
        const newSession = crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, newSession);
        setSessionId(newSession);
        setMessages([{
            id: "welcome",
            role: "assistant",
            content: "Hello! New chat started. How can I help you today?",
        }]);
        localStorage.removeItem(STORAGE_KEY);
        supabase.from('chat_sessions').insert([{ id: newSession }]).then();
        setShowMenu(false);
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Sync User Message
        if (sessionId) {
            supabase.from('chat_messages').insert([{
                session_id: sessionId,
                role: 'user',
                content: userMessage.content
            }]).then();
        }

        try {
            const conversationText = messages.map(m => `${m.role === "user" ? "User" : "Agent"}: ${m.content}`).join("\n");
            const fullPrompt = `${SYSTEM_PROMPT}\n\nCurrent Conversation:\n${conversationText}\nUser: ${userMessage.content}\nAgent:`;

            const res = await fetch(LLM_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: fullPrompt }),
            });

            const data = await res.json();
            const reply = data.text || data.response || data.message;

            if (reply) {
                const botMsg: Message = { id: Date.now().toString(), role: "assistant", content: reply };
                setMessages((prev) => [...prev, botMsg]);

                // Sync Bot Message
                if (sessionId) {
                    supabase.from('chat_messages').insert([{
                        session_id: sessionId,
                        role: 'assistant',
                        content: reply
                    }]).then();
                }
            } else {
                throw new Error("Invalid API response");
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: "I apologize, connection error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} source="chat_button" />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-[9999] w-[350px] md:w-[400px] h-[500px] max-h-[70vh] md:h-[600px] md:max-h-[80vh] flex flex-col bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-pink-900/20 relative">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Devix Agent</h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Context Menu */}
                            <AnimatePresence>
                                {showMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute top-14 right-4 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden min-w-[150px] z-50"
                                    >
                                        <button
                                            onClick={handleNewChat}
                                            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/5 flex items-center gap-2"
                                        >
                                            <RefreshCw className="w-4 h-4" /> New Chat
                                        </button>
                                        <button
                                            onClick={() => { setIsBookCallOpen(true); setShowMenu(false); }}
                                            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/5 flex items-center gap-2 border-t border-white/10"
                                        >
                                            <Phone className="w-4 h-4 text-green-400" /> Book a Call
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" data-lenis-prevent>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                >
                                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", msg.role === "user" ? "bg-white/10" : "bg-gradient-to-br from-purple-600 to-pink-600")}>
                                        {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                    </div>
                                    <div className={cn("p-3 rounded-2xl text-sm leading-relaxed", msg.role === "user" ? "bg-white text-black rounded-tr-sm" : "bg-white/10 text-white rounded-tl-sm border border-white/5")}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 mr-auto items-center">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
                                        <Sparkles className="w-4 h-4 text-white animate-pulse" />
                                    </div>
                                    <div className="flex gap-1 px-3 py-2 bg-white/5 rounded-2xl rounded-tl-none">
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-black/50">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about web apps..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-black flex items-center justify-center shadow-2xl shadow-white/10 border border-white/20 hover:border-white/40 transition-colors"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black" />
                            <MessageSquare className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
}
