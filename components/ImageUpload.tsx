"use client"

import { useState, useRef, useCallback } from 'react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [mode, setMode] = useState<'upload' | 'url'>(value && value.startsWith('http') ? 'url' : 'upload')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        onChange(data.url)
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }, [onChange])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) handleUpload(file)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="flex gap-1 text-xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded ${mode === 'upload' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded ${mode === 'url' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {value ? (
            <div className="flex items-center gap-3">
              <img
                src={value}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-lg border"
              />
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm text-gray-700 truncate">{value}</p>
                <p className="text-xs text-gray-500 mt-1">Click or drag to replace</p>
              </div>
            </div>
          ) : (
            <div className="py-2">
              <div className="text-3xl mb-1">📷</div>
              <p className="text-sm text-gray-600">
                {uploading ? 'Uploading...' : 'Click to select or drag & drop an image'}
              </p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WebP • Max 5MB</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
          {value && (
            <img
              src={value}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-lg border mt-2"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          )}
        </div>
      )}
    </div>
  )
}
