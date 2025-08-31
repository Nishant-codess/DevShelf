'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, HelpCircle, Search, MessageCircle, BookOpen, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function HelpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I create my first showcase?',
          answer: 'Login with your GitHub account, select the repositories you want to showcase, and click "Create Showcase". You\'ll get a unique URL and embed code.'
        },
        {
          question: 'Is DevShelf free to use?',
          answer: 'Yes! DevShelf is completely free to use. We believe in making developer tools accessible to everyone.'
        },
        {
          question: 'What GitHub data do you access?',
          answer: 'We only access your public repositories and profile information. We never access private repositories or sensitive data.'
        }
      ]
    },
    {
      category: 'Widget & Embedding',
      questions: [
        {
          question: 'How do I embed my showcase on my website?',
          answer: 'Copy the embed code from your showcase page and paste it into your HTML. The widget will automatically load and display your projects.'
        },
        {
          question: 'Can I customize the widget appearance?',
          answer: 'The widget automatically adapts to your website\'s theme. You can also customize it with CSS using the provided CSS classes.'
        },
        {
          question: 'Does the widget work on all websites?',
          answer: 'Yes! The widget works on any website that allows JavaScript. It\'s cross-domain compatible and doesn\'t require iframes.'
        }
      ]
    },
    {
      category: 'Troubleshooting',
      questions: [
        {
          question: 'My showcase is not loading, what should I do?',
          answer: 'First, make sure you\'ve created a showcase from your dashboard. If the issue persists, try refreshing the page or contact support.'
        },
        {
          question: 'The widget shows "Showcase not found", why?',
          answer: 'This usually means the showcase data was lost due to server restart (we use in-memory storage). Create a new showcase and use the new ID.'
        },
        {
          question: 'Can I update my showcase after creating it?',
          answer: 'Currently, you need to create a new showcase to update your projects. We\'re working on an update feature for future releases.'
        }
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        {
          question: 'How do I revoke GitHub access?',
          answer: 'You can revoke DevShelf\'s access to your GitHub account from your GitHub Settings > Applications > Authorized OAuth Apps.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes, we use industry-standard security measures. We only store showcase data and never access private GitHub information.'
        },
        {
          question: 'Can I delete my showcase data?',
          answer: 'Currently, showcase data is stored in memory and will be automatically cleared when the server restarts. We\'re working on persistent storage with deletion options.'
        }
      ]
    }
  ]

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Detailed guides and API reference',
      link: '/docs'
    },
    {
      icon: MessageCircle,
      title: 'Contact Support',
      description: 'Get help from our team',
      link: '/contact'
    },
    {
      icon: Settings,
      title: 'System Status',
      description: 'Check service status',
      link: '/status'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              Help Center
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
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How can we help you?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg mb-6">
              Find answers to common questions, troubleshoot issues, and get the support you need.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-accent rounded-xl bg-white dark:bg-dark-accent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mb-4">
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {action.description}
              </p>
              <Link
                href={action.link}
                className="text-neon-blue hover:text-neon-blue/80 text-sm font-medium"
              >
                Learn more →
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Sections */}
        {filteredFAQs.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + categoryIndex * 0.1 }}
            className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {category.category}
            </h3>
            
            <div className="space-y-6">
              {category.questions.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + categoryIndex * 0.1 + index * 0.05 }}
                  className="border-b border-gray-200 dark:border-dark-accent pb-6 last:border-b-0"
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* No Results */}
        {searchQuery && filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent text-center"
          >
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try searching with different keywords or browse our categories above.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-neon-blue text-white rounded-xl font-semibold hover:bg-neon-blue/80 transition-colors duration-200"
            >
              Clear Search
            </button>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Still Need Help?
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-neon-blue rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Support
            </Link>
            <a
              href="mailto:nishant.ranjan.air1@gmail.com"
              className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200"
            >
              Send Email
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
