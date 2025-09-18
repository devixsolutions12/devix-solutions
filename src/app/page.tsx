'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import Services from '@/components/Services'
import BridgeSection from '@/components/BridgeSection'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'
import LoadingScreen from '@/components/LoadingScreen'
import useScrollAnimation from '@/hooks/useScrollAnimation'
import { useEffect } from 'react'

export default function Home() {
  useScrollAnimation()

  return (
    <div className="min-h-screen">
      <LoadingScreen />
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <BridgeSection />
        <About />
        <Process />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  )
}