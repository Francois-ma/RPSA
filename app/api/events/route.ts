import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST create new event
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const event = await prisma.event.create({
      data: {
        id: crypto.randomUUID(),
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        category: body.category,
        image: body.image,
        description: body.description,
        attendees: body.attendees || 0,
        isPast: body.isPast || false,
        updatedAt: new Date(),
      },
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
