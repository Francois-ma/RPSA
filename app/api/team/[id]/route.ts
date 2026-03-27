import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET single team member
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: member, error } = await supabase
      .from('TeamMember')
      .select('*')
      .eq('id', id)
      .single()
    if (error || !member) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 })
  }
}

// PUT update team member
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { data: member, error } = await supabase
      .from('TeamMember')
      .update({
        name: body.name,
        role: body.role,
        image: body.image,
        bio: body.bio,
        twitter: body.twitter,
        linkedin: body.linkedin,
        email: body.email,
        order: body.order,
      })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
  }
}

// DELETE team member
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabase.from('TeamMember').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Team member deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
  }
}
