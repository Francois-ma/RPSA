import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureTables } from '@/lib/ensureTables'
import * as bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    await ensureTables()
    const body = await request.json()
    const { email, password } = body

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create a simple token (in production use JWT or NextAuth.js)
    const token = `admin_${user.id}_${Date.now()}`

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
