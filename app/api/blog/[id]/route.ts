import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET single blog post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: post, error } = await supabase
      .from('BlogPost')
      .select('*')
      .eq('id', id)
      .single()
    if (error || !post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}

// PUT update blog post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { data: post, error } = await supabase
      .from('BlogPost')
      .update({
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author,
        authorImage: body.authorImage,
        date: body.date,
        category: body.category,
        tags: body.tags,
        image: body.image,
        readTime: body.readTime,
        published: body.published,
      })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

// DELETE blog post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabase.from('BlogPost').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Blog post deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
