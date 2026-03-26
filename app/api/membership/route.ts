import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all membership applications
export async function GET() {
  try {
    const memberships = await prisma.membership.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(memberships)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch memberships' },
      { status: 500 }
    )
  }
}

// POST create new membership application
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const membership = await prisma.membership.create({
      data: {
        id: crypto.randomUUID(),
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone || null,
        tier: body.tier,
        updatedAt: new Date(),
      },
    })
    return NextResponse.json(membership, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create membership application' },
      { status: 500 }
    )
  }
}
