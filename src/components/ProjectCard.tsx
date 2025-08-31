'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, GitFork, Eye, Calendar, ExternalLink, Github } from 'lucide-react'
import { Repository } from '@/types'
import { formatNumber, getTimeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  repo: Repository
  index: number
}

export default function ProjectCard({ repo, index }: ProjectCardProps) {
  const getBadgeColor = (stars: number) => {
    if (stars >= 1000) return 'from-yellow-400 to-yellow-600'
    if (stars >= 500) return 'from-purple-400 to-purple-600'
    if (stars >= 100) return 'from-blue-400 to-blue-600'
    if (stars >= 50) return 'from-green-400 to-green-600'
    return 'from-gray-400 to-gray-600'
  }

  const getBadgeText = (stars: number) => {
    if (stars >= 1000) return '🔥 Hot'
    if (stars >= 500) return '⭐ Popular'
    if (stars >= 100) return '🚀 Rising'
    if (stars >= 50) return '💫 Promising'
    return '🆕 New'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group relative bg-white/80 dark:bg-dark-accent/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-dark-secondary/20 hover:border-neon-blue/30 dark:hover:border-neon-blue/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-neon-blue/20"
    >
      {/* Badge */}
      <div className="absolute -top-3 -right-3">
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r",
          getBadgeColor(repo.stargazers_count)
        )}>
          {getBadgeText(repo.stargazers_count)}
        </div>
      </div>

      {/* Cover Image Placeholder */}
      <div className="w-full h-32 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl mb-4 flex items-center justify-center">
        <Github className="w-12 h-12 text-neon-blue/60" />
      </div>

      {/* Repository Info */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-neon-blue transition-colors duration-200">
          {repo.name}
        </h3>
        
        {repo.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {repo.description}
          </p>
        )}

        {/* Language and Topics */}
        <div className="flex flex-wrap gap-2">
          {repo.language && (
            <span className="px-2 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full">
              {repo.language}
            </span>
          )}
          {repo.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="px-2 py-1 bg-gray-100 dark:bg-dark-secondary text-gray-600 dark:text-gray-300 text-xs rounded-full">
              {topic}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{formatNumber(repo.stargazers_count)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="w-4 h-4" />
              <span>{formatNumber(repo.forks_count)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(repo.watchers_count)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{getTimeAgo(repo.updated_at)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Link href={`/project/${repo.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors duration-200"
            >
              <Eye className="w-4 h-4" />
              <span>Details</span>
            </motion.button>
          </Link>
          
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
          </motion.a>
          
          {repo.homepage && (
            <motion.a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
