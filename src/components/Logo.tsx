'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'gap-2',
      icon: 'w-6 h-6',
      devix: 'text-sm',
      solutions: 'text-xs'
    },
    md: {
      container: 'gap-3',
      icon: 'w-8 h-8',
      devix: 'text-base',
      solutions: 'text-sm'
    },
    lg: {
      container: 'gap-4',
      icon: 'w-12 h-12',
      devix: 'text-xl',
      solutions: 'text-lg'
    }
  }

  // Fallback to 'md' size if an invalid size is provided
  const config = sizeConfig[size] || sizeConfig.md

  return (
    <div className={`flex items-center ${config.container} ${className}`}>
      {/* Icon Component - Stylized </> code symbol */}
      <motion.div 
        className={config.icon}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Left bracket < */}
          <path 
            d="M8 5L3 12L8 19" 
            stroke="#A3E635" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Right bracket > */}
          <path 
            d="M16 5L21 12L16 19" 
            stroke="#A3E635" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Forward slash / */}
          <path 
            d="M14 5L10 19" 
            stroke="#A3E635" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      
      {/* Logotype Component - "Devix Solutions" */}
      <div className="flex flex-col">
        <span className={`font-bold text-white ${config.devix}`}>Devix</span>
        <span className={`font-medium text-white ${config.solutions}`}>Solutions</span>
      </div>
    </div>
  )
}

export default Logo