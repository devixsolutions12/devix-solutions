'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { useState } from 'react'

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-8 right-8 z-50"
    >
      {/* Main Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-[#A3E635] rounded-full shadow-xl flex items-center justify-center text-[#1a1a1a] hover:shadow-2xl transition-shadow duration-300"
      >
        <Phone size={24} />
      </motion.button>

      {/* Expanded Options */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-20 right-0 space-y-4"
        >
          <motion.a
            href="tel:+916201732186"
            whileHover={{ scale: 1.05 }}
            className="block w-14 h-14 bg-[#A3E635] rounded-full shadow-xl flex items-center justify-center text-[#1a1a1a] hover:shadow-2xl transition-shadow duration-300"
          >
            <Phone size={20} />
          </motion.a>
          <motion.a
            href="https://instagram.com/devixgoa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="block w-14 h-14 bg-[#1e3a8a] rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-shadow duration-300"
          >
            <MessageCircle size={20} />
          </motion.a>
        </motion.div>
      )}
    </motion.div>
  )
}

export default FloatingContact