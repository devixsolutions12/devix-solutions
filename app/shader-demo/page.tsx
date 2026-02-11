"use client";

import AnoAI from "@/components/ui/animated-shader-background";

export default function ShaderDemoPage() {
    return (
        <div className="w-full h-screen bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
                    Shader Background Demo
                </h1>
            </div>
            <AnoAI />
        </div>
    );
}
