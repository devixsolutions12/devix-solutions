import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Devix Solutions | Web Development & AI Agents'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #000000, #111111)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 40,
                    }}
                >
                    {/* Logo Icon */}
                    <svg
                        width="120"
                        height="120"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ margin: '0 20px' }}
                    >
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#9333ea" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                        <path d="M35 20 L10 50 L35 80" stroke="url(#grad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M65 20 L90 50 L65 80" stroke="url(#grad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M58 10 L42 90" stroke="url(#grad)" strokeWidth="12" strokeLinecap="round" />
                    </svg>
                </div>

                <div
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #fff, #888)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontSize: 80,
                        fontWeight: 700,
                        letterSpacing: '-2px',
                        marginBottom: 20,
                        textAlign: 'center',
                    }}
                >
                    Devix Solutions
                </div>

                <div
                    style={{
                        color: '#888',
                        fontSize: 32,
                        fontWeight: 500,
                        textAlign: 'center',
                        maxWidth: 800,
                    }}
                >
                    Web Development • UI/UX Design • AI Agents
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
