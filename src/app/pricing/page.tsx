'use client'

import Header from '@/components/Header'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'

export default function PricingPage() {
  return (
    <main>
      <Header />
      <div className="pt-20">
        <Pricing />
      </div>
      <Footer />
      <FloatingContact />
    </main>
  )
}