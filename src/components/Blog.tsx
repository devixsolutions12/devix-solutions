'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, User } from 'lucide-react'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to progressive web apps.",
      date: "March 15, 2024",
      author: "Devix Team",
      readTime: "5 min read",
      image: "/api/placeholder/600/400"
    },
    {
      id: 2,
      title: "Optimizing Website Performance: A Developer's Guide",
      excerpt: "Learn proven techniques to boost your website's loading speed and overall performance, enhancing user experience and SEO rankings.",
      date: "March 10, 2024",
      author: "Devix Team",
      readTime: "7 min read",
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "Building Accessible Websites: Best Practices for Inclusivity",
      excerpt: "Discover how to create websites that are accessible to all users, including those with disabilities, following WCAG guidelines and inclusive design principles.",
      date: "March 5, 2024",
      author: "Devix Team",
      readTime: "6 min read",
      image: "/api/placeholder/600/400"
    }
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="blog" className="dark-section">
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
            Latest <span className="text-[#A3E635]">Insights</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Stay updated with the latest trends, tips, and insights in web development and digital design.
          </p>
          <div className="h-1 w-24 bg-[#A3E635] mx-auto rounded-full"></div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-lg border border-[#3a3a3a] group card-hover"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-[#1e3a8a] to-[#A3E635] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#A3E635] bg-[#A3E635]/10 px-3 py-1 rounded-full">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A3E635] transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center space-x-2 text-[#A3E635] font-medium group-hover:text-white cursor-pointer"
                  onClick={scrollToContact}
                >
                  <span>Read More</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-[#2a2a2a] rounded-2xl p-8 shadow-lg border border-[#3a3a3a] max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              More Content Coming Soon!
            </h3>
            <p className="text-gray-300 mb-8">
              We{`'`}re working on bringing you more valuable insights, tutorials, and industry updates. 
              Stay tuned for expert tips on web development, design trends, and business growth strategies.
            </p>
            <button
              onClick={scrollToContact}
              className="bg-[#A3E635] text-[#1a1a1a] px-6 py-3 rounded-full font-semibold btn-hover inline-flex items-center space-x-2 hover:bg-white cursor-pointer"
            >
              <span>Subscribe for Updates</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog