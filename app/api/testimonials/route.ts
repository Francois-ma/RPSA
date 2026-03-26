import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { testimonialSchema } from '@/lib/validations'
import { requireAuth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        orderBy: { order: 'asc' },
        take: limit,
        skip,
      }),
      prisma.testimonial.count(),
    ])

    return NextResponse.json({
      data: testimonials,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const authResult = requireAuth(request)
  if (authResult instanceof NextResponse) return authResult

  try {
    const body = await request.json()
    const result = testimonialSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.create({
      data: result.data,
    })
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
