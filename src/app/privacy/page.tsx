'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PrivacyPage() {
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
              Privacy Policy
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                DevShelf Privacy Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Information We Collect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We collect information you provide directly to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Authenticate through GitHub</li>
                <li>Create a showcase</li>
                <li>Contact us for support</li>
                <li>Use our widget on your website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                2. GitHub Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When you authenticate with GitHub, we access:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Your public profile information (username, name, avatar)</li>
                <li>Your public repositories</li>
                <li>Repository statistics (stars, forks, watchers)</li>
                <li>Repository topics and languages</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">
                We do not access your private repositories or any private GitHub data.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3. How We Use Your Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Create and display your project showcases</li>
                <li>Provide the widget functionality</li>
                <li>Improve our service and user experience</li>
                <li>Respond to your support requests</li>
                <li>Send important service updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Data Storage and Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Currently, showcase data is stored in memory on our servers. This means:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Data may be lost if the server restarts</li>
                <li>We are working on implementing persistent storage</li>
                <li>Your data is not shared with third parties</li>
                <li>We use industry-standard security measures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Cookies and Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use minimal cookies and tracking:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Session cookies for authentication</li>
                <li>Basic analytics to improve our service</li>
                <li>No third-party tracking or advertising</li>
                <li>No personal data is sold to advertisers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Data Sharing
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>When required by law</li>
                <li>To protect our rights and safety</li>
                <li>With your explicit consent</li>
                <li>To service providers who help us operate the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Your Rights
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Update or correct your information</li>
                <li>Export your showcase data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Data Retention
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We retain your data for as long as:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Your account is active</li>
                <li>Your showcases are being used</li>
                <li>Required to provide our service</li>
                <li>Required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Children&apos;s Privacy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                DevShelf is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Changes to This Policy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Contact Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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
