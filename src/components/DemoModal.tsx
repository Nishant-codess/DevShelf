'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Github, Loader2, AlertCircle } from 'lucide-react'
import { fetchUserRepositories, fetchUser, GitHubRepository } from '@/lib/github'
import { Repository } from '@/types'
import ProjectCard from './ProjectCard'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [username, setUsername] = useState('')
  const [repos, setRepos] = useState<Repository[]>([])
  const [user, setUser] = useState<{
    login: string
    name: string | null
    bio: string | null
    avatar_url: string
    public_repos: number
    followers: number
    following: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  // Clear demo repositories when modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Don't clear immediately, give user time to navigate to project details
      const timer = setTimeout(() => {
        try {
          sessionStorage.removeItem('demoRepositories')
        } catch (error) {
          console.error('Error clearing demo repositories:', error)
        }
      }, 30000) // Clear after 30 seconds
      
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSearch = async () => {
    if (!username.trim()) return
    
    setLoading(true)
    setError(null)
    setHasSearched(true)
    
    try {
      const [userData, reposData] = await Promise.all([
        fetchUser(username.trim()),
        fetchUserRepositories(username.trim())
      ])
      
      setUser(userData)
      
      // Convert GitHub repositories to our Repository format
      const convertedRepos: Repository[] = reposData.map((repo: GitHubRepository) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        clone_url: repo.clone_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        default_branch: repo.default_branch,
        homepage: repo.homepage,
        license: repo.license,
        archived: repo.archived,
        disabled: repo.disabled,
        private: repo.private,
        fork: repo.fork,
        size: repo.size,
        open_issues_count: repo.open_issues_count,
        watchers_count: repo.watchers_count,
        visibility: repo.visibility,
        featured: repo.stargazers_count >= 100, // Mark popular repos as featured
        hidden: false
      }))
      
             setRepos(convertedRepos)
       
       // Store repositories in sessionStorage so they can be accessed by project detail pages
       try {
         sessionStorage.setItem('demoRepositories', JSON.stringify(convertedRepos))
       } catch (error) {
         console.error('Error storing demo repositories:', error)
       }
     } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch repositories'
      setError(errorMessage)
      setRepos([])
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const resetDemo = () => {
    setUsername('')
    setRepos([])
    setUser(null)
    setError(null)
    setHasSearched(false)
    
    // Clear demo repositories from sessionStorage
    try {
      sessionStorage.removeItem('demoRepositories')
    } catch (error) {
      console.error('Error clearing demo repositories:', error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white dark:bg-dark-accent rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-secondary">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">DevShelf Demo</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">See how your GitHub projects would look</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-secondary rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Search Section */}
              <div className="mb-8">
                <div className="flex space-x-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Enter GitHub username (e.g., octocat)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-secondary rounded-xl focus:ring-2 focus:ring-neon-blue focus:border-transparent dark:bg-dark-secondary dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSearch}
                      disabled={loading || !username.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Search className="w-5 h-5" />
                      )}
                      <span>{loading ? 'Loading...' : 'Search'}</span>
                    </motion.button>
                  </div>
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 dark:text-red-400">{error}</span>
                  </motion.div>
                )}
              </div>

              {/* Results Section */}
              {hasSearched && !loading && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* User Info */}
                  {user && (
                    <div className="text-center p-6 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-2xl">
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <img
                          src={user.avatar_url}
                          alt={user.login}
                          className="w-16 h-16 rounded-full border-4 border-white dark:border-dark-accent shadow-lg"
                        />
                        <div className="text-left">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {user.name || user.login}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">@{user.login}</p>
                          {user.bio && (
                            <p className="text-gray-700 dark:text-gray-300 mt-2">{user.bio}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-neon-blue">{user.public_repos}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-neon-purple">{user.followers}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-neon-teal">{user.following}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Repositories */}
                  {repos.length > 0 ? (
                    <>
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {repos.length} Repository{repos.length !== 1 ? 'ies' : ''} Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Here's how your projects would look on DevShelf
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo, index) => (
                          <ProjectCard key={repo.id} repo={repo} index={index} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No repositories found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        This user doesn't have any public repositories or the username might be incorrect.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Initial State */}
              {!hasSearched && !loading && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Github className="w-12 h-12 text-neon-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Try DevShelf with Any GitHub Profile
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Enter a GitHub username above to see how their repositories would look in the beautiful DevShelf format.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-dark-secondary bg-gray-50 dark:bg-dark-secondary">
              <div className="flex items-center justify-between">
                <button
                  onClick={resetDemo}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Reset Demo
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Powered by GitHub API
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
