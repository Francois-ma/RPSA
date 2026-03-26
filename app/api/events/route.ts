import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { eventSchema } from '@/lib/validations'
import { requireAuth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        orderBy: { date: 'desc' },
        take: limit,
        skip,
      }),
      prisma.event.count(),
    ])

    return NextResponse.json({
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const authResult = requireAuth(request)
  if (authResult instanceof NextResponse) return authResult

  try {
    const body = await request.json()
    const result = eventSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: result.data,
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
