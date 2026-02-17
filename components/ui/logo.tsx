import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative", className)}>
            <Image
                src="/new-logo-cropped.png"
                alt="Devix Solutions Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
};
