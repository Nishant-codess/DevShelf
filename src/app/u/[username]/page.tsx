'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Github, ExternalLink, Star, GitFork, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'
import ParticlesBackground from '@/components/ParticlesBackground'
import ProjectCard from '@/components/ProjectCard'
import AIChatbot from '@/components/AIChatbot'
import { sampleRepositories } from '@/data/sampleRepos'
import { formatNumber, getTimeAgo } from '@/lib/utils'

interface UserShowcasePageProps {
  params: Promise<{
    username: string
  }>
}

export default function UserShowcasePage({ params }: UserShowcasePageProps) {
  const { username } = use(params)
  
  // For demo purposes, we'll use sample data
  // In a real app, this would fetch from the API based on username
  const userRepos = sampleRepositories
  const featuredRepos = userRepos.filter(repo => repo.featured)

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <ParticlesBackground />
      
      {/* Header */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-neon-blue hover:text-neon-blue/80 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              @{username}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Full-stack developer passionate about creating innovative solutions and open-source contributions.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">{userRepos.length}</div>
                <div className="text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-purple">
                  {userRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-teal">
                  {userRepos.reduce((sum, repo) => sum + repo.forks_count, 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Forks</div>
              </div>
            </div>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-dark-accent text-gray-900 dark:text-white rounded-xl font-semibold border-2 border-gray-200 dark:border-dark-accent hover:border-neon-blue transition-all duration-300 shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Showcase</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredRepos.length > 0 && (
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
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                These are the projects I'm most proud of and want to highlight
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRepos.map((repo, index) => (
                <ProjectCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
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
              All Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my complete collection of open-source projects and contributions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userRepos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-neon-blue to-neon-purple">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Like What You See?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Create your own DevShelf showcase and start building your developer brand
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-neon-blue rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Your Own Showcase
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
