import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET single event by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: event, error } = await supabase
      .from('Event')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !event) {
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { data: event, error } = await supabase
      .from('Event')
      .update({
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        category: body.category,
        image: body.image,
        description: body.description,
        attendees: body.attendees,
        isPast: body.isPast,
      })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabase.from('Event').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
