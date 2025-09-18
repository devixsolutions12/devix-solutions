'use client'

import Header from '@/components/Header'
import Portfolio from '@/components/Portfolio'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'

export default function PortfolioPage() {
  return (
    <main>
      <Header />
      <div className="pt-20">
        <Portfolio />
      </div>
      <Footer />
      <FloatingContact />
    </main>
  )
}