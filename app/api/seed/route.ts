import { NextResponse } from 'next/server'
import * as bcrypt from 'bcryptjs'

// This is a temporary seed endpoint - remove after first use
export async function POST() {
  try {
    // We'll use direct SQL for seeding since Prisma Client v7 has initialization issues
    const sqlite3 = require('sqlite3')
    const path = require('path')
    
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
    const db = new sqlite3.Database(dbPath)

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    db.serialize(() => {
      // Insert User
      db.run(
        `INSERT INTO User (id, email, password, name, role, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        ['user-1', 'admin@rpsa.rw', hashedPassword, 'Admin User', 'admin']
      )

      // Insert Events
      db.run(
        `INSERT INTO Event (id, title, date, time, location, category, image, description, attendees, isPast, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        ['event-1', 'Annual Pharmacy Conference 2026', '2026-04-15', '9:00 AM - 5:00 PM', 'Kigali Convention Centre', 'Conference', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop', 'Join us for our flagship annual conference', 250, 0]
      )

      // Insert Team Members
      db.run(
        `INSERT INTO TeamMember (id, name, role, image, bio, twitter, linkedin, email, "order", createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        ['team-1', 'Emmanuel Habimana', 'President', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', 'Final year pharmacy student', '#', '#', 'emmanuel@rpsa.rw', 1]
      )

      db.close()
    })

    return NextResponse.json({ 
      message: 'Database seeded successfully!',
      user: { email: 'admin@rpsa.rw', password: 'admin123' }
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', details: error instanceof Error ? error.message : error },
      { status: 500 }
    )
  }
}
