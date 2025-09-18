'use client'

import { motion } from 'framer-motion'
import { Target, Clock, Award, HeartHandshake, Code2, Palette, Rocket } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-[#1a1a1a]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-[#A3E635]">Devix Solutions</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We{`'`}re a team of passionate developers and designers dedicated to creating exceptional digital experiences. Our expertise spans across modern web technologies, mobile applications, and cloud solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Crafting Digital Excellence <span className="text-[#A3E635]">Since 2020</span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              At Devix Solutions, we believe that great software is built through collaboration, innovation, and attention to detail. Our approach combines cutting-edge technology with user-centered design to deliver solutions that not only meet but exceed expectations.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              We don{`'`}t just build software; we create digital experiences that drive business growth and user engagement. Our commitment to quality and innovation has made us a trusted partner for businesses across various industries.
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary">
                <Code2 className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold">Our Mission</h4>
                <p className="text-sm text-gray-400">Making professional web development accessible to all</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-[#222222] rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] shadow-lg">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 bg-secondary">
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold mb-6">
            Why Choose <span className="text-accent">Devix Solutions</span>?
          </h3>
          <p className="mb-8 leading-relaxed max-w-2xl mx-auto">
            We combine technical expertise with creative design to deliver websites that not only look amazing but also perform exceptionally well.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, rotateY: 180 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group text-center bg-[#222222] rounded-2xl p-8 shadow-lg border border-[rgba(255,255,255,0.1)] cursor-pointer"
              onClick={scrollToContact}
            >
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-secondary group-hover:scale-110 transition-transform duration-300">
                <reason.icon className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">
                {reason.title}
              </h4>
              <p className="leading-relaxed text-gray-300">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 bg-[#222222] rounded-2xl p-12 border border-[rgba(255,255,255,0.1)] shadow-lg"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4 text-white">Our Values</h3>
            <p className="max-w-2xl mx-auto text-gray-300">
              These core principles guide everything we do and shape how we work with our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, rotateY: 180 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: "easeOut"
              }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-secondary">
                <Target className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Quality First</h4>
              <p className="text-sm text-gray-300">We never compromise on quality, ensuring every project meets our high standards.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotateY: 180 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: "easeOut"
              }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-accent">
                <HeartHandshake className="text-[#141414]" size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Client-Centric</h4>
              <p className="text-sm text-gray-300">Your success is our success. We work closely with you to achieve your goals.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotateY: 180 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                ease: "easeOut"
              }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-secondary">
                <Rocket className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Innovation</h4>
              <p className="text-sm text-gray-300">We stay updated with the latest technologies and design trends.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    
  )
}

const reasons = [
  {
    icon: Target,
    title: "Affordable Pricing",
    description: "Quality websites at prices that won't break the bank. We believe great design should be accessible to everyone.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Stay ahead with contemporary, responsive designs that look great on all devices and follow latest trends.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Quick turnaround times without compromising quality. Most projects completed within 1-2 weeks.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: HeartHandshake,
    title: "Trusted Support",
    description: "Ongoing support and maintenance to ensure your website stays updated, secure, and performing well.",
    color: "from-orange-500 to-orange-600"
  }
]

const stats = [
  { number: "20+", label: "Projects Completed", icon: Code2 },
  { number: "100%", label: "Client Satisfaction", icon: Award },
  { number: "24/7", label: "Support Available", icon: HeartHandshake },
  { number: "5+", label: "Years Experience", icon: Rocket }
]

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
