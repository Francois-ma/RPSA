import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all testimonials
export async function GET() {
  try {
    const { data: testimonials, error } = await supabase
      .from('Testimonial')
      .select('*')
      .order('order', { ascending: true })
    if (error) throw error
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
    const { data: testimonial, error } = await supabase
      .from('Testimonial')
      .insert({
        name: body.name,
        role: body.role,
        image: body.image,
        quote: body.quote,
        order: body.order || 0,
      })
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
