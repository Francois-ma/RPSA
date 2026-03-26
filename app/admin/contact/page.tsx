"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export default function AdminContact() {
  const router = useRouter()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) { router.push('/admin/login'); return }
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      if (Array.isArray(data)) setMessages(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-xl">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-700 text-sm">← Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Contact Messages</h1>
          <p className="text-gray-500 mt-1">{messages.length} message{messages.length !== 1 ? 's' : ''}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Detail Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    From: <span className="font-medium text-gray-700">{selectedMessage.name}</span> ({selectedMessage.email})
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(selectedMessage.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 text-center font-medium">Reply via Email</a>
                <button onClick={() => setSelectedMessage(null)} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-300 font-medium">Close</button>
              </div>
            </div>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No contact messages yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} onClick={() => setSelectedMessage(msg)} className="bg-white rounded-lg shadow p-5 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900 truncate">{msg.subject}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">From: {msg.name} &lt;{msg.email}&gt;</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{msg.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
