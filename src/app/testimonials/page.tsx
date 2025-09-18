'use client'

import Header from '@/components/Header'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'

export default function TestimonialsPage() {
  return (
    <main>
      <Header />
      <div className="pt-20">
        <Testimonials />
      </div>
      <Footer />
      <FloatingContact />
    </main>
  )
}