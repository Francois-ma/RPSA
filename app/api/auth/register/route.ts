import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, yearOfStudy } = body

    // Validate required fields
    if (!name || !email || !password || !yearOfStudy) {
      return NextResponse.json(
        { error: 'All fields are required (name, email, password, yearOfStudy)' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('User')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with role 'member'
    const { data: newUser, error } = await supabase
      .from('User')
      .insert({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'member',
        yearOfStudy,
      })
      .select('id, name, email, role, yearOfStudy')
      .single()

    if (error) {
      console.error('Registration error:', error)
      return NextResponse.json(
        { error: 'Failed to create account. Please try again.' },
        { status: 500 }
      )
    }

    // Create a simple token
    const token = `user_${newUser.id}_${Date.now()}`

    return NextResponse.json({
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        yearOfStudy: newUser.yearOfStudy,
      },
    }, { status: 201 })
  } catch (error: unknown) {
    console.error('Registration error:', error)
    const message = error instanceof Error ? error.message : 'Registration failed'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
