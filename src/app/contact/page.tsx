'use client'

import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'

export default function ContactPage() {
  return (
    <main>
      <Header />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
      <FloatingContact />
    </main>
  )
}