'use client'

import React, { use, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Calendar, ExternalLink, Github, Badge as BadgeIcon } from 'lucide-react'
import Link from 'next/link'
import { sampleRepositories } from '@/data/sampleRepos'
import { Repository } from '@/types'
import { Badge } from '@/types'
import { getAccessToken, getRepositoryReadme, getRepositoryActivity, getRepositoryIssues } from '@/lib/github-auth'

// Helper function to format numbers
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Helper function to get time ago
function getTimeAgo(date: string): string {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`
  return `${Math.floor(diffInSeconds / 31536000)}y ago`
}

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'activity' | 'comments'>('overview')
  const [project, setProject] = useState<Repository | null>(null)
  const [loading, setLoading] = useState(true)
  const [readme, setReadme] = useState<string>('')
  const [activity, setActivity] = useState<Array<{
    type: string;
    actor?: { login: string };
    created_at: string;
  }>>([])
  const [issues, setIssues] = useState<Array<{
    title: string;
    body?: string;
    state: string;
    user?: { login: string };
    created_at: string;
  }>>([])
  
  useEffect(() => {
    // First try to find in sample repositories
    let foundProject = sampleRepositories.find(repo => repo.id.toString() === id)
    
    if (foundProject) {
      setProject(foundProject)
      setLoading(false)
      return
    }
    
    // If not found in samples, check if it's a demo repository stored in sessionStorage
    try {
      const demoRepos = sessionStorage.getItem('demoRepositories')
      if (demoRepos) {
        const repos: Repository[] = JSON.parse(demoRepos)
        foundProject = repos.find(repo => repo.id.toString() === id)
        if (foundProject) {
          setProject(foundProject)
          setLoading(false)
          return
        }
      }
    } catch (error) {
      console.error('Error parsing demo repositories:', error)
    }
    
    // If not found in demo repos, check if it's a user repository stored in sessionStorage
    try {
      const userRepos = sessionStorage.getItem('userRepositories')
      if (userRepos) {
        const repos: Repository[] = JSON.parse(userRepos)
        foundProject = repos.find(repo => repo.id.toString() === id)
        if (foundProject) {
          setProject(foundProject)
          setLoading(false)
          return
        }
      }
    } catch (error) {
      console.error('Error parsing user repositories:', error)
    }
    
    // If still not found, set loading to false
    setLoading(false)
  }, [id])

  // Load additional data if project is found and user is authenticated
  useEffect(() => {
    const loadAdditionalData = async () => {
      if (!project) return

      const accessToken = getAccessToken()
      if (!accessToken) return

      

      try {
        const [owner, repo] = project.full_name.split('/')
        
        // Load README, activity, and issues in parallel
        const [readmeData, activityData, issuesData] = await Promise.all([
          getRepositoryReadme(owner, repo, accessToken),
          getRepositoryActivity(owner, repo, accessToken),
          getRepositoryIssues(owner, repo, accessToken)
        ])

        setReadme(readmeData)
        setActivity(activityData)
        setIssues(issuesData)
      } catch (error) {
        console.error('Error loading additional data:', error)
      }
    }

    loadAdditionalData()
  }, [project])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading project...</p>
        </div>
      </div>
    )
  }
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This project might be from a demo session that has expired, or you may need to log in again to access your repositories.
          </p>
          <div className="space-x-4">
            <Link href="/" className="text-neon-blue hover:underline">
              Back to Home
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/dashboard" className="text-neon-blue hover:underline">
              Go to Dashboard
            </Link>
          </div>
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
                {project.topics && project.topics.map((topic) => (
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
                  <strong>Default Branch:</strong> {project.default_branch || 'main'}
                </div>
                <div>
                  <strong>Size:</strong> {formatNumber(project.size || 0)} KB
                </div>
                <div>
                  <strong>Open Issues:</strong> {project.open_issues_count || 0}
                </div>
              </div>

                             <h3>Getting Started</h3>
               <p>To get started with this project:</p>
               <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                 <code>git clone {project.clone_url || project.html_url + '.git'}</code>
               </pre>

                                               {readme && (
                  <>
                    <h3>README</h3>
                    <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg border border-gray-200 dark:border-dark-accent overflow-hidden">
                      <div className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <Github className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-lg">Repository README</h4>
                            <p className="text-white/80 text-sm">Documentation & Setup Guide</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="prose dark:prose-invert max-w-none">
                          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {(() => {
                              // Parse markdown and convert to JSX
                              const parseMarkdown = (text: string) => {
                                const lines = text.split('\n')
                                const elements: React.ReactElement[] = []
                                let inCodeBlock = false
                                let codeBlockContent: string[] = []
                                let codeBlockLanguage = ''
                                
                                lines.forEach((line, index) => {
                                  // Handle code blocks
                                  if (line.startsWith('```')) {
                                    if (!inCodeBlock) {
                                      // Start of code block
                                      inCodeBlock = true
                                      codeBlockContent = []
                                      codeBlockLanguage = line.replace('```', '').trim()
                                    } else {
                                      // End of code block
                                      inCodeBlock = false
                                      elements.push(
                                        <div key={`code-${index}`} className="my-4">
                                          <div className="bg-gray-900 rounded-lg overflow-hidden">
                                            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                                              <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                <span className="text-gray-400 text-sm ml-2">
                                                  {codeBlockLanguage || 'Code'}
                                                </span>
                                              </div>
                                            </div>
                                            <pre className="p-4 text-green-400 text-sm overflow-x-auto">
                                              <code>{codeBlockContent.join('\n')}</code>
                                            </pre>
                                          </div>
                                        </div>
                                      )
                                    }
                                    return
                                  }
                                  
                                  if (inCodeBlock) {
                                    codeBlockContent.push(line)
                                    return
                                  }
                                  
                                                                     // Handle headers
                                   if (line.startsWith('# ')) {
                                     const headerContent = parseInlineMarkdown(line.replace('# ', ''))
                                     elements.push(
                                       <h1 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4 border-b border-gray-200 dark:border-dark-accent pb-2">
                                         {headerContent}
                                       </h1>
                                     )
                                     return
                                   }
                                   if (line.startsWith('## ')) {
                                     const headerContent = parseInlineMarkdown(line.replace('## ', ''))
                                     elements.push(
                                       <h2 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-3">
                                         {headerContent}
                                       </h2>
                                     )
                                     return
                                   }
                                   if (line.startsWith('### ')) {
                                     const headerContent = parseInlineMarkdown(line.replace('### ', ''))
                                     elements.push(
                                       <h3 key={index} className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">
                                         {headerContent}
                                       </h3>
                                     )
                                     return
                                   }
                                   if (line.startsWith('#### ')) {
                                     const headerContent = parseInlineMarkdown(line.replace('#### ', ''))
                                     elements.push(
                                       <h4 key={index} className="text-base font-medium text-gray-900 dark:text-white mt-3 mb-2">
                                         {headerContent}
                                       </h4>
                                     )
                                     return
                                   }
                                   
                                   // Handle blockquotes
                                   if (line.startsWith('> ')) {
                                     const quoteContent = parseInlineMarkdown(line.replace('> ', ''))
                                     elements.push(
                                       <blockquote key={index} className="border-l-4 border-neon-blue pl-4 my-4 italic text-gray-600 dark:text-gray-400">
                                         {quoteContent}
                                       </blockquote>
                                     )
                                     return
                                   }
                                   
                                   // Handle lists
                                   if (line.startsWith('- ') || line.startsWith('* ')) {
                                     const listContent = parseInlineMarkdown(line.replace(/^[-*]\s/, ''))
                                     elements.push(
                                       <div key={index} className="flex items-start space-x-2 my-2">
                                         <span className="text-neon-blue mt-2">•</span>
                                         <span className="text-gray-700 dark:text-gray-300">
                                           {listContent}
                                         </span>
                                       </div>
                                     )
                                     return
                                   }
                                   
                                   if (line.match(/^\d+\.\s/)) {
                                     const number = line.match(/^\d+/)?.[0] || ''
                                     const listContent = parseInlineMarkdown(line.replace(/^\d+\.\s/, ''))
                                     elements.push(
                                       <div key={index} className="flex items-start space-x-2 my-2">
                                         <span className="text-neon-blue font-medium mt-1">{number}.</span>
                                         <span className="text-gray-700 dark:text-gray-300">
                                           {listContent}
                                         </span>
                                       </div>
                                     )
                                     return
                                   }
                                   
                                   // Handle empty lines
                                   if (line.trim() === '') {
                                     elements.push(<div key={index} className="h-4"></div>)
                                     return
                                   }
                                   
                                   // Handle regular paragraphs
                                   const paragraphContent = parseInlineMarkdown(line)
                                   elements.push(
                                     <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                                       {paragraphContent}
                                     </p>
                                   )
                                })
                                
                                return elements
                              }
                              
                                                             // Parse inline markdown elements and return JSX elements
                                                               const parseInlineMarkdown = (text: string): (string | React.ReactElement)[] => {
                                  const elements: (string | React.ReactElement)[] = []
                                 let currentText = text
                                 
                                                                   // Fix character encoding issues
                                  currentText = currentText
                                    .replace(/â€"/g, '–') // Fix en dash encoding
                                    .replace(/â€"/g, '—') // Fix em dash encoding
                                    .replace(/â€™/g, "'") // Fix apostrophe encoding
                                    .replace(/â€œ/g, '"') // Fix left quote encoding
                                    .replace(/â€/g, '"') // Fix right quote encoding
                                    .replace(/â€¦/g, '…') // Fix ellipsis encoding
                                 
                                 // Handle images ![alt](url)
                                 currentText = currentText.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
                                   elements.push(
                                     <img 
                                       key={`img-${elements.length}`} 
                                       src={url} 
                                       alt={alt} 
                                       className="max-w-full h-auto rounded-lg shadow-md my-4" 
                                     />
                                   )
                                   return `__IMG_${elements.length - 1}__`
                                 })
                                 
                                 // Handle badges and shields [![alt](badgeUrl)](linkUrl)
                                 currentText = currentText.replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, (match, alt, badgeUrl, linkUrl) => {
                                   elements.push(
                                     <a 
                                       key={`badge-${elements.length}`} 
                                       href={linkUrl} 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       className="inline-block mr-2 mb-2"
                                     >
                                       <img src={badgeUrl} alt={alt} className="h-6" />
                                     </a>
                                   )
                                   return `__BADGE_${elements.length - 1}__`
                                 })
                                 
                                 // Handle regular images without links
                                 currentText = currentText.replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]/g, (match, alt, url) => {
                                   elements.push(
                                     <img 
                                       key={`img-inline-${elements.length}`} 
                                       src={url} 
                                       alt={alt} 
                                       className="h-6 inline-block mr-2 mb-2" 
                                     />
                                   )
                                   return `__IMG_INLINE_${elements.length - 1}__`
                                 })
                                 
                                 // Handle links [text](url)
                                 currentText = currentText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
                                   elements.push(
                                     <a 
                                       key={`link-${elements.length}`} 
                                       href={url} 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       className="text-neon-blue hover:underline"
                                     >
                                       {linkText}
                                     </a>
                                   )
                                   return `__LINK_${elements.length - 1}__`
                                 })
                                 
                                 // Handle inline code `code`
                                 currentText = currentText.replace(/`([^`]+)`/g, (match, code) => {
                                   elements.push(
                                     <code 
                                       key={`code-${elements.length}`} 
                                       className="bg-gray-100 dark:bg-dark-accent text-neon-blue px-2 py-1 rounded text-sm font-mono"
                                     >
                                       {code}
                                     </code>
                                   )
                                   return `__CODE_${elements.length - 1}__`
                                 })
                                 
                                 // Handle bold **text**
                                 currentText = currentText.replace(/\*\*([^*]+)\*\*/g, (match, boldText) => {
                                   elements.push(
                                     <strong 
                                       key={`bold-${elements.length}`} 
                                       className="font-bold text-gray-900 dark:text-white"
                                     >
                                       {boldText}
                                     </strong>
                                   )
                                   return `__BOLD_${elements.length - 1}__`
                                 })
                                 
                                 // Handle italic *text*
                                 currentText = currentText.replace(/\*([^*]+)\*/g, (match, italicText) => {
                                   elements.push(
                                     <em 
                                       key={`italic-${elements.length}`} 
                                       className="italic"
                                     >
                                       {italicText}
                                     </em>
                                   )
                                   return `__ITALIC_${elements.length - 1}__`
                                 })
                                 
                                 // Split the remaining text and interleave with elements
                                 const textParts = currentText.split(/(__[A-Z_]+_\d+__)/)
                                                                   const result: (string | React.ReactElement)[] = []
                                 
                                 textParts.forEach((part) => {
                                   if (part.match(/__[A-Z_]+_\d+__/)) {
                                     const elementIndex = parseInt(part.match(/\d+/)?.[0] || '0')
                                     if (elements[elementIndex]) {
                                       result.push(elements[elementIndex])
                                     }
                                   } else if (part.trim()) {
                                     result.push(part)
                                   }
                                 })
                                 
                                 return result
                               }
                              
                              return parseMarkdown(readme)
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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
                 {activity.length > 0 ? (
                   activity.map((event, index) => (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.5, delay: index * 0.1 }}
                       className="flex items-center space-x-4 p-4 bg-white dark:bg-dark-secondary rounded-xl shadow-sm border border-gray-200 dark:border-dark-accent"
                     >
                       <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white text-sm font-semibold">
                         {event.actor?.login?.charAt(0).toUpperCase() || 'U'}
                       </div>
                       <div className="flex-1">
                         <p className="text-gray-900 dark:text-white font-medium">
                           {event.type}
                         </p>
                         <p className="text-sm text-gray-500 dark:text-gray-400">
                           by {event.actor?.login || 'Unknown'} • {getTimeAgo(event.created_at)}
                         </p>
                       </div>
                       <div className="text-xs text-gray-400">
                         {event.type.toUpperCase()}
                       </div>
                     </motion.div>
                   ))
                 ) : (
                   <div className="text-center py-8">
                     <p className="text-gray-500 dark:text-gray-400">No recent activity found</p>
                   </div>
                 )}
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
                 Issues & Discussion
               </h2>
               <div className="space-y-4">
                 {issues.length > 0 ? (
                   issues.map((issue, index) => (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.5, delay: index * 0.1 }}
                       className="bg-white dark:bg-dark-secondary p-4 rounded-xl shadow-sm border border-gray-200 dark:border-dark-accent"
                     >
                       <div className="flex items-start space-x-3">
                         <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white text-sm font-semibold">
                           {issue.user?.login?.charAt(0).toUpperCase() || 'U'}
                         </div>
                         <div className="flex-1">
                           <div className="flex items-center space-x-2 mb-1">
                             <span className="font-medium text-gray-900 dark:text-white">
                               {issue.user?.login || 'Unknown'}
                             </span>
                             <span className="text-xs text-gray-500 dark:text-gray-400">
                               {getTimeAgo(issue.created_at)}
                             </span>
                             <span className={`px-2 py-1 text-xs rounded-full ${
                               issue.state === 'open' 
                                 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                 : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                             }`}>
                               {issue.state}
                             </span>
                           </div>
                           <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                             {issue.title}
                           </p>
                           {issue.body && (
                             <p className="text-gray-600 dark:text-gray-400 text-sm">
                               {issue.body.substring(0, 200)}...
                             </p>
                           )}
                         </div>
                       </div>
                     </motion.div>
                   ))
                 ) : (
                   <div className="text-center py-8">
                     <p className="text-gray-500 dark:text-gray-400">No issues found</p>
                   </div>
                 )}
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
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-neon-blue hover:text-neon-blue/80 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            {/* If this is a demo repository, show a return to demo button */}
            {project && !sampleRepositories.find(repo => repo.id === project.id) && (
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center space-x-2 text-neon-purple hover:text-neon-purple/80 transition-colors duration-200"
              >
                <span>← Return to Demo</span>
              </button>
            )}
          </div>
          
          {/* If this is a demo repository, show a note */}
          {project && !sampleRepositories.find(repo => repo.id === project.id) && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              💡 This project is from a demo session. You can return to the demo to explore more repositories.
            </div>
          )}
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
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {project.name}
                </h1>
                {!sampleRepositories.find(repo => repo.id === project.id) && (
                  <span className="px-2 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full font-medium">
                    Demo
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {project.description || 'No description available'}
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
