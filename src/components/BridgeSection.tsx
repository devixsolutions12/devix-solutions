'use client'

import { motion } from 'framer-motion'

const BridgeSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative py-24">
      {/* Gradient background from dark to light */}
      <div className="absolute inset-0">
        <div className="h-1/2 bg-background-dark"></div>
        <div className="h-1/2 bg-background-light"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background-dark to-background-light"
          style={{
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 50%, black 60%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 50%, black 60%)'
          }}
        ></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 text-on-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Partnership Philosophy
          </motion.h2>
          
          <motion.p 
            className="text-xl leading-relaxed text-on-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We believe in building long-term relationships with our clients based on trust, 
            transparency, and exceptional results. Every project is a collaboration where 
            your vision meets our expertise.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <button
              onClick={scrollToContact}
              className="bg-[#A3E635] text-[#1a1a1a] px-8 py-4 rounded-lg font-semibold inline-flex items-center space-x-2 hover:bg-white transition-all duration-300"
            >
              <span>Start Your Project</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BridgeSection