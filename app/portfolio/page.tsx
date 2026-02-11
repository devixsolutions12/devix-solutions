"use client";

import React, { useEffect } from "react";
import AnimatedFolder, { Project } from "@/components/ui/3d-folder";
import projectsData from "@/data/projects.json";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function PortfolioPage() {

    // Map raw data to the Component's Project interface
    const allProjects: Project[] = projectsData.map((p) => ({
        id: p._id,
        image: p.image || "",
        title: p.title,
        description: p.description,
        link: p.link,
        // Add custom field for filtering if needed locally
        tech: p.tech
    }));

    // Filtering Logic
    const ecommerceProjects = allProjects.filter(p =>
        (p as any).tech.some((t: string) => t.toUpperCase().includes("SHOPIFY") || t.toUpperCase().includes("ECOM")) ||
        p.title.toUpperCase().includes("ECOM") ||
        p.description?.toUpperCase().includes("COMMERCE")
    );

    const webAppProjects = allProjects.filter(p =>
        (p as any).tech.some((t: string) =>
            t.toUpperCase().includes("REACT") ||
            t.toUpperCase().includes("NEXT") ||
            t.toUpperCase().includes("MERN") ||
            t.toUpperCase().includes("SUPABASE")
        )
    );

    const websiteProjects = allProjects.filter(p => !ecommerceProjects.includes(p) && !webAppProjects.includes(p));

    const folders = [
        {
            title: "All Projects",
            gradient: "linear-gradient(135deg, #6366f1, #a855f7)", // Indigo to Purple
            projects: allProjects,
        },
        {
            title: "E-CommerceStore",
            gradient: "linear-gradient(135deg, #10b981, #3b82f6)", // Emerald to Blue
            projects: ecommerceProjects,
        },
        {
            title: "Web Applications",
            gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", // Amber to Red
            projects: webAppProjects,
        },
    ];

    return (
        <main className="min-h-screen bg-neutral-950 text-white relative flex flex-col items-center justify-center p-8 overflow-hidden">
            <BackgroundBeams className="opacity-40" />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                        Project Archives
                    </h1>
                    <p className="mt-4 text-neutral-400 max-w-lg mx-auto">
                        Explore our diverse portfolio of digital solutions, varying from high-performance e-commerce stores to complex web applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
                    {folders.map((folder, idx) => (
                        folder.projects.length > 0 && (
                            <AnimatedFolder
                                key={folder.title}
                                title={folder.title}
                                projects={folder.projects}
                                gradient={folder.gradient}
                                className="w-full max-w-md"
                            />
                        )
                    ))}
                </div>
            </div>
        </main>
    );
}
