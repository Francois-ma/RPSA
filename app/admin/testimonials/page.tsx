"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Testimonial {
  id: string
  name: string
  role: string
  image: string
  content: string
  rating: number
  order: number
}

export default function AdminTestimonials() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '', role: '', image: '', content: '', rating: 5, order: 0,
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) { router.push('/admin/login'); return }
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {
    try {
      const res = await fetch('/api/testimonials')
      const data = await res.json()
      if (Array.isArray(data)) setTestimonials(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  function openNew() {
    setEditingItem(null)
    setFormData({ name: '', role: '', image: '', content: '', rating: 5, order: testimonials.length })
    setShowForm(true)
  }

  function openEdit(item: Testimonial) {
    setEditingItem(item)
    setFormData({
      name: item.name, role: item.role, image: item.image,
      content: item.content, rating: item.rating, order: item.order,
    })
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editingItem ? `/api/testimonials/${editingItem.id}` : '/api/testimonials'
      const method = editingItem ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setShowForm(false)
        fetchTestimonials()
      } else { alert('Failed to save testimonial') }
    } catch (e) { alert('Error saving') }
    finally { setSaving(false) }
  }

  async function deleteTestimonial(id: string) {
    if (!confirm('Delete this testimonial?')) return
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      fetchTestimonials()
    } catch (e) { console.error(e) }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    setFormData({ ...formData, [e.target.name]: val })
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-xl">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-700 text-sm">← Back to Dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Manage Testimonials</h1>
          </div>
          <button onClick={openNew} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ New Testimonial</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
              <h2 className="text-2xl font-bold mb-4">{editingItem ? 'Edit' : 'New'} Testimonial</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input name="name" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title *</label>
                  <input name="role" required value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Pharmacist, Kigali" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Content *</label>
                  <textarea name="content" required rows={4} value={formData.content} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input name="image" value={formData.image} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                    <input name="rating" type="number" min={1} max={5} value={formData.rating} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input name="order" type="number" min={0} value={formData.order} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-300">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cards */}
        {testimonials.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">No testimonials yet</p>
            <button onClick={openNew} className="text-blue-600 hover:text-blue-700 font-medium">Add first testimonial →</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">&ldquo;{t.content}&rdquo;</p>
                <div className="flex gap-3">
                  <button onClick={() => openEdit(t)} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Edit</button>
                  <button onClick={() => deleteTestimonial(t.id)} className="text-sm text-red-600 hover:text-red-700 font-medium">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
