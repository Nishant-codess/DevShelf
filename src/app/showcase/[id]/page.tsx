'use client'

import { use, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Github, Star, GitFork, Eye, ExternalLink, Copy, Check, Download } from 'lucide-react'
import { Repository } from '@/types'
import { GitHubUser } from '@/lib/github-auth'

interface ShowcaseData {
  user: GitHubUser
  repositories: Repository[]
  createdAt: string
}

interface ShowcasePageProps {
  params: Promise<{
    id: string
  }>
}

export default function ShowcasePage({ params }: ShowcasePageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [showcaseData, setShowcaseData] = useState<ShowcaseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

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

  const handleCopyEmbedCode = () => {
    const embedCode = `<script src="https://devshelf-nishant.vercel.app/widget.js"></script>
<div class="devshelf-widget" data-showcase-id="${id}"></div>`
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyDirectLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadShowcase = async () => {
    if (!showcaseData) return
    
    setDownloading(true)
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size
      canvas.width = 1200
      canvas.height = 800

      // Create a temporary div to render the showcase
      const tempDiv = document.createElement('div')
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.width = '1200px'
      tempDiv.style.height = '800px'
      tempDiv.style.backgroundColor = '#ffffff'
      tempDiv.style.padding = '40px'
      tempDiv.style.fontFamily = 'Arial, sans-serif'
      tempDiv.style.color = '#333333'
      tempDiv.style.borderRadius = '20px'
      tempDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'

      // Create the showcase content
      tempDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="font-size: 48px; font-weight: bold; color: #3B82F6; margin-bottom: 20px;">DevShelf</div>
          <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">${showcaseData.user.name || showcaseData.user.login}</div>
          <div style="font-size: 16px; color: #666; margin-bottom: 20px;">@${showcaseData.user.login}</div>
          ${showcaseData.user.bio ? `<div style="font-size: 14px; color: #666; max-width: 600px; margin: 0 auto 30px;">${showcaseData.user.bio}</div>` : ''}
          <div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 40px;">
            <div style="text-align: center;">
              <div style="font-size: 32px; font-weight: bold; color: #3B82F6;">${showcaseData.user.public_repos}</div>
              <div style="font-size: 14px; color: #666;">Repositories</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 32px; font-weight: bold; color: #8B5CF6;">${showcaseData.user.followers}</div>
              <div style="font-size: 14px; color: #666;">Followers</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 32px; font-weight: bold; color: #14B8A6;">${showcaseData.user.following}</div>
              <div style="font-size: 14px; color: #666;">Following</div>
            </div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
          ${showcaseData.repositories.slice(0, 6).map(repo => `
            <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; background: #f9fafb;">
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">${repo.name}</div>
              <div style="font-size: 12px; color: #666; margin-bottom: 12px; line-height: 1.4;">${repo.description || 'No description'}</div>
              <div style="display: flex; gap: 12px; font-size: 12px; color: #666;">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🔄 ${repo.forks_count}</span>
                <span>👁️ ${repo.watchers_count}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
          Generated by DevShelf • ${new Date().toLocaleDateString()}
        </div>
      `

      document.body.appendChild(tempDiv)

      // Convert HTML to canvas using html2canvas (you'll need to install this)
      // For now, we'll create a simple image with text
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add DevShelf branding
      ctx.fillStyle = '#3B82F6'
      ctx.font = 'bold 48px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('DevShelf', canvas.width / 2, 80)

      // Add user info
      ctx.fillStyle = '#333333'
      ctx.font = 'bold 24px Arial'
      ctx.fillText(showcaseData.user.name || showcaseData.user.login, canvas.width / 2, 140)
      
      ctx.font = '16px Arial'
      ctx.fillStyle = '#666666'
      ctx.fillText(`@${showcaseData.user.login}`, canvas.width / 2, 170)

      if (showcaseData.user.bio) {
        ctx.font = '14px Arial'
        ctx.fillText(showcaseData.user.bio.substring(0, 80) + (showcaseData.user.bio.length > 80 ? '...' : ''), canvas.width / 2, 200)
      }

      // Add stats
      ctx.font = 'bold 32px Arial'
      ctx.fillStyle = '#3B82F6'
      ctx.fillText(showcaseData.user.public_repos.toString(), canvas.width / 2 - 200, 260)
      ctx.fillStyle = '#8B5CF6'
      ctx.fillText(showcaseData.user.followers.toString(), canvas.width / 2, 260)
      ctx.fillStyle = '#14B8A6'
      ctx.fillText(showcaseData.user.following.toString(), canvas.width / 2 + 200, 260)

      ctx.font = '14px Arial'
      ctx.fillStyle = '#666666'
      ctx.fillText('Repositories', canvas.width / 2 - 200, 290)
      ctx.fillText('Followers', canvas.width / 2, 290)
      ctx.fillText('Following', canvas.width / 2 + 200, 290)

      // Add projects
      ctx.font = 'bold 18px Arial'
      ctx.fillStyle = '#333333'
      ctx.textAlign = 'left'
      
      showcaseData.repositories.slice(0, 6).forEach((repo, index) => {
        const x = 50 + (index % 3) * 350
        const y = 350 + Math.floor(index / 3) * 150
        
        ctx.fillText(repo.name, x, y)
        ctx.font = '12px Arial'
        ctx.fillStyle = '#666666'
        ctx.fillText(repo.description?.substring(0, 40) + (repo.description && repo.description.length > 40 ? '...' : '') || 'No description', x, y + 20)
        
        ctx.fillText(`⭐ ${repo.stargazers_count} 🔄 ${repo.forks_count} 👁️ ${repo.watchers_count}`, x, y + 40)
        
        ctx.font = 'bold 18px Arial'
        ctx.fillStyle = '#333333'
      })

      // Add footer
      ctx.font = '12px Arial'
      ctx.fillStyle = '#666666'
      ctx.textAlign = 'center'
      ctx.fillText(`Generated by DevShelf • ${new Date().toLocaleDateString()}`, canvas.width / 2, canvas.height - 30)

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `devshelf-${showcaseData.user.login}-${new Date().toISOString().split('T')[0]}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
      }, 'image/png')

      document.body.removeChild(tempDiv)
    } catch (error) {
      console.error('Error downloading showcase:', error)
    } finally {
      setDownloading(false)
    }
  }

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
            Showcase Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please create a showcase from your dashboard first.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-neon-blue text-white rounded-xl font-semibold hover:bg-neon-blue/80 transition-colors duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
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
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-secondary rounded-lg transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Project Showcase
            </h1>
          </div>
          
                     <div className="flex items-center space-x-3">
             <button
               onClick={handleDownloadShowcase}
               disabled={downloading}
               className="px-4 py-2 bg-neon-teal text-white rounded-lg hover:bg-neon-teal/80 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
             >
               <Download className="w-4 h-4" />
               <span>{downloading ? 'Generating...' : 'Download Image'}</span>
             </button>
             <button
               onClick={handleCopyEmbedCode}
               className="px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/80 transition-colors duration-200 flex items-center space-x-2"
             >
               {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
               <span>{copied ? 'Copied!' : 'Copy Embed'}</span>
             </button>
             <button
               onClick={handleCopyDirectLink}
               className="px-4 py-2 bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
             >
               <ExternalLink className="w-4 h-4" />
               <span>Copy Link</span>
             </button>
           </div>
        </motion.div>

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
              className="w-24 h-24 rounded-full border-4 border-white dark:border-dark-accent shadow-lg mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {showcaseData.user.name || showcaseData.user.login}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">@{showcaseData.user.login}</p>
            {showcaseData.user.bio && (
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                {showcaseData.user.bio}
              </p>
            )}
            
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">{showcaseData.user.public_repos}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-purple">{showcaseData.user.followers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-teal">{showcaseData.user.following}</div>
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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Projects
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {showcaseData.repositories.length} project{showcaseData.repositories.length !== 1 ? 's' : ''} selected
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {showcaseData.repositories.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                                 transition={{ duration: 0.5 }}
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

                 {/* Embed Instructions */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="bg-white dark:bg-dark-secondary rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-accent mt-8"
         >
           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
             Embed This Showcase
           </h3>
           <p className="text-gray-600 dark:text-gray-400 mb-4">
             Copy the code below to embed this showcase on your website:
           </p>
           <div className="bg-gray-100 dark:bg-dark-accent p-4 rounded-lg">
             <code className="text-sm text-gray-800 dark:text-gray-200">
               {`<script src="https://devshelf-nishant.vercel.app/widget.js"></script>
<div class="devshelf-widget" data-showcase-id="${id}"></div>`}
             </code>
           </div>
           <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
             <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">✨ New Widget System</h4>
             <p className="text-sm text-blue-700 dark:text-blue-300">
                               This new widget system works on any website and doesn&apos;t require iframes. Just add the script and div to your HTML!
             </p>
           </div>
         </motion.div>
      </div>
    </div>
  )
}
