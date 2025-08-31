'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Upload, 
  Eye, 
  EyeOff, 
  Star, 
  GitFork, 
  Calendar,
  Search
} from 'lucide-react'
import { sampleRepositories } from '@/data/sampleRepos'
import { Repository, Badge as BadgeType, Trophy as TrophyType } from '@/types'
import { formatNumber, getTimeAgo } from '@/lib/utils'

export default function DashboardPage() {
  const [repos, setRepos] = useState<Repository[]>(sampleRepositories)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [sortBy, setSortBy] = useState<'stars' | 'forks' | 'updated' | 'created'>('stars')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Mock badges and trophies
  const badges: BadgeType[] = [
    { id: '1', name: 'Rising Star', description: 'Repository with 100+ stars', icon: '⭐', color: 'blue', criteria: { type: 'stars', value: 100 } },
    { id: '2', name: 'Popular', description: 'Repository with 500+ stars', icon: '🔥', color: 'purple', criteria: { type: 'stars', value: 500 } },
    { id: '3', name: 'Active', description: 'Updated within last 30 days', icon: '⚡', color: 'green', criteria: { type: 'age', value: 30 } }
  ]

  const trophies: TrophyType[] = [
    { id: '1', name: 'Open Source Hero', description: 'Contributed to 10+ repositories', icon: '🏆', color: 'gold', rarity: 'legendary', unlocked: true, unlockedAt: '2024-12-01' },
    { id: '2', name: 'Code Master', description: 'Repository with 1000+ stars', icon: '👑', color: 'purple', rarity: 'epic', unlocked: true, unlockedAt: '2024-11-15' },
    { id: '3', name: 'Community Builder', description: 'Repository with 100+ forks', icon: '🌟', color: 'blue', rarity: 'rare', unlocked: false }
  ]

  const filteredRepos = repos
    .filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLanguage === '' || repo.language === selectedLanguage)
    )
    .sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (sortBy) {
        case 'stars':
          aValue = a.stargazers_count
          bValue = b.stargazers_count
          break
        case 'forks':
          aValue = a.forks_count
          bValue = b.forks_count
          break
        case 'updated':
          aValue = new Date(a.updated_at).getTime()
          bValue = new Date(b.updated_at).getTime()
          break
        case 'created':
          aValue = new Date(a.created_at).getTime()
          bValue = new Date(b.created_at).getTime()
          break
        default:
          aValue = a.stargazers_count
          bValue = b.stargazers_count
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

  const toggleFeatured = (repoId: number) => {
    setRepos(prev => prev.map(repo => 
      repo.id === repoId ? { ...repo, featured: !repo.featured } : repo
    ))
  }

  const toggleHidden = (repoId: number) => {
    setRepos(prev => prev.map(repo => 
      repo.id === repoId ? { ...repo, hidden: !repo.hidden } : repo
    ))
  }

  const languages = Array.from(new Set(repos.map(repo => repo.language).filter(Boolean))) as string[]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your repositories and showcase settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl text-white">
                  <div className="text-2xl font-bold">{repos.length}</div>
                  <div className="text-sm opacity-90">Total Repositories</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-neon-purple to-neon-teal rounded-xl text-white">
                  <div className="text-2xl font-bold">
                    {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
                  </div>
                  <div className="text-sm opacity-90">Total Stars</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-neon-teal to-neon-blue rounded-xl text-white">
                  <div className="text-2xl font-bold">
                    {repos.reduce((sum, repo) => sum + repo.forks_count, 0)}
                  </div>
                  <div className="text-sm opacity-90">Total Forks</div>
                </div>
              </div>

              {/* Badges */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                  Badges Earned
                </h4>
                <div className="space-y-2">
                  {badges.map((badge) => (
                    <div key={badge.id} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-dark-accent rounded-lg">
                      <span className="text-lg">{badge.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {badge.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {badge.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trophies */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                  Trophies
                </h4>
                <div className="space-y-2">
                  {trophies.map((trophy) => (
                    <div key={trophy.id} className={`flex items-center space-x-2 p-2 rounded-lg ${
                      trophy.unlocked 
                        ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20' 
                        : 'bg-gray-50 dark:bg-dark-accent opacity-50'
                    }`}>
                      <span className="text-lg">{trophy.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {trophy.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {trophy.description}
                        </div>
                        {trophy.unlocked && (
                          <div className="text-xs text-yellow-600 dark:text-yellow-400">
                            Unlocked {trophy.unlockedAt}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search repositories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-accent rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent dark:bg-dark-accent dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-accent rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent dark:bg-dark-accent dark:text-white"
                  >
                    <option value="">All Languages</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'stars' | 'forks' | 'updated' | 'created')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-accent rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent dark:bg-dark-accent dark:text-white"
                  >
                    <option value="stars">Stars</option>
                    <option value="forks">Forks</option>
                    <option value="updated">Last Updated</option>
                    <option value="created">Created Date</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Order
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-accent rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent dark:bg-dark-accent dark:text-white"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Repository List */}
            <div className="space-y-4">
              {filteredRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {repo.name}
                        </h3>
                        {repo.featured && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                        {repo.hidden && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            Hidden
                          </span>
                        )}
                      </div>
                      
                      {repo.description && (
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {repo.description}
                        </p>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{formatNumber(repo.stargazers_count)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="w-4 h-4" />
                          <span>{formatNumber(repo.forks_count)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{getTimeAgo(repo.updated_at)}</span>
                        </div>
                        {repo.language && (
                          <span className="px-2 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full">
                            {repo.language}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFeatured(repo.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          repo.featured
                            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                            : 'bg-gray-100 dark:bg-dark-accent text-gray-600 dark:text-gray-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                        }`}
                        title={repo.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        <Star className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleHidden(repo.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          repo.hidden
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : 'bg-gray-100 dark:bg-dark-accent text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/20'
                        }`}
                        title={repo.hidden ? 'Show repository' : 'Hide repository'}
                      >
                        {repo.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-gray-100 dark:bg-dark-accent text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-accent/80 transition-colors duration-200"
                        title="Upload cover image"
                      >
                        <Upload className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-gray-100 dark:bg-dark-accent text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-accent/80 transition-colors duration-200"
                        title="Settings"
                      >
                        <Settings className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
