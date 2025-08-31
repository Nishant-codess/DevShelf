'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Github, Linkedin, MessageCircle, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ContactPage() {
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
              Contact Us
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
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Have questions, suggestions, or need help? We&apos;d love to hear from you! 
              Reach out to us through any of the channels below.
            </p>
          </div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Email */}
          <div className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Email
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Send us an email for general inquiries and support.
            </p>
            <a
              href="mailto:nishant.ranjan.air1@gmail.com"
              className="inline-flex items-center space-x-2 text-neon-blue hover:text-neon-blue/80 transition-colors"
            >
              <span>nishant.ranjan.air1@gmail.com</span>
              <Send className="w-4 h-4" />
            </a>
          </div>

          {/* GitHub */}
          <div className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mx-auto mb-4">
              <Github className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              GitHub
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Follow us on GitHub for updates and contribute to the project.
            </p>
            <Link
              href="https://github.com/Nishant-codess"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-neon-blue hover:text-neon-blue/80 transition-colors"
            >
              <span>@Nishant-codess</span>
              <Send className="w-4 h-4" />
            </Link>
          </div>

          {/* LinkedIn */}
          <div className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mx-auto mb-4">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              LinkedIn
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Connect with us on LinkedIn for professional networking.
            </p>
            <Link
              href="https://www.linkedin.com/in/nishant-ranjan-srmist/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-neon-blue hover:text-neon-blue/80 transition-colors"
            >
              <span>Nishant Ranjan</span>
              <Send className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🤔 Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {[
              {
                question: 'How do I create a showcase?',
                answer: 'Login with your GitHub account, select the repositories you want to showcase, and click "Create Showcase". You\'ll get a unique URL and embed code.'
              },
              {
                question: 'Is DevShelf free to use?',
                answer: 'Yes! DevShelf is completely free to use. We believe in making developer tools accessible to everyone.'
              },
              {
                question: 'Can I customize the appearance of my showcase?',
                answer: 'The widget automatically adapts to your website\'s theme. We\'re working on more customization options for future updates.'
              },
              {
                question: 'How do I embed my showcase on my website?',
                answer: 'Copy the embed code from your showcase page and paste it into your HTML. The widget will automatically load and display your projects.'
              },
              {
                question: 'Do you store my GitHub data?',
                answer: 'We only store the showcase data you create. We don\'t store any personal GitHub information beyond what\'s needed for the showcase.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-dark-accent pb-4 last:border-b-0">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Response Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            ⚡ Quick Response Time
          </h3>
          <p className="text-lg opacity-90">
            We typically respond to all inquiries within 24 hours. 
            For urgent matters, please use email for the fastest response.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Create your first showcase and start sharing your projects with the world.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 bg-neon-blue text-white rounded-xl font-semibold hover:bg-neon-blue/80 transition-colors duration-200"
          >
            Create Your Showcase
          </button>
        </motion.div>
      </div>
    </div>
  )
}
