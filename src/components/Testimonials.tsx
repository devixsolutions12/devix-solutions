'use client'

import { motion } from 'framer-motion'
import { Star, Quote, Play, ArrowRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })
  
  const [showVideo, setShowVideo] = useState(false)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Founder, TechStart",
      company: "TechStart Solutions",
      content: "Devix Solutions transformed our online presence completely. The website they built for us is not only beautiful but also incredibly functional. Our conversion rates increased by 150% within the first month!",
      rating: 5,
      image: "/api/placeholder/80/80",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO, GreenTech",
      company: "GreenTech Innovations",
      content: "Working with Devix Solutions was a game-changer for our business. They delivered a stunning e-commerce platform on time and within budget. The ongoing support has been exceptional.",
      rating: 5,
      image: "/api/placeholder/80/80",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Creative Director",
      company: "Design Studio Pro",
      content: "The portfolio website Devix Solutions created for us perfectly captures our brand essence. The animations and user experience are top-notch. We've received numerous compliments from clients!",
      rating: 5,
      image: "/api/placeholder/80/80",
      color: "from-pink-500 to-orange-600"
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? 'text-accent fill-current' : 'text-gray-600'}`}
      />
    ))
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="testimonials" className="dark-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-accent">Clients Say</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Don{`'`}t just take our word for it. Here{`'`}s what our satisfied clients have to say about working with us.
          </p>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full"></div>
        </motion.div>

        {/* Video Testimonial with Parallax Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-[#222222] rounded-2xl overflow-hidden shadow-lg border border-[rgba(255,255,255,0.1)]">
            {!showVideo ? (
              <div 
                className="relative h-96 flex items-center justify-center cursor-pointer group"
                onClick={() => setShowVideo(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10"></div>
                <div className="relative z-10 text-center">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-6 cursor-pointer group-hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="text-[#141414]" size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Client Success Story</h3>
                  <p className="text-gray-300">Watch our client testimonial video</p>
                </div>
              </div>
            ) : (
              <div className="relative h-96 bg-black flex items-center justify-center">
                {/* In a real implementation, this would be an actual video player */}
                <div className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <Play className="text-[#141414]" size={24} />
                  </div>
                  <p>Video Player Placeholder</p>
                  <p className="text-sm text-gray-400 mt-2">In a real implementation, this would show a client testimonial video</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Testimonials Grid with Parallax Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ 
                opacity: 0, 
                x: index === 0 ? -100 : index === 2 ? 100 : 0,
                y: index === 1 ? 50 : 0
              }}
              animate={inView ? { 
                opacity: 1, 
                x: 0, 
                y: 0 
              } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              className="group relative bg-[#222222] rounded-2xl p-8 shadow-lg border border-[rgba(255,255,255,0.1)]"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Quote className="text-white" size={20} />
                </div>
                <div className="flex space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                {`"`}{testimonial.content}{`"`}
              </p>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold group-hover:text-accent transition-colors text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-400">{testimonial.position}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-[#222222] rounded-2xl p-8 shadow-lg border border-[rgba(255,255,255,0.1)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-gray-400 text-sm">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">20+</div>
              <div className="text-gray-400 text-sm">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">5.0</div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Support Available</div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button
            onClick={scrollToContact}
            className="inline-flex items-center space-x-3 bg-accent text-[#141414] px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-white transition-all duration-300"
          >
            <span>Get Your Project Started</span>
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials