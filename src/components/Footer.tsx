'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Mail, Sparkles, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-dark-primary border-t border-gray-200 dark:border-dark-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                DevShelf
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Showcase your GitHub repositories in a beautiful, interactive project shelf. 
              Perfect for portfolios and developer profiles.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/Nishant-codess"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-gray-100 dark:bg-dark-accent rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-neon-blue hover:text-white transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/nishant-ranjan-srmist/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-gray-100 dark:bg-dark-accent rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-neon-blue hover:text-white transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:nishant.ranjan.air1@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-gray-100 dark:bg-dark-accent rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-neon-blue hover:text-white transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-accent">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} DevShelf. All Rights Reserved. Made with <Heart className="w-4 h-4 inline text-red-500" /> Nishant Ranjan.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-neon-blue text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-neon-blue text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
