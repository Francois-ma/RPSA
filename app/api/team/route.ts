import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { teamMemberSchema } from '@/lib/validations'
import { requireAuth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const [members, total] = await Promise.all([
      prisma.teamMember.findMany({
        orderBy: { order: 'asc' },
        take: limit,
        skip,
      }),
      prisma.teamMember.count(),
    ])

    return NextResponse.json({
      data: members,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const authResult = requireAuth(request)
  if (authResult instanceof NextResponse) return authResult

  try {
    const body = await request.json()
    const result = teamMemberSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const member = await prisma.teamMember.create({
      data: result.data,
    })
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}
