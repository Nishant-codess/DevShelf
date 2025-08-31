'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon, Menu, X, Github, Sparkles, LogOut } from 'lucide-react'
import { initiateGitHubLogin, isAuthenticated, removeAccessToken, getAccessToken, getAuthenticatedUser } from '@/lib/github-auth'
import { GitHubUser } from '@/lib/github-auth'


export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<GitHubUser | null>(null)

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
          removeAccessToken()
          setIsLoggedIn(false)
        }
      }
    }

    checkAuthStatus()
  }, [])

  const handleLogin = () => {
    initiateGitHubLogin()
  }

  const handleLogout = () => {
    removeAccessToken()
    try {
      sessionStorage.removeItem('userRepositories')
    } catch (error) {
      console.error('Error clearing user repositories:', error)
    }
    setIsLoggedIn(false)
    setUser(null)
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Showcase', href: '/u/demo' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-dark-primary/10 backdrop-blur-md border-b border-white/20 dark:border-dark-accent/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              DevShelf
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-neon-blue dark:hover:text-neon-blue transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Theme toggle and GitHub login */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-accent hover:bg-gray-200 dark:hover:bg-dark-secondary transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>

            {/* GitHub Login/User Button */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg">
                  <img
                    src={user?.avatar_url}
                    alt={user?.name || user?.login}
                    className="w-6 h-6 rounded-full border border-white"
                  />
                  <span className="text-sm font-medium">
                    {user?.name || user?.login}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                <span>Login with GitHub</span>
              </motion.button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-accent hover:bg-gray-200 dark:hover:bg-dark-secondary transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 dark:border-dark-accent"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-neon-blue dark:hover:text-neon-blue hover:bg-gray-50 dark:hover:bg-dark-accent transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                {isLoggedIn ? (
                  <div className="px-4 py-2 space-y-2">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg">
                      <img
                        src={user?.avatar_url}
                        alt={user?.name || user?.login}
                        className="w-6 h-6 rounded-full border border-white"
                      />
                      <span className="text-sm font-medium">
                        {user?.name || user?.login}
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-2">
                    <button 
                      onClick={() => {
                        handleLogin()
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Github className="w-4 h-4" />
                      <span>Login with GitHub</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
