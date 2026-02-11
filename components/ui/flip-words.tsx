"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
    words,
    duration = 3000,
    className,
}: {
    words: string[];
    duration?: number;
    className?: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, duration);

        return () => clearInterval(interval);
    }, [words.length, duration]);

    return (
        <div className={cn("relative inline-block overflow-hidden px-2 h-full text-left align-top", className)}>
            <span
                key={currentIndex}
                className={cn(
                    "inline-block whitespace-nowrap font-serif italic animate-flip-in",
                    "text-purple-600 dark:text-white"
                )}
            >
                {words[currentIndex]}
            </span>
        </div>
    );
};
