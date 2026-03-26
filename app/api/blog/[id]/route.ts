import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureTables } from '@/lib/ensureTables'

// GET single blog post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTables()
    const { id } = await params
    const post = await prisma.blogPost.findUnique({ where: { id } })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
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
    await ensureTables()
    const { id } = await params
    const body = await request.json()
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
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
      },
    })
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
    await ensureTables()
    const { id } = await params
    await prisma.blogPost.delete({ where: { id } })
    return NextResponse.json({ message: 'Blog post deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
