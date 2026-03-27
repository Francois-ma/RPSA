import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, GIF, WebP, SVG' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg'
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    // Upload to Supabase Storage
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(uniqueName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) throw uploadError

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(uniqueName)

    return NextResponse.json({ url: publicUrl, filename: uniqueName })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
