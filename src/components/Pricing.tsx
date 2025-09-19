'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "₹5999",
      description: "Perfect for small businesses and startups",
      popular: false,
      buttonText: "Get Started",
      features: [
        "Up to 5 Pages",
        "Responsive Design",
        "Basic SEO Setup",
        "Contact Form",
        "1 Month Support",
        "Basic Security"
      ]
    },
    {
      id: 2,
      name: "Professional",
      price: "₹15999",
      description: "Ideal for growing businesses",
      popular: true,
      buttonText: "Choose Plan",
      features: [
        "Up to 10 Pages",
        "Responsive Design",
        "Advanced SEO",
        "Contact Form + Newsletter",
        "3 Months Support",
        "Enhanced Security",
        "Performance Optimization",
        "Social Media Integration"
      ]
    },
    {
      id: 3,
      name: "Enterprise",
      price: "₹34999",
      description: "For large businesses with complex needs",
      popular: false,
      buttonText: "Get Quote",
      features: [
        "Unlimited Pages",
        "Responsive Design",
        "Premium SEO Package",
        "Advanced Forms",
        "6 Months Support",
        "Enterprise Security",
        "Performance Optimization",
        "E-commerce Integration",
        "Custom Functionality",
        "Analytics Setup"
      ]
    }
  ]

  const addOns = [
    { name: "Blog Integration", price: "+₹5k" },
    { name: "Multilingual", price: "+₹8k" },
    { name: "E-commerce", price: "+₹15k" },
    { name: "Custom Forms", price: "+₹3k" },
    { name: "Advanced SEO", price: "+₹7k" },
    { name: "Maintenance", price: "+₹2k/month" }
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" className="dark-section">
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
            Simple, <span className="text-[#A3E635]">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Choose the perfect plan for your business. All plans include our core features 
            with options to customize based on your specific needs.
          </p>
          <div className="h-1 w-24 bg-[#A3E635] mx-auto rounded-full"></div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }} // Increased delay for smoother stagger
              className={`bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a] shadow-lg relative overflow-hidden card-hover ${
                plan.popular ? 'ring-2 ring-[#A3E635] transform scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#A3E635] text-[#1a1a1a] px-6 py-1 rounded-bl-lg font-bold text-sm">
                  MOST POPULAR
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-[#A3E635]' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <div className="text-4xl font-bold text-[#A3E635]">{plan.price}</div>
                  <span className="text-gray-400">one-time payment</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className={`w-5 h-5 bg-[#A3E635] rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Check className="text-[#1a1a1a]" size={12} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={scrollToContact}
                className={`w-full py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? 'bg-[#A3E635] text-[#1a1a1a] hover:bg-white'
                    : 'bg-[#1e3a8a] text-white hover:bg-[#A3E635] hover:text-[#1a1a1a]'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-[#2a2a2a] rounded-2xl p-8 mb-20 border border-[#3a3a3a]"
        >
          <h3 className="text-2xl font-bold text-center text-white mb-6">
            Popular <span className="text-[#A3E635]">Add-ons</span>
          </h3>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Enhance your website with these additional features and functionalities
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }} // Increased delay for smoother stagger
                className="bg-[#3a3a3a] rounded-xl p-4 text-center shadow-md card-hover border border-[#4a4a4a]"
              >
                <div className="text-lg font-bold text-[#A3E635] mb-1">{addon.price}</div>
                <div className="text-sm text-gray-300">{addon.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section with Improved Text Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a]">
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions About Pricing?
            </h3>
            <p className="text-white mb-8 max-w-2xl mx-auto font-semibold">
              We{`'`}re here to help you choose the right plan for your business. 
              Get a free consultation and personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="bg-[#A3E635] text-[#1a1a1a] px-8 py-3 rounded-full font-semibold inline-flex items-center justify-center space-x-2 hover:bg-white transition-all duration-300 cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={scrollToContact}
                className="bg-[#1e3a8a] text-white px-8 py-3 rounded-full font-semibold border-2 border-[#3a3a3a] hover:border-[#A3E635] hover:text-[#A3E635] transition-all duration-300 cursor-pointer"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing