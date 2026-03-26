import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single event by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

// PUT update event
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        category: body.category,
        image: body.image,
        description: body.description,
        attendees: body.attendees,
        isPast: body.isPast,
        updatedAt: new Date(),
      },
    })
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

// DELETE event
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
