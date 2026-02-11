"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MessageSquare, Phone, User, Clock, ChevronDown, ChevronUp } from "lucide-react";

export default function AdminPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [sessions, setSessions] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<"leads" | "chats">("leads");

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Check session storage
        if (typeof window !== "undefined") {
            const isAuth = sessionStorage.getItem("admin_auth");
            if (isAuth === "true") setIsAuthenticated(true);
        }

        if (isAuthenticated) {
            fetchData();
            const interval = setInterval(fetchData, 10000); // Check every 10s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "devix" && password === "devix2009") {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_auth", "true");
            setError("");
        } else {
            setError("Invalid credentials");
        }
    };

    const fetchData = async () => {
        const { data: leadsData } = await supabase
            .from("leads")
            .select("*")
            .order("created_at", { ascending: false });

        if (leadsData) setLeads(leadsData);

        const { data: sessionsData } = await supabase
            .from("chat_sessions")
            .select("*")
            .order("created_at", { ascending: false });

        if (sessionsData) setSessions(sessionsData);
    };

    const loadMessages = async (sessionId: string) => {
        if (selectedSession === sessionId) {
            setSelectedSession(null);
            setMessages([]);
            return;
        }

        const { data } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("session_id", sessionId)
            .order("created_at", { ascending: true });

        if (data) {
            setMessages(data);
            setSelectedSession(sessionId);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
                    {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Devix Admin
                </h1>
                <button
                    onClick={() => {
                        setIsAuthenticated(false);
                        sessionStorage.removeItem("admin_auth");
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                >
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab("leads")}
                    className={`px-6 py-2 rounded-xl transition-all ${activeTab === "leads"
                        ? "bg-white text-black font-bold"
                        : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                >
                    Leads ({leads.length})
                </button>
                <button
                    onClick={() => setActiveTab("chats")}
                    className={`px-6 py-2 rounded-xl transition-all ${activeTab === "chats"
                        ? "bg-white text-black font-bold"
                        : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                >
                    Chat Sessions ({sessions.length})
                </button>
            </div>

            {/* Content */}
            {activeTab === "leads" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leads.map((lead) => (
                        <div key={lead.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-green-500/20 rounded-full">
                                    <User className="text-green-500 w-6 h-6" />
                                </div>
                                <span className="text-xs text-white/40">{new Date(lead.created_at).toLocaleString()}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{lead.name || "Unknown"}</h3>
                            <p className="text-white/60 text-sm mb-4">{lead.source}</p>

                            <div className="space-y-2 text-sm text-white/80 border-t border-white/10 pt-4">
                                <p className="flex items-center gap-2"><span className="text-purple-400">Email:</span> {lead.email}</p>
                                <p className="flex items-center gap-2"><span className="text-purple-400">WhatsApp:</span> {lead.whatsapp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4 max-w-4xl">
                    {sessions.map((session) => (
                        <div key={session.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => loadMessages(session.id)}
                                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-500/20 rounded-full">
                                        <MessageSquare className="text-purple-500 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Session: {session.id.slice(0, 8)}...</h3>
                                        <p className="text-xs text-white/40">{new Date(session.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                {selectedSession === session.id ? <ChevronUp /> : <ChevronDown />}
                            </button>

                            {selectedSession === session.id && (
                                <div className="p-6 bg-black/50 border-t border-white/10 space-y-4 max-h-[500px] overflow-y-auto">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === "user"
                                                ? "bg-white text-black rounded-tr-sm"
                                                : "bg-white/10 text-white rounded-tl-sm"
                                                }`}>
                                                <p className="font-bold text-xs mb-1 opacity-50">{msg.role.toUpperCase()}</p>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {messages.length === 0 && <p className="text-center text-white/40">No messages loaded.</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
