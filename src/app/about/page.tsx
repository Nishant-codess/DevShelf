'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Github, Star, Eye, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-secondary rounded-lg transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              About DevShelf
            </h1>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Showcase Your GitHub Projects Beautifully
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              DevShelf is a modern platform that helps developers create stunning project showcases 
              from their GitHub repositories and embed them anywhere on the web.
            </p>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🎯 Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To empower developers to showcase their work in the most beautiful and professional way possible. 
              We believe every developer deserves a platform to highlight their achievements and share their 
              passion for coding with the world.
            </p>
          </div>
          
          <div className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              💡 Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To become the go-to platform for developers to create, share, and discover amazing projects. 
              We envision a world where every developer can easily showcase their work and get the recognition they deserve.
            </p>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ✨ What Makes DevShelf Special
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Github,
                title: 'GitHub Integration',
                description: 'Seamlessly sync with your GitHub repositories and always show the latest data.'
              },
              {
                icon: Star,
                title: 'Beautiful Design',
                description: 'Modern, responsive design that looks great on any device and website.'
              },
              {
                icon: Eye,
                title: 'Easy Embedding',
                description: 'Add your showcase to any website with just two lines of code.'
              }
            ].map((feature) => (
              <div key={feature.title} className="text-center p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              👨‍💻 Meet the Creator
            </h3>
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nishant Ranjan
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Full-stack developer passionate about creating tools that help developers showcase their work.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="https://github.com/Nishant-codess"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/nishant-ranjan-srmist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors"
                >
                  <span>LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Showcase Your Projects?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of developers who are already using DevShelf to showcase their work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 bg-neon-blue text-white rounded-xl font-semibold hover:bg-neon-blue/80 transition-colors duration-200"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
