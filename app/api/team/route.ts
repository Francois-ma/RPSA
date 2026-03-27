import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all team members
export async function GET() {
  try {
    const { data: members, error } = await supabase
      .from('TeamMember')
      .select('*')
      .order('order', { ascending: true })
    if (error) throw error
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

// POST create new team member
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data: member, error } = await supabase
      .from('TeamMember')
      .insert({
        name: body.name,
        role: body.role,
        image: body.image,
        bio: body.bio,
        twitter: body.twitter,
        linkedin: body.linkedin,
        email: body.email,
        order: body.order || 0,
      })
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}
