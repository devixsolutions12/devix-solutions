'use client'

import { useState, useEffect } from 'react'
import Logo from './Logo'

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1a1a1a]">
      <div className="animate-pulse">
        <Logo size="lg" />
      </div>
    </div>
  )
}

export default LoadingScreen