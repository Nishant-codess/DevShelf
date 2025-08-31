'use client'

import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeDebug() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="fixed top-20 left-4 z-50 p-4 bg-white dark:bg-dark-accent border border-gray-200 dark:border-dark-secondary rounded-lg shadow-lg">
      <div className="text-sm">
        <p>Current Theme: <strong>{theme}</strong></p>
        <p>HTML Classes: <code>{typeof document !== 'undefined' ? document.documentElement.className : 'N/A'}</code></p>
        <button 
          onClick={toggleTheme}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  )
}
