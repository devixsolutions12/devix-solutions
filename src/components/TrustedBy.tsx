'use client'

import { motion } from 'framer-motion'

const TrustedBy = () => {
  // Real company names for a more professional look
  const logos = [
    { id: 1, name: "Microsoft" },
    { id: 2, name: "Amazon" },
    { id: 3, name: "Google" },
    { id: 4, name: "Apple" },
    { id: 5, name: "Meta" },
    { id: 6, name: "Netflix" },
  ]

  return (
    <section className="dark-section py-16">
      <div className="container">
        <motion.h2 
          className="text-center text-2xl font-semibold mb-12 text-on-dark"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted By
        </motion.h2>
        
        <div className="overflow-hidden">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {/* First set of logos */}
            {logos.map((logo) => (
              <div 
                key={`logo1-${logo.id}`} 
                className="mx-8 flex-shrink-0 flex items-center justify-center"
                style={{ width: '150px', height: '60px' }}
              >
                <span className="text-on-dark text-xl font-bold">
                  {logo.name}
                </span>
              </div>
            ))}
            
            {/* Duplicate set for seamless looping */}
            {logos.map((logo) => (
              <div 
                key={`logo2-${logo.id}`} 
                className="mx-8 flex-shrink-0 flex items-center justify-center"
                style={{ width: '150px', height: '60px' }}
              >
                <span className="text-on-dark text-xl font-bold">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBy