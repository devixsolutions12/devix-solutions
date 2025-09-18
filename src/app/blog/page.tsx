'use client'

import Header from '@/components/Header'
import Blog from '@/components/Blog'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'

export default function BlogPage() {
  return (
    <main>
      <Header />
      <div className="pt-20">
        <Blog />
      </div>
      <Footer />
      <FloatingContact />
    </main>
  )
}