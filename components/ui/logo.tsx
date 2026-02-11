export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
    return (
        <div className={className}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333ea" /> {/* Purple-600 */}
                        <stop offset="100%" stopColor="#ec4899" /> {/* Pink-500/Violet */}
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Left Bracket < */}
                <path
                    d="M35 25 L15 50 L35 75"
                    stroke="url(#logo-gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                    opacity="0.8"
                />
                <path
                    d="M35 25 L15 50 L35 75"
                    stroke="url(#logo-gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Right Bracket > */}
                <path
                    d="M65 25 L85 50 L65 75"
                    stroke="url(#logo-gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                    opacity="0.8"
                />
                <path
                    d="M65 25 L85 50 L65 75"
                    stroke="url(#logo-gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Slash / */}
                <path
                    d="M58 15 L42 85"
                    stroke="url(#logo-gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    opacity="0.8"
                />
                <path
                    d="M58 15 L42 85"
                    stroke="url(#logo-gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};
