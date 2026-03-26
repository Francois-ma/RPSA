import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureTables } from '@/lib/ensureTables'

// GET all team members
export async function GET() {
  try {
    await ensureTables()
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    })
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
    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        bio: body.bio,
        twitter: body.twitter,
        linkedin: body.linkedin,
        email: body.email,
        order: body.order || 0,
      },
    })
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}
