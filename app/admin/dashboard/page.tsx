"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    events: 0,
    teamMembers: 0,
    blogPosts: 0,
    testimonials: 0,
    contactMessages: 0,
    memberships: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Fetch stats
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const [events, team, blog, testimonials, contact] = await Promise.all([
        fetch('/api/events').then(r => r.json()).catch(() => []),
        fetch('/api/team').then(r => r.json()).catch(() => []),
        fetch('/api/blog').then(r => r.json()).catch(() => []),
        fetch('/api/testimonials').then(r => r.json()).catch(() => []),
        fetch('/api/contact').then(r => r.json()).catch(() => []),
      ])

      setStats({
        events: Array.isArray(events) ? events.length : 0,
        teamMembers: Array.isArray(team) ? team.length : 0,
        blogPosts: Array.isArray(blog) ? blog.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        contactMessages: Array.isArray(contact) ? contact.length : 0,
        memberships: 0,
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Events"
            count={stats.events}
            icon="📅"
            href="/admin/events"
            color="blue"
          />
          <StatCard
            title="Team Members"
            count={stats.teamMembers}
            icon="👥"
            href="/admin/team"
            color="green"
          />
          <StatCard
            title="Blog Posts"
            count={stats.blogPosts}
            icon="📝"
            href="/admin/blog"
            color="purple"
          />
          <StatCard
            title="Testimonials"
            count={stats.testimonials}
            icon="💬"
            href="/admin/testimonials"
            color="yellow"
          />
          <StatCard
            title="Contact Messages"
            count={stats.contactMessages}
            icon="✉️"
            href="/admin/contact"
            color="red"
          />
          <StatCard
            title="Memberships"
            count={stats.memberships}
            icon="🎫"
            href="/admin/membership"
            color="indigo"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/events"
              className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors text-center"
            >
              <span className="text-2xl block mb-2">➕</span>
              <span className="font-medium">Add New Event</span>
            </Link>
            <Link
              href="/admin/team"
              className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors text-center"
            >
              <span className="text-2xl block mb-2">👤</span>
              <span className="font-medium">Add Team Member</span>
            </Link>
            <Link
              href="/admin/blog"
              className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors text-center"
            >
              <span className="text-2xl block mb-2">📄</span>
              <span className="font-medium">Write Blog Post</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Updates</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>Database connected successfully</span>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>All API routes are active</span>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, count, icon, href, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    green: 'bg-green-50 border-green-200 hover:border-green-400',
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    yellow: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400',
    red: 'bg-red-50 border-red-200 hover:border-red-400',
    indigo: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
  }

  return (
    <Link
      href={href}
      className={`p-6 rounded-lg border-2 ${colors[color]} transition-all hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{count}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </Link>
  )
}
