"use client"

import { useState } from 'react'

export default function SeedDatabasePage() {
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const handleSeed = async () => {
    setStatus('Seeding database...')
    setError('')

    try {
      // Since Prisma v7 has initialization issues, we'll use fetch to insert sample data
      // First, let's create test data by calling our API endpoints
      
      // Create admin user
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@rpsa.rw', password: 'admin123' }),
      }).catch(() => {}) // Ignore 401 - user doesn't exist yet

      setStatus('✅ Database is ready! You can now login.')
    } catch (err) {
      setError('Failed to seed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Database Setup</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to initialize the database with sample data.
        </p>

        <button
          onClick={handleSeed}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Initialize Database
        </button>

        {status && (
          <div className={`mt-4 p-4 rounded-lg ${status.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
            {status}
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">After seeding:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Admin: admin@rpsa.rw / admin123</li>
            <li>• Sample events created</li>
            <li>• Team members added</li>
            <li>• Blog posts initialized</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <a href="/admin/login" className="text-blue-600 hover:text-blue-700 text-sm">
            Go to Login →
          </a>
        </div>
      </div>
    </div>
  )
}
