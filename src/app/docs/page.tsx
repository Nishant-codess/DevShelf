'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Code, Download, Settings, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DocsPage() {
  const router = useRouter()

  const sections = [
    {
      icon: Code,
      title: 'Getting Started',
      description: 'Learn how to create your first showcase',
      link: '#getting-started'
    },
    {
      icon: Download,
      title: 'Widget Integration',
      description: 'Embed your showcase on any website',
      link: '#widget-integration'
    },
    {
      icon: Settings,
      title: 'Customization',
      description: 'Customize the appearance of your showcase',
      link: '#customization'
    },
    {
      icon: Users,
      title: 'API Reference',
      description: 'Technical documentation for developers',
      link: '#api-reference'
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
              Documentation
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
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              DevShelf Documentation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Everything you need to know about creating, customizing, and embedding your GitHub project showcases.
            </p>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mb-4">
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {section.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {section.description}
              </p>
              <a
                href={section.link}
                className="text-neon-blue hover:text-neon-blue/80 text-sm font-medium"
              >
                Learn more →
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Getting Started Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
          id="getting-started"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🚀 Getting Started
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                1. Create Your Account
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Visit <a href="https://devshelf-nishant.vercel.app" className="text-neon-blue hover:underline">DevShelf</a> and click &quot;Login with GitHub&quot; to authenticate with your GitHub account.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                2. Select Your Repositories
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Browse through your public repositories and select the ones you want to showcase. You can select multiple repositories for a comprehensive portfolio.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                3. Generate Your Showcase
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Click &quot;Create Showcase&quot; to generate your unique showcase URL and embed code. Your showcase will be instantly available and ready to share.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Widget Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
          id="widget-integration"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🌐 Widget Integration
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Basic Integration
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Add your showcase to any website with just two lines of code:
              </p>
              <div className="bg-gray-100 dark:bg-dark-accent p-4 rounded-lg">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  {`<script src="https://devshelf-nishant.vercel.app/widget.js"></script>
<div class="devshelf-widget" data-showcase-id="YOUR_SHOWCASE_ID"></div>`}
                </code>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Features
              </h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Automatic theme detection (light/dark mode)</li>
                <li>Responsive design for all screen sizes</li>
                <li>Real-time GitHub data updates</li>
                <li>Cross-domain compatibility</li>
                <li>No iframe restrictions</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Customization Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
          id="customization"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎨 Customization
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                CSS Customization
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The widget automatically adapts to your website&apos;s theme. You can also customize it with CSS:
              </p>
              <div className="bg-gray-100 dark:bg-dark-accent p-4 rounded-lg">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  {`.devshelf-widget-container {
  max-width: 800px;
  margin: 0 auto;
}

.devshelf-showcase {
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}`}
                </code>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Available Classes
              </h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li><code className="bg-gray-100 dark:bg-dark-accent px-1 rounded">.devshelf-widget-container</code> - Main container</li>
                <li><code className="bg-gray-100 dark:bg-dark-accent px-1 rounded">.devshelf-showcase</code> - Showcase wrapper</li>
                <li><code className="bg-gray-100 dark:bg-dark-accent px-1 rounded">.devshelf-user-profile</code> - User profile section</li>
                <li><code className="bg-gray-100 dark:bg-dark-accent px-1 rounded">.devshelf-projects-grid</code> - Projects grid</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* API Reference Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
          id="api-reference"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔧 API Reference
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Showcase API
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Retrieve showcase data via our public API:
              </p>
              <div className="bg-gray-100 dark:bg-dark-accent p-4 rounded-lg">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  GET https://devshelf-nishant.vercel.app/api/showcase/[id]
                </code>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Response Format
              </h4>
              <div className="bg-gray-100 dark:bg-dark-accent p-4 rounded-lg">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  {`{
  "user": {
    "login": "username",
    "name": "User Name",
    "avatar_url": "https://...",
    "bio": "User bio",
    "public_repos": 10,
    "followers": 50,
    "following": 30
  },
  "repositories": [...],
  "createdAt": "2024-01-01T00:00:00Z"
}`}
                </code>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Need Help?
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-neon-blue rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Support
            </Link>
            <a
              href="https://github.com/Nishant-codess/DevShelf/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200"
            >
              Report Issue
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
