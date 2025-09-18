'use client'

import Header from '@/components/Header'
import About from '@/components/About'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'

export default function AboutPage() {
  return (
    <main>
      <Header />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
      <FloatingContact />
    </main>
  )
}