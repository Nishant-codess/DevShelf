'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Star, GitFork, Eye, LogOut } from 'lucide-react'

import ProjectCard from '@/components/ProjectCard'
import AIChatbot from '@/components/AIChatbot'
import DemoModal from '@/components/DemoModal'
import { initiateGitHubLogin, isAuthenticated, removeAccessToken, getAccessToken, getAuthenticatedUser } from '@/lib/github-auth'
import { GitHubUser } from '@/lib/github-auth'

import { sampleRepositories } from '@/data/sampleRepos'

export default function HomePage() {
  const featuredRepos = sampleRepositories.filter(repo => repo.featured)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authenticated = isAuthenticated()
      setIsLoggedIn(authenticated)
      
      if (authenticated) {
        try {
          const accessToken = getAccessToken()
          if (accessToken) {
            const userData = await getAuthenticatedUser(accessToken)
            setUser(userData)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          // If there's an error, remove the invalid token
          removeAccessToken()
          setIsLoggedIn(false)
        }
      }
      
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const handleLogin = () => {
    initiateGitHubLogin()
  }

  const handleLogout = () => {
    removeAccessToken()
    // Clear user repositories from sessionStorage
    try {
      sessionStorage.removeItem('userRepositories')
    } catch (error) {
      console.error('Error clearing user repositories:', error)
    }
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <div className="relative min-h-screen">


      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Showcase Your
              <span className="block bg-gradient-to-r from-neon-blue via-neon-purple to-neon-teal bg-clip-text text-transparent">
                GitHub Projects
              </span>
              Like Never Before
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your GitHub repositories into embeddable project showcases. 
              Perfect for portfolios, developer profiles, and sharing your work on any website!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {!loading && (
              <>
                {isLoggedIn ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl"
                    >
                      <img
                        src={user?.avatar_url}
                        alt={user?.name || user?.login}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                      <span className="font-semibold">
                        Welcome, {user?.name || user?.login}!
                      </span>
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.href = '/dashboard'}
                      className="px-8 py-4 bg-white dark:bg-dark-accent text-gray-900 dark:text-white rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-dark-accent hover:border-neon-blue transition-all duration-300"
                    >
                      Go to Dashboard
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="px-6 py-4 bg-red-500 text-white rounded-xl font-semibold text-lg hover:bg-red-600 transition-all duration-300 flex items-center space-x-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogin}
                      className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                    >
                      <Github className="w-5 h-5" />
                      <span>Login with GitHub</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsDemoModalOpen(true)}
                      className="px-8 py-4 bg-white dark:bg-dark-accent text-gray-900 dark:text-white rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-dark-accent hover:border-neon-blue transition-all duration-300"
                    >
                      View Demo
                    </motion.button>
                    
                    <motion.a
                      href="/demo.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gray-100 dark:bg-dark-secondary text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-dark-accent hover:border-neon-blue transition-all duration-300"
                    >
                      Widget Demo
                    </motion.a>
                  </>
                )}
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-blue mb-2">1,250+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Showcased</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-purple mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-teal mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Views Generated</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose DevShelf?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stand out from the crowd with our unique features designed specifically for developers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Gamification',
                description: 'Earn badges and trophies based on your repository stats and activity'
              },
              {
                icon: GitFork,
                title: 'Interactive UI',
                description: 'Beautiful animations and hover effects that make your projects come alive'
              },
              {
                icon: Eye,
                title: 'AI Assistant',
                description: 'Get instant explanations and insights about any project with our AI chatbot'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white dark:bg-dark-accent rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Projects Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              See DevShelf in Action
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check out these featured projects to see how your repositories could look
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRepos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>



      {/* AI Chatbot */}
      <AIChatbot />

      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  )
}
