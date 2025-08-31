'use client'

import { use, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, Eye, ExternalLink } from 'lucide-react'
import { Repository } from '@/types'
import { GitHubUser } from '@/lib/github-auth'

interface ShowcaseData {
  user: GitHubUser
  repositories: Repository[]
  createdAt: string
}

interface ShowcaseEmbedPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ShowcaseEmbedPage({ params }: ShowcaseEmbedPageProps) {
  const { id } = use(params)
  const [showcaseData, setShowcaseData] = useState<ShowcaseData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadShowcaseData = async () => {
      try {
        const response = await fetch(`/api/showcase/${id}`)
        
        if (response.ok) {
          const data = await response.json()
          setShowcaseData(data)
        } else {
          console.error('Showcase not found')
        }
      } catch (error) {
        console.error('Error loading showcase data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadShowcaseData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading showcase...</p>
        </div>
      </div>
    )
  }

  if (!showcaseData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Showcase Not Available
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This showcase has expired or is not available.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <div className="text-center">
            <img
              src={showcaseData.user.avatar_url}
              alt={showcaseData.user.name || showcaseData.user.login}
              className="w-20 h-20 rounded-full border-4 border-white dark:border-dark-accent shadow-lg mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {showcaseData.user.name || showcaseData.user.login}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">@{showcaseData.user.login}</p>
            {showcaseData.user.bio && (
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                {showcaseData.user.bio}
              </p>
            )}
            
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <div className="text-xl font-bold text-neon-blue">{showcaseData.user.public_repos}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-neon-purple">{showcaseData.user.followers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-neon-teal">{showcaseData.user.following}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Projects
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {showcaseData.repositories.length} project{showcaseData.repositories.length !== 1 ? 's' : ''} selected
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseData.repositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {repo.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {repo.description || 'No description available'}
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.language && (
                    <span className="px-2 py-1 bg-neon-blue/10 text-neon-blue rounded-full text-xs font-medium">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics && repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="px-2 py-1 bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-gray-300 rounded-full text-xs">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-4 h-4" />
                      <span>{repo.forks_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{repo.watchers_count}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    <span>View</span>
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-2 bg-neon-blue text-white rounded-lg font-medium hover:bg-neon-blue/80 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Powered by DevShelf */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Powered by{' '}
            <a 
              href="https://devshelf.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-blue hover:underline"
            >
              DevShelf
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
