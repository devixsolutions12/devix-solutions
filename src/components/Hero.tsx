'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import Logo from './Logo'

const Hero = () => {
  const [animatedValues, setAnimatedValues] = useState({
    websites: 0,
    performance: 0,
    price: 0
  })

  // Animate the metric cards on load
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimatedValues(prev => ({ ...prev, websites: 20 }))
    }, 500)
    
    const timer2 = setTimeout(() => {
      setAnimatedValues(prev => ({ ...prev, performance: 100 }))
    }, 700)
    
    const timer3 = setTimeout(() => {
      setAnimatedValues(prev => ({ ...prev, price: 5 }))
    }, 900)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const stats = [
    { 
      number: animatedValues.websites, 
      label: 'Websites', 
      suffix: '+', 
      background: 'bg-[#333333]' 
    },
    { 
      number: animatedValues.performance, 
      label: 'Fast & Secure', 
      suffix: '%', 
      background: 'bg-[#B94A48]' 
    },
    { 
      number: animatedValues.price, 
      label: 'Starting Price', 
      prefix: '₹', 
      suffix: 'k+', 
      background: 'bg-[#D16C87]' 
    }
  ]

  return (
    <section className="dark-section min-h-screen flex items-center">
      <div className="container">
        {/* Asymmetrical Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 w-full">
          {/* Left Column (Text Content) */}
          <div className="flex flex-col justify-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-on-dark"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Logo size="lg" />
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 text-on-dark font-normal leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Crafting Modern Websites at Affordable Prices
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary text-lg font-bold"
                onClick={scrollToContact}
              >
                Get Your Website Today
                <ArrowRight size={20} className="ml-2" />
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="text-on-dark text-lg font-normal hover:text-accent transition-colors duration-300 cursor-pointer"
                onClick={scrollToContact}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column (Metric Cards) */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-5 w-full max-w-md">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`rounded-2xl p-8 ${stat.background}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {stat.prefix}
                        {stat.number}
                        {stat.suffix}
                      </h3>
                      <p className="text-white text-base font-normal">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero