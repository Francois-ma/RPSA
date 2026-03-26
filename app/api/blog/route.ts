import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all blog posts
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
    })
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
    const post = await prisma.blogPost.create({
      data: {
        id: crypto.randomUUID(),
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
        updatedAt: new Date(),
      },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
