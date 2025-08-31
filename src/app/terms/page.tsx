'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TermsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              Terms of Service
            </h1>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                DevShelf Terms of Service
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By accessing and using DevShelf (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Description of Service
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                DevShelf is a platform that allows developers to showcase their GitHub repositories in a beautiful, embeddable format. The service provides tools to create project showcases and embed them on websites.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3. User Accounts
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To use certain features of DevShelf, you must authenticate through GitHub. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Acceptable Use
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Use the Service for any commercial purpose without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Privacy and Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We respect your privacy and are committed to protecting your personal information. Please review our Privacy Policy for details on how we collect, use, and protect your data.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Intellectual Property
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                DevShelf and its original content, features, and functionality are owned by Nishant Ranjan and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Disclaimer of Warranties
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The Service is provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted or error-free.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Limitation of Liability
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In no event shall DevShelf or its creator be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Termination
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may terminate or suspend your access to the Service immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Changes to Terms
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Email: nishant.ranjan.air1@gmail.com<br />
                GitHub: <a href="https://github.com/Nishant-codess" className="text-neon-blue hover:underline">@Nishant-codess</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
