'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, GitFork, Eye, Calendar, ExternalLink, Github, Trophy, Badge as BadgeIcon } from 'lucide-react'
import Link from 'next/link'
import { sampleRepositories } from '@/data/sampleRepos'
import { formatNumber, getTimeAgo } from '@/lib/utils'
import { Badge, Trophy as TrophyType } from '@/types'

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'activity' | 'comments'>('overview')
  
  // Find the project by ID
  const project = sampleRepositories.find(repo => repo.id.toString() === id)
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <Link href="/" className="text-neon-blue hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Mock badges and trophies for this project
  const projectBadges: Badge[] = [
    { id: '1', name: 'Rising Star', description: 'Repository with 100+ stars', icon: '⭐', color: 'blue', criteria: { type: 'stars', value: 100 } },
    { id: '2', name: 'Popular', description: 'Repository with 500+ stars', icon: '🔥', color: 'purple', criteria: { type: 'stars', value: 500 } },
    { id: '3', name: 'Active', description: 'Updated within last 30 days', icon: '⚡', color: 'green', criteria: { type: 'age', value: 30 } }
  ]

  const projectTrophies: TrophyType[] = [
    { id: '1', name: 'Code Master', description: 'Repository with 1000+ stars', icon: '👑', color: 'purple', rarity: 'epic', unlocked: project.stargazers_count >= 1000, unlockedAt: project.stargazers_count >= 1000 ? '2024-12-01' : undefined },
    { id: '2', name: 'Community Builder', description: 'Repository with 100+ forks', icon: '🌟', color: 'blue', rarity: 'rare', unlocked: project.forks_count >= 100, unlockedAt: project.forks_count >= 100 ? '2024-11-15' : undefined }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Github },
    { id: 'badges', name: 'Badges', icon: BadgeIcon },
    { id: 'activity', name: 'Activity', icon: Calendar },
    { id: 'comments', name: 'Comments', icon: Star }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose dark:prose-invert max-w-none"
            >
              <h2>About {project.name}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
              
              <h3>Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.language && (
                  <span className="px-3 py-1 bg-neon-blue/10 text-neon-blue rounded-full text-sm font-medium">
                    {project.language}
                  </span>
                )}
                {project.topics.map((topic) => (
                  <span key={topic} className="px-3 py-1 bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>

              <h3>Repository Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-dark-accent p-4 rounded-lg">
                <div>
                  <strong>Created:</strong> {new Date(project.created_at).toLocaleDateString()}
                </div>
                <div>
                  <strong>Last Updated:</strong> {new Date(project.updated_at).toLocaleDateString()}
                </div>
                <div>
                  <strong>License:</strong> {project.license?.name || 'Not specified'}
                </div>
                <div>
                  <strong>Default Branch:</strong> {project.default_branch}
                </div>
                <div>
                  <strong>Size:</strong> {formatNumber(project.size)} KB
                </div>
                <div>
                  <strong>Open Issues:</strong> {project.open_issues_count}
                </div>
              </div>

              <h3>Getting Started</h3>
              <p>To get started with this project:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <code>git clone {project.clone_url}</code>
              </pre>
            </motion.div>
          </div>
        )
      
      case 'badges':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Badges Earned
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-dark-secondary p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-accent"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {badge.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {badge.description}
                      </p>
                      <div className="inline-flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <BadgeIcon className="w-3 h-3" />
                        <span>Criteria: {badge.criteria.type} {badge.criteria.value}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )
      
      case 'activity':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  { type: 'push', message: 'Updated documentation', date: project.pushed_at, author: 'devshelf' },
                  { type: 'issue', message: 'Fixed responsive design bug', date: '2024-12-18T10:00:00Z', author: 'contributor1' },
                  { type: 'pr', message: 'Added new feature: dark mode', date: '2024-12-17T15:30:00Z', author: 'contributor2' },
                  { type: 'star', message: 'Repository starred', date: '2024-12-16T09:15:00Z', author: 'user123' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-white dark:bg-dark-secondary rounded-xl shadow-sm border border-gray-200 dark:border-dark-accent"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {activity.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white font-medium">
                        {activity.message}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        by {activity.author} • {getTimeAgo(activity.date)}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {activity.type.toUpperCase()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )
      
      case 'comments':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Comments & Discussion
              </h2>
              <div className="space-y-4">
                {[
                  { author: 'developer1', comment: 'Great project! The documentation is really clear and helpful.', date: '2024-12-19T14:30:00Z', avatar: 'D' },
                  { author: 'contributor2', comment: 'I\'ve been using this in production for months. Very stable and well-maintained.', date: '2024-12-18T16:45:00Z', avatar: 'C' },
                  { author: 'user3', comment: 'Just discovered this project. Love the clean API design!', date: '2024-12-17T11:20:00Z', avatar: 'U' }
                ].map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-dark-secondary p-4 rounded-xl shadow-sm border border-gray-200 dark:border-dark-accent"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {comment.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {comment.author}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {getTimeAgo(comment.date)}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-neon-blue hover:text-neon-blue/80 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cover Image */}
            <div className="lg:col-span-1">
              <div className="w-full h-64 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl flex items-center justify-center">
                <Github className="w-24 h-24 text-neon-blue/60" />
              </div>
            </div>

            {/* Project Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {project.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {project.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-accent rounded-lg">
                  <div className="text-2xl font-bold text-neon-blue">{formatNumber(project.stargazers_count)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Stars</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-accent rounded-lg">
                  <div className="text-2xl font-bold text-neon-purple">{formatNumber(project.forks_count)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Forks</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-accent rounded-lg">
                  <div className="text-2xl font-bold text-neon-teal">{formatNumber(project.watchers_count)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Watchers</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-accent rounded-lg">
                  <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{project.open_issues_count}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Issues</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
                >
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                </motion.a>
                
                {project.homepage && (
                  <motion.a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-neon-blue text-white rounded-xl font-semibold hover:bg-neon-blue/80 transition-colors duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <div className="border-b border-gray-200 dark:border-dark-accent">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'badges' | 'activity' | 'comments')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-neon-blue text-neon-blue'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {renderTabContent()}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
