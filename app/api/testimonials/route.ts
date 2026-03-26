import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureTables } from '@/lib/ensureTables'

// GET all testimonials
export async function GET() {
  try {
    await ensureTables()
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

// POST create new testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        quote: body.quote,
        order: body.order || 0,
      },
    })
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
