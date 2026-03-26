import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all contact messages
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
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
    const message = await prisma.contactMessage.create({
      data: {
        id: crypto.randomUUID(),
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        subject: body.subject,
        message: body.message,
        updatedAt: new Date(),
      },
    })
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
