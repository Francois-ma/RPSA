import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all blog posts
export async function GET() {
  try {
    const { data: posts, error } = await supabase()
      .from('BlogPost')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })
    if (error) throw error
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST create new blog post
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data: post, error } = await supabase()
      .from('BlogPost')
      .insert({
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
        published: body.published !== undefined ? body.published : true,
      })
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
