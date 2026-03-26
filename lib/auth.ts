import { NextResponse } from 'next/server'
import crypto from 'crypto'

export interface AuthUser {
  userId: string
  email: string
  role: string
}

export function verifyToken(request: Request): AuthUser | null {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null

    const token = authHeader.split(' ')[1]
    const [header, payload, signature] = token.split('.')

    const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'fallback-secret-change-me'
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64url')

    if (signature !== expectedSignature) return null

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString())

    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    }
  } catch {
    return null
  }
}

export function requireAuth(request: Request): AuthUser | NextResponse {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  return user
}
