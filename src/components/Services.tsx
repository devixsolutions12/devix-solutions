'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

const Services = () => {
  const [activeService, setActiveService] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const services = [
    { id: 1, name: "Web Dev" },
    { id: 2, name: "App Dev" },
    { id: 3, name: "UI/UX Design" },
    { id: 4, name: "SEO Optimization" },
    { id: 5, name: "E-Commerce" },
  ]

  // In a real implementation, these would be actual video sources
  const videoSources = [
    "https://example.com/video1.mp4",
    "https://example.com/video2.mp4",
    "https://example.com/video3.mp4",
    "https://example.com/video4.mp4",
    "https://example.com/video5.mp4",
  ]

  // Set ref correctly
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el
  }

  // Handle 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index]
    if (!card) return
    
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
    
    // Add glare effect
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100
    card.style.setProperty('--glare-x', `${glareX}%`)
    card.style.setProperty('--glare-y', `${glareY}%`)
  }

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index]
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      card.style.removeProperty('--glare-x')
      card.style.removeProperty('--glare-y')
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="dark-section">
      <div className="container">
        {/* Asymmetrical two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column (Video Showcase) */}
          <div className="flex items-center justify-center">
            <div 
              ref={setCardRef(0)}
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
              className="relative w-full h-96 rounded-2xl overflow-hidden tilt-card border border-[rgba(255,255,255,0.1)]"
              style={{ 
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease-out',
                background: '#222222'
              }}
            >
              {/* Video container with dark overlay for readability */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#141414]"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {services[activeService]?.name || "AI Abstract Visualization"}
                  </h3>
                  <p className="text-gray-300">
                    AI-generated abstract animation reacting to your selection
                  </p>
                </motion.div>
              </div>
              
              {/* Abstract visual element */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10"></div>
              
              {/* Glare effect */}
              <div 
                className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.8), transparent 70%)'
                }}
              ></div>
            </div>
          </div>

          {/* Right Column (Service List) */}
          <div className="flex flex-col justify-center">
            <motion.h2 
              className="text-4xl font-bold mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.h2>
            
            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeService === index 
                      ? 'bg-accent/20 border-l-4 border-accent' 
                      : 'hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveService(index)}
                  onClick={scrollToContact}
                >
                  <h3 className={`text-xl font-semibold ${
                    activeService === index ? 'text-accent' : 'text-white'
                  }`}>
                    {service.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services