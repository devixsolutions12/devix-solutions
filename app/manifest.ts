import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Devix Solutions',
        short_name: 'Devix',
        description: 'Expert web & app development agency specializing in custom websites, UI/UX design, AI agents, and full-stack solutions.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#9333ea',
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
