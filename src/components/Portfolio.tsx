'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState, useRef } from 'react'
import Image from 'next/image'

const Portfolio = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "E-Commerce",
      description: "Modern e-commerce solution with secure payment integration and inventory management",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      id: 2,
      title: "Portfolio Website",
      category: "Portfolio",
      description: "Creative portfolio showcasing work with stunning animations and interactive elements", 
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      technologies: ["Next.js", "Framer Motion", "Tailwind"]
    },
    {
      id: 3,
      title: "Business Website",
      category: "Business",
      description: "Professional business presence with lead generation and customer engagement features",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      technologies: ["WordPress", "PHP", "MySQL"]
    },
    {
      id: 4,
      title: "Restaurant App",
      category: "E-Commerce",
      description: "Complete dining solution with online ordering, reservations, and loyalty programs",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      technologies: ["React Native", "Firebase", "Stripe"]
    },
    {
      id: 5,
      title: "Agency Portfolio",
      category: "Portfolio",
      description: "Digital agency showcase featuring case studies and client testimonials",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      technologies: ["Vue.js", "Nuxt.js", "GSAP"]
    },
    {
      id: 6,
      title: "Corporate Site",
      category: "Business",
      description: "Enterprise-level corporate website with advanced CMS and multi-language support",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      technologies: ["React", "TypeScript", "Sanity CMS"]
    }
  ]

  const categories = ["All", "E-Commerce", "Portfolio", "Business"]
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

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
  }

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index]
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="portfolio" className="dark-section">
      <div className="container">
        {/* Section Header - Clean Design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Portfolio
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full mb-8"></div>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our latest projects and see how we bring ideas to life with cutting-edge technology
          </p>
        </motion.div>

        {/* Modern Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-accent text-[#141414] shadow-lg'
                  : 'bg-[#2a2a2a] text-white border border-[rgba(255,255,255,0.1)] hover:bg-accent hover:text-[#141414]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Cards - AI Visual Design */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={setCardRef(index)}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }} // Increased delay for smoother stagger
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="bg-[#222222] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-[rgba(255,255,255,0.1)] tilt-card"
            >
              {/* AI Image Section - Top 70% */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Content Section - Bottom 30% with White Background */}
              <div className="bg-[#222222] p-8 h-auto min-h-[160px] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-[#2a2a2a] text-accent text-xs rounded-full font-medium border border-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* View Details Link in Gold */}
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-accent text-sm font-semibold hover:text-white transition-colors group-hover:underline inline-flex items-center gap-1 mt-auto cursor-pointer"
                  onClick={scrollToContact}
                >
                  View Details 
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-24"
        >
          <div className="bg-secondary rounded-2xl p-12 shadow-xl max-w-4xl mx-auto border border-[rgba(255,255,255,0.1)]">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Like What You See?
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-semibold text-white">
              Ready to bring your vision to life? Let{`'`}s create something amazing together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="inline-flex items-center space-x-3 bg-accent text-[#141414] px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-white transition-all duration-300"
            >
              <span>Start Your Project</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio