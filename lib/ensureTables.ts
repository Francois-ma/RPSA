import Database from 'better-sqlite3'
import path from 'path'

let tablesEnsured = false

export async function ensureTables() {
  if (tablesEnsured) return
  
  try {
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
    const db = new Database(dbPath)
    
    db.exec(`CREATE TABLE IF NOT EXISTS "User" ("id" TEXT NOT NULL PRIMARY KEY, "email" TEXT NOT NULL, "password" TEXT NOT NULL, "name" TEXT NOT NULL, "role" TEXT NOT NULL DEFAULT 'admin', "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL)`)
    db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`)
    db.exec(`CREATE TABLE IF NOT EXISTS "Event" ("id" TEXT NOT NULL PRIMARY KEY, "title" TEXT NOT NULL, "date" TEXT NOT NULL, "time" TEXT NOT NULL, "location" TEXT NOT NULL, "category" TEXT NOT NULL, "image" TEXT NOT NULL, "description" TEXT NOT NULL, "attendees" INTEGER NOT NULL DEFAULT 0, "isPast" BOOLEAN NOT NULL DEFAULT false, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "TeamMember" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "role" TEXT NOT NULL, "image" TEXT NOT NULL, "bio" TEXT NOT NULL, "twitter" TEXT, "linkedin" TEXT, "email" TEXT NOT NULL, "order" INTEGER NOT NULL DEFAULT 0, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "BlogPost" ("id" TEXT NOT NULL PRIMARY KEY, "title" TEXT NOT NULL, "excerpt" TEXT NOT NULL, "content" TEXT NOT NULL, "author" TEXT NOT NULL, "authorImage" TEXT NOT NULL, "date" TEXT NOT NULL, "category" TEXT NOT NULL, "tags" TEXT NOT NULL, "image" TEXT NOT NULL, "readTime" TEXT NOT NULL, "published" BOOLEAN NOT NULL DEFAULT true, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "Testimonial" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "role" TEXT NOT NULL, "image" TEXT NOT NULL, "quote" TEXT NOT NULL, "order" INTEGER NOT NULL DEFAULT 0, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "Membership" ("id" TEXT NOT NULL PRIMARY KEY, "firstName" TEXT NOT NULL, "lastName" TEXT NOT NULL, "email" TEXT NOT NULL, "phone" TEXT, "tier" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'pending', "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "ContactMessage" ("id" TEXT NOT NULL PRIMARY KEY, "firstName" TEXT NOT NULL, "lastName" TEXT NOT NULL, "email" TEXT NOT NULL, "subject" TEXT NOT NULL, "message" TEXT NOT NULL, "read" BOOLEAN NOT NULL DEFAULT false, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL)`)
    
    db.close()
    tablesEnsured = true
  } catch (e) {
    console.error('Failed to ensure tables:', e)
  }
}
