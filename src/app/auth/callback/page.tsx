'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle, XCircle, Github } from 'lucide-react'
import { exchangeCodeForToken, storeAccessToken } from '@/lib/github-auth'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
          setStatus('error')
          setMessage('Authentication was cancelled or failed')
          return
        }

        if (!code) {
          setStatus('error')
          setMessage('No authorization code received')
          return
        }

        // Exchange code for access token
        const tokenData = await exchangeCodeForToken(code)
        
        // Store the access token
        storeAccessToken(tokenData.access_token)
        
        setStatus('success')
        setMessage('Successfully authenticated with GitHub!')
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)

      } catch (error) {
        console.error('OAuth callback error:', error)
        setStatus('error')
        setMessage('Failed to complete authentication')
      }
    }

    handleCallback()
  }, [searchParams, router])

  const getStatusContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loader2 className="w-16 h-16 animate-spin text-neon-blue mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Completing Authentication
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we complete your GitHub login...
            </p>
          </>
        )
      
      case 'success':
        return (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Successful!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {message}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirecting to dashboard...
            </p>
          </>
        )
      
      case 'error':
        return (
          <>
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {message}
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-neon-blue text-white rounded-xl font-semibold hover:bg-neon-blue/80 transition-colors duration-200"
            >
              Return to Home
            </button>
          </>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-white dark:bg-dark-secondary rounded-2xl shadow-lg border border-gray-200 dark:border-dark-accent max-w-md w-full mx-4"
      >
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <Github className="w-10 h-10 text-white" />
          </div>
        </div>
        
        {getStatusContent()}
      </motion.div>
    </div>
  )
}
