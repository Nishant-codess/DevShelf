'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Activity } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function StatusPage() {
  const router = useRouter()

  // Mock status data - in a real app, this would come from an API
  const systemStatus = {
    overall: 'operational',
    services: [
      {
        name: 'Website',
        status: 'operational',
        uptime: '99.9%',
        lastIncident: null
      },
      {
        name: 'API',
        status: 'operational',
        uptime: '99.8%',
        lastIncident: null
      },
      {
        name: 'GitHub Integration',
        status: 'operational',
        uptime: '99.7%',
        lastIncident: null
      },
      {
        name: 'Widget Service',
        status: 'operational',
        uptime: '99.9%',
        lastIncident: null
      }
    ],
    incidents: [] as Array<{ title: string; date: string; description: string }>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'outage':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5" />
      case 'degraded':
        return <AlertCircle className="w-5 h-5" />
      case 'outage':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

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
              System Status
            </h1>
          </div>
        </motion.div>

        {/* Overall Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                DevShelf System Status
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Real-time status of all DevShelf services
              </p>
            </div>
          </div>

          {/* Overall Status Badge */}
          <div className="flex items-center space-x-4 mb-6">
            <div className={`px-4 py-2 rounded-full flex items-center space-x-2 ${getStatusColor(systemStatus.overall)}`}>
              {getStatusIcon(systemStatus.overall)}
              <span className="font-semibold capitalize">{systemStatus.overall}</span>
            </div>
            <span className="text-gray-600 dark:text-gray-300">
              All systems are running normally
            </span>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemStatus.services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="border border-gray-200 dark:border-dark-accent rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {service.name}
                  </h3>
                  <div className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${getStatusColor(service.status)}`}>
                    {getStatusIcon(service.status)}
                    <span className="capitalize">{service.status}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div>Uptime: {service.uptime}</div>
                  {service.lastIncident && (
                    <div>Last incident: {service.lastIncident}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Incidents
          </h3>
          
          {systemStatus.incidents.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">
                No incidents reported in the last 90 days
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {systemStatus.incidents.map((incident, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {incident.title}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {incident.date}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {incident.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-dark-secondary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-dark-accent mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Performance Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-blue mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">Overall Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-purple mb-2">&lt; 200ms</div>
              <div className="text-gray-600 dark:text-gray-300">Average Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-teal mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Monitoring</div>
            </div>
          </div>
        </motion.div>

        {/* Subscribe to Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Stay Updated
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Get notified about system updates and incidents
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="https://github.com/Nishant-codess/DevShelf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-neon-blue rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Follow on GitHub
            </a>
            <a
              href="mailto:nishant.ranjan.air1@gmail.com"
              className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
