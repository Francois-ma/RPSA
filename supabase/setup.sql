-- =============================================
-- RPSA Database Setup for Supabase
-- Run this in the Supabase SQL Editor
-- =============================================

-- Blog Posts
CREATE TABLE IF NOT EXISTS "BlogPost" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" text NOT NULL,
  "excerpt" text NOT NULL,
  "content" text NOT NULL,
  "author" text NOT NULL,
  "authorImage" text NOT NULL,
  "date" text NOT NULL,
  "category" text NOT NULL,
  "tags" text NOT NULL,
  "image" text NOT NULL,
  "readTime" text NOT NULL,
  "published" boolean DEFAULT true,
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS "ContactMessage" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "email" text NOT NULL,
  "subject" text NOT NULL,
  "message" text NOT NULL,
  "read" boolean DEFAULT false,
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

-- Events
CREATE TABLE IF NOT EXISTS "Event" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" text NOT NULL,
  "date" text NOT NULL,
  "time" text NOT NULL,
  "location" text NOT NULL,
  "category" text NOT NULL,
  "image" text NOT NULL,
  "description" text NOT NULL,
  "attendees" integer DEFAULT 0,
  "isPast" boolean DEFAULT false,
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

-- Memberships
CREATE TABLE IF NOT EXISTS "Membership" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "tier" text NOT NULL,
  "status" text DEFAULT 'pending',
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

-- Team Members
CREATE TABLE IF NOT EXISTS "TeamMember" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "role" text NOT NULL,
  "image" text NOT NULL,
  "bio" text NOT NULL,
  "twitter" text,
  "linkedin" text,
  "email" text NOT NULL,
  "order" integer DEFAULT 0,
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS "Testimonial" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "role" text NOT NULL,
  "image" text NOT NULL,
  "quote" text NOT NULL,
  "order" integer DEFAULT 0,
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

-- Users (admin + members)
CREATE TABLE IF NOT EXISTS "User" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "name" text NOT NULL,
  "role" text DEFAULT 'member',
  "yearOfStudy" text,
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

-- Auto-update "updatedAt" trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER set_updated_at BEFORE UPDATE ON "BlogPost" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON "ContactMessage" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON "Event" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON "Membership" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON "TeamMember" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON "Testimonial" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Storage: Create 'uploads' bucket
-- Go to Storage in Supabase dashboard and:
-- 1. Create a new bucket called "uploads"
-- 2. Set it as PUBLIC
-- 3. Add policy: allow INSERT for all (anon)
-- =============================================
