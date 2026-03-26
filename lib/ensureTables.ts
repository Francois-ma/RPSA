import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

let tablesEnsured = false

/** Resolve the writable database path. On Vercel the bundle is read-only so we
 *  copy the seeded DB into /tmp on the first invocation. */
export function getDbPath(): string {
  const bundledDb = path.join(process.cwd(), 'prisma', 'dev.db')
  
  // Local dev — just use the project db directly
  if (!process.env.VERCEL) return bundledDb
  
  // On Vercel — copy to /tmp if not already there
  const tmpDb = '/tmp/dev.db'
  if (!fs.existsSync(tmpDb)) {
    if (fs.existsSync(bundledDb)) {
      fs.copyFileSync(bundledDb, tmpDb)
      console.log('Copied bundled DB to /tmp/dev.db')
    } else {
      console.log('No bundled DB found, will create fresh at /tmp/dev.db')
    }
  }
  return tmpDb
}

export async function ensureTables() {
  if (tablesEnsured) return
  
  const dbPath = getDbPath()
  
  try {
    const db = new Database(dbPath)
    
    db.exec(`CREATE TABLE IF NOT EXISTS "User" ("id" TEXT NOT NULL PRIMARY KEY, "email" TEXT NOT NULL, "password" TEXT NOT NULL, "name" TEXT NOT NULL, "role" TEXT NOT NULL DEFAULT 'admin', "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`)
    db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`)
    db.exec(`CREATE TABLE IF NOT EXISTS "Event" ("id" TEXT NOT NULL PRIMARY KEY, "title" TEXT NOT NULL, "date" TEXT NOT NULL, "time" TEXT NOT NULL, "location" TEXT NOT NULL, "category" TEXT NOT NULL, "image" TEXT NOT NULL, "description" TEXT NOT NULL, "attendees" INTEGER NOT NULL DEFAULT 0, "isPast" BOOLEAN NOT NULL DEFAULT false, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "TeamMember" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "role" TEXT NOT NULL, "image" TEXT NOT NULL, "bio" TEXT NOT NULL, "twitter" TEXT, "linkedin" TEXT, "email" TEXT NOT NULL, "order" INTEGER NOT NULL DEFAULT 0, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "BlogPost" ("id" TEXT NOT NULL PRIMARY KEY, "title" TEXT NOT NULL, "excerpt" TEXT NOT NULL, "content" TEXT NOT NULL, "author" TEXT NOT NULL, "authorImage" TEXT NOT NULL, "date" TEXT NOT NULL, "category" TEXT NOT NULL, "tags" TEXT NOT NULL, "image" TEXT NOT NULL, "readTime" TEXT NOT NULL, "published" BOOLEAN NOT NULL DEFAULT true, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "Testimonial" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "role" TEXT NOT NULL, "image" TEXT NOT NULL, "quote" TEXT NOT NULL, "order" INTEGER NOT NULL DEFAULT 0, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "Membership" ("id" TEXT NOT NULL PRIMARY KEY, "firstName" TEXT NOT NULL, "lastName" TEXT NOT NULL, "email" TEXT NOT NULL, "phone" TEXT, "tier" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'pending', "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`)
    db.exec(`CREATE TABLE IF NOT EXISTS "ContactMessage" ("id" TEXT NOT NULL PRIMARY KEY, "firstName" TEXT NOT NULL, "lastName" TEXT NOT NULL, "email" TEXT NOT NULL, "subject" TEXT NOT NULL, "message" TEXT NOT NULL, "read" BOOLEAN NOT NULL DEFAULT false, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`)
    
    // Seed admin user if missing
    const adminExists = db.prepare(`SELECT COUNT(*) as count FROM "User" WHERE email = ?`).get('admin@rpsa.rw') as { count: number }
    if (!adminExists || adminExists.count === 0) {
      const id = 'c' + Math.random().toString(36).slice(2) + Date.now().toString(36)
      const now = new Date().toISOString()
      db.prepare(`INSERT INTO "User" ("id", "email", "password", "name", "role", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .run(id, 'admin@rpsa.rw', '$2b$10$ejJW2XgArFEocykRIkBR8uW0b9u1EgC6zZ1AjmYGFI6voZR5x9Vq.', 'Admin', 'admin', now, now)
      console.log('Seeded admin user via ensureTables')
    }
    
    db.close()
    tablesEnsured = true
    console.log('ensureTables: OK (db at', dbPath, ')')
  } catch (e) {
    console.error('Failed to ensure tables at', dbPath, ':', e)
    throw e
  }
}
