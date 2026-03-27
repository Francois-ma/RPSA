import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all contact messages
export async function GET() {
  try {
    const { data: messages, error } = await supabase
      .from('ContactMessage')
      .select('*')
      .order('createdAt', { ascending: false })
    if (error) throw error
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}

// POST create new contact message
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data: message, error } = await supabase
      .from('ContactMessage')
      .insert({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        subject: body.subject,
        message: body.message,
      })
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
