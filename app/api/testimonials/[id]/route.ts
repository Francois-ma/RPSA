import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET single testimonial
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: testimonial, error } = await supabase
      .from('Testimonial')
      .select('*')
      .eq('id', id)
      .single()
    if (error || !testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 })
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
    const { id } = await params
    const body = await request.json()
    const { data: testimonial, error } = await supabase
      .from('Testimonial')
      .update({
        name: body.name,
        role: body.role,
        image: body.image,
        quote: body.quote,
        order: body.order,
      })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
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
    const { id } = await params
    const { error } = await supabase.from('Testimonial').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Testimonial deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
