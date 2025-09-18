'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

const Process = () => {
  const steps = [
    {
      id: 1,
      title: "Strategy",
      description: "We analyze your business goals and target audience to create a tailored strategy."
    },
    {
      id: 2,
      title: "Design",
      description: "Our designers create stunning visuals and user interfaces that align with your brand."
    },
    {
      id: 3,
      title: "Development",
      description: "Our developers bring the designs to life with clean, efficient, and scalable code."
    },
    {
      id: 4,
      title: "Testing",
      description: "We thoroughly test the product across devices and browsers to ensure perfection."
    }
  ]

  const lineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength()
      lineRef.current.style.strokeDasharray = `${length}`
      lineRef.current.style.strokeDashoffset = `${length}`
    }
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="dark-section">
      <div className="container">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How We Work
        </motion.h2>
        
        <div className="relative">
          {/* Wavy dotted line with drawing animation */}
          <div className="absolute top-8 left-0 right-0 h-1">
            <svg width="100%" height="100%" viewBox="0 0 1000 20" preserveAspectRatio="none">
              <motion.path 
                ref={lineRef}
                d="M0,10 C150,5 350,15 500,10 C650,5 850,15 1000,10" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                className="text-gray-400"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>
          
          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="text-center pt-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-[#141414]" size={32} />
                    </div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#141414] border-4 border-accent"></div>
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button
            onClick={scrollToContact}
            className="inline-flex items-center space-x-3 bg-accent text-[#141414] px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-white transition-all duration-300"
          >
            <span>Start Your Project</span>
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Process