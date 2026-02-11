"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const beamsRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = beamsRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const mouse = { x: width / 2, y: height / 2 };

        class Beam {
            x: number;
            y: number;
            z: number;
            color: string;
            speed: number;
            opacity: number;
            width: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.z = Math.random() * 2 + 0.5;
                this.color = `rgba(147, 51, 234, ${Math.random() * 0.5})`; // Purple based
                this.speed = Math.random() * 0.5 + 0.2;
                this.opacity = Math.random();
                this.width = Math.random() * 2;
            }

            update() {
                this.y -= this.speed * this.z;
                if (this.y < 0) {
                    this.y = height;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.width;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y - 100 * this.z); // Beam length
                ctx.stroke();
            }
        }

        const beams = Array.from({ length: 50 }, () => new Beam());

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Gradient Background
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, "rgba(0,0,0,0)");
            gradient.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            beams.forEach((beam) => {
                beam.update();
                beam.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={beamsRef}
            className={cn(
                "fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen",
                className
            )}
        />
    );
};
