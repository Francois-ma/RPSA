import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureTables } from '@/lib/ensureTables'

// GET single testimonial
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTables()
    const { id } = await params
    const testimonial = await prisma.testimonial.findUnique({ where: { id } })
    if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 })
  }
}

// PUT update testimonial
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTables()
    const { id } = await params
    const body = await request.json()
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        quote: body.quote,
        order: body.order,
      },
    })
    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

// DELETE testimonial
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTables()
    const { id } = await params
    await prisma.testimonial.delete({ where: { id } })
    return NextResponse.json({ message: 'Testimonial deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
