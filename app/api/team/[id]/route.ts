import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureTables } from '@/lib/ensureTables'

// GET single team member
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTables()
    const { id } = await params
    const member = await prisma.teamMember.findUnique({ where: { id } })
    if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 })
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
    await ensureTables()
    const { id } = await params
    const body = await request.json()
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        bio: body.bio,
        twitter: body.twitter,
        linkedin: body.linkedin,
        email: body.email,
        order: body.order,
      },
    })
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
    await ensureTables()
    const { id } = await params
    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ message: 'Team member deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
  }
}
