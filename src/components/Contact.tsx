'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Phone, Mail, MessageCircle, Instagram, Clock } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Redirect to WhatsApp
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl
        } else {
          // Fallback to WhatsApp if redirect URL not provided
          window.location.href = 'https://wa.me/916201732186'
        }
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        })
      }
    } catch (error) {
      // Even on error, redirect to WhatsApp
      window.location.href = 'https://wa.me/916201732186'
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Number",
      value: "+91 6201732186",
      description: "Call us for immediate assistance",
      color: "from-blue-500 to-blue-600",
      action: "tel:+916201732186"
    },
    {
      icon: Mail,
      title: "Email",
      value: "solutionsdevix@gmail.com",
      description: "Send us an email",
      color: "from-green-500 to-green-600",
      action: "mailto:solutionsdevix@gmail.com"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp", 
      value: "+91 6201732186",
      description: "Chat with us on WhatsApp",
      color: "from-green-500 to-green-600",
      action: "https://wa.me/916201732186"
    },
    {
      icon: Instagram,
      title: "Instagram", 
      value: "@devixsolutions",
      description: "Follow us on Instagram",
      color: "from-cyan-500 to-cyan-600",
      action: "https://instagram.com/devixsolutions"
    }
  ]

  return (
    <section id="contact" className="bg-[#1a1a1a] py-24">
      <div className="container">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="text-[#A3E635]">Touch</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Ready to start your project? Let{`'`}s discuss your requirements and create something amazing together.
          </p>
          <div className="h-1 w-24 bg-[#A3E635] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a]">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-field">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-[#A3E635] focus:border-[#A3E635] transition-all duration-300 bg-[#2a2a2a] text-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-[#A3E635] focus:border-[#A3E635] transition-all duration-300 bg-[#2a2a2a] text-white"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-[#A3E635] focus:border-[#A3E635] transition-all duration-300 resize-none bg-[#2a2a2a] text-white"
                  placeholder="Tell us about your project requirements, timeline, and budget..."
                ></textarea>
              </div>

              {/* Status message display */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'}`}>
                  <p className={submitStatus.type === 'success' ? 'text-green-300' : 'text-red-300'}>
                    {submitStatus.message}
                  </p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-2 ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-[#A3E635] text-[#1a1a1a] shadow-lg hover:shadow-xl hover:bg-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1a1a1a]"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
            </div>
          </motion.div>

          {/* Right Column - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            <div className="bg-[#1e3a8a] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Prefer to reach out directly? Choose your preferred method of communication below.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : '_self'}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 block transition-all duration-300 hover:bg-white/20 border border-white/20 hover:border-[#A3E635]"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#A3E635] rounded-lg flex items-center justify-center shadow-md">
                        <method.icon className="text-[#1e3a8a]" size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#A3E635] transition-colors">
                          {method.title}
                        </h4>
                        <p className="text-[#A3E635] font-semibold">{method.value}</p>
                        <p className="text-sm text-gray-300">{method.description}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Response Promise */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#3a3a3a]"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-[#A3E635] rounded-full flex items-center justify-center">
                  <Clock className="text-[#1a1a1a]" size={16} />
                </div>
                <h4 className="font-bold text-[#A3E635]">Quick Response Guarantee</h4>
              </div>
              <p className="text-gray-400 text-sm">
                We understand your time is valuable. That{`'`}s why we guarantee a response to all inquiries within 24 hours, 
                often much sooner!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact