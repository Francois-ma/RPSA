import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all events
export async function GET() {
  try {
    const { data: events, error } = await supabase
      .from('Event')
      .select('*')
      .order('date', { ascending: false })
    if (error) throw error
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
    const { data: event, error } = await supabase
      .from('Event')
      .insert({
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        category: body.category,
        image: body.image,
        description: body.description,
        attendees: body.attendees || 0,
        isPast: body.isPast || false,
      })
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
