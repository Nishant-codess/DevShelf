'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Github, LogOut, ArrowLeft, Star, GitFork, Eye, Calendar, Check, ExternalLink } from 'lucide-react'
import { isAuthenticated, getAccessToken, removeAccessToken, getAuthenticatedUser, getAuthenticatedUserRepos } from '@/lib/github-auth'
import { GitHubUser } from '@/lib/github-auth'
import { Repository } from '@/types'
import ProjectCard from '@/components/ProjectCard'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showcaseMode, setShowcaseMode] = useState(false)
  const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set())

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      if (!isAuthenticated()) {
        router.push('/')
        return
      }

      try {
        const accessToken = getAccessToken()
        if (!accessToken) {
          throw new Error('No access token found')
        }

        // Load user data and repositories
        const [userData, reposData] = await Promise.all([
          getAuthenticatedUser(accessToken),
          getAuthenticatedUserRepos(accessToken)
        ])

        setUser(userData)

        // Convert GitHub repositories to our Repository format and filter only public repos
        const convertedRepos: Repository[] = reposData
          .filter((repo: any) => !repo.private) // Only public repositories
          .map((repo: any) => ({
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
            featured: repo.stargazers_count >= 100,
            hidden: false
          }))

        setRepos(convertedRepos)
        
        // Store repositories in sessionStorage so they can be accessed by project detail pages
        try {
          sessionStorage.setItem('userRepositories', JSON.stringify(convertedRepos))
        } catch (error) {
          console.error('Error storing user repositories:', error)
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        setError('Failed to load your data. Please try logging in again.')
        // Remove invalid token
        removeAccessToken()
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndLoadData()
  }, [router])

  const handleLogout = () => {
    removeAccessToken()
    // Clear user repositories from sessionStorage
    try {
      sessionStorage.removeItem('userRepositories')
    } catch (error) {
      console.error('Error clearing user repositories:', error)
    }
    router.push('/')
  }

  const handleShowcaseToggle = () => {
    setShowcaseMode(!showcaseMode)
    if (showcaseMode) {
      setSelectedRepos(new Set())
    }
  }

  const handleRepoSelection = (repoId: number) => {
    const newSelected = new Set(selectedRepos)
    if (newSelected.has(repoId)) {
      newSelected.delete(repoId)
    } else {
      newSelected.add(repoId)
    }
    setSelectedRepos(newSelected)
  }

  const handleCreateShowcase = () => {
    if (selectedRepos.size === 0) return
    
    const selectedReposList = repos.filter(repo => selectedRepos.has(repo.id))
    const showcaseData = {
      user: user,
      repositories: selectedReposList,
      createdAt: new Date().toISOString()
    }
    
    // Generate unique showcase ID using GitHub username
    const showcaseId = `${user.login}-${Date.now()}`
    
    // Store showcase data in sessionStorage with unique ID
    try {
      sessionStorage.setItem('showcaseData', JSON.stringify(showcaseData))
      sessionStorage.setItem('showcaseId', showcaseId)
    } catch (error) {
      console.error('Error storing showcase data:', error)
    }
    
    // Navigate to showcase page with unique ID
    router.push(`/showcase/${showcaseId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-neon-blue text-white rounded-xl font-semibold hover:bg-neon-blue/80 transition-colors duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

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
              Your DevShelf
            </h1>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </motion.div>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar_url}
              alt={user.name || user.login}
              className="w-20 h-20 rounded-full border-4 border-white dark:border-dark-accent shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name || user.login}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">@{user.login}</p>
              {user.bio && (
                <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
              )}
            </div>
            <div className="text-right">
              <div className="grid grid-cols-3 gap-6 text-center">
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
          </div>
        </motion.div>

        {/* Showcase Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Create Your Showcase
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select your best projects to create a beautiful showcase that you can embed anywhere
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShowcaseToggle}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2 ${
                  showcaseMode 
                    ? 'bg-neon-purple text-white hover:bg-neon-purple/80' 
                    : 'bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{showcaseMode ? 'Cancel Selection' : 'Select Projects'}</span>
              </button>
              
              {showcaseMode && selectedRepos.size > 0 && (
                <button
                  onClick={handleCreateShowcase}
                  className="px-6 py-3 bg-neon-blue text-white rounded-xl font-semibold hover:bg-neon-blue/80 transition-colors duration-200 flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Create Showcase ({selectedRepos.size})</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your GitHub Repositories
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {repos.length} repositor{repos.length !== 1 ? 'ies' : 'y'} found
            </p>
          </div>

          {repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <div key={repo.id} className="relative">
                  {showcaseMode && (
                    <div className="absolute top-4 left-4 z-10">
                      <button
                        onClick={() => handleRepoSelection(repo.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedRepos.has(repo.id)
                            ? 'bg-neon-blue border-neon-blue text-white'
                            : 'bg-white dark:bg-dark-secondary border-gray-300 dark:border-gray-600 hover:border-neon-blue'
                        }`}
                      >
                        {selectedRepos.has(repo.id) && <Check className="w-3 h-3" />}
                      </button>
                    </div>
                  )}
                  <ProjectCard repo={repo} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No repositories found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You don't have any public repositories yet.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
