// This script runs at build time to create SQLite tables and seed data
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
console.log('Setting up database at:', dbPath);

const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create all tables
db.exec(`
  CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

  CREATE TABLE IF NOT EXISTS "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attendees" INTEGER NOT NULL DEFAULT 0,
    "isPast" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "twitter" TEXT,
    "linkedin" TEXT,
    "email" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorImage" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "Membership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "tier" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log('Tables created.');

// Helper for generating IDs
function cuid() {
  return 'c' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const now = new Date().toISOString();

// Clear existing data
db.exec(`DELETE FROM "TeamMember"; DELETE FROM "Event"; DELETE FROM "BlogPost"; DELETE FROM "Testimonial";`);

// Seed Team Members
const insertTeam = db.prepare(`INSERT INTO "TeamMember" ("id", "name", "role", "image", "bio", "twitter", "linkedin", "email", "order", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const teamMembers = [
  ["Maurice Ishimwe", "President", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", "Final year pharmacy student passionate about healthcare accessibility", "#", "#", "maurice@rpsa.rw", 1],
  ["Octave Iragena", "Vice President", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", "Advocating for pharmaceutical education excellence", "#", "#", "octave@rpsa.rw", 2],
  ["Elite Tuyizere Ahanyuze", "Secretary General", "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop", "Coordinating student activities and communications", "#", "#", "elite@rpsa.rw", 3],
  ["Leonce Igirimbabazi", "Treasurer", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", "Managing finances and resources for student programs", "#", "#", "leonce@rpsa.rw", 4],
  ["Pacifique Ahishakiye", "Events Coordinator", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", "Planning and executing memorable association events", "#", "#", "pacifique@rpsa.rw", 5],
  ["Eugene Rusanganira", "Outreach Director", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop", "Leading community health initiatives and partnerships", "#", "#", "eugene@rpsa.rw", 6],
  ["Fabrice Ishimwe", "Communications Lead", "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop", "Managing social media and member communications", "#", "#", "fabrice@rpsa.rw", 7],
  ["Isaie Hakizimana", "Academic Affairs", "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=400&fit=crop", "Supporting academic excellence and student success", "#", "#", "isaie@rpsa.rw", 8],
];
for (const m of teamMembers) {
  insertTeam.run(cuid(), ...m, now, now);
}
console.log(`Seeded ${teamMembers.length} team members.`);

// Seed Events
const insertEvent = db.prepare(`INSERT INTO "Event" ("id", "title", "date", "time", "location", "category", "image", "description", "attendees", "isPast", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const events = [
  ["Annual Pharmacy Conference 2026", "2026-04-15", "9:00 AM - 5:00 PM", "Kigali Convention Centre", "Conference", "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop", "Join us for our flagship annual conference bringing together pharmacy students, professionals, and industry leaders from across East Africa.", 250, 0],
  ["Clinical Pharmacy Workshop", "2026-03-28", "2:00 PM - 6:00 PM", "RPSA Training Center", "Workshop", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop", "Hands-on clinical pharmacy workshop focusing on patient counseling and pharmaceutical care practices.", 80, 0],
  ["Health Outreach Program - Musanze", "2026-03-30", "8:00 AM - 4:00 PM", "Musanze District", "Outreach", "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop", "Community health outreach providing free medication counseling and health screenings.", 45, 0],
  ["Pharmaceutical Research Symposium", "2026-02-20", "10:00 AM - 3:00 PM", "University of Rwanda", "Symposium", "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop", "Student-led research presentations showcasing innovative pharmaceutical studies.", 120, 1],
];
for (const e of events) {
  insertEvent.run(cuid(), ...e, now, now);
}
console.log(`Seeded ${events.length} events.`);

// Seed Blog Posts
const insertBlog = db.prepare(`INSERT INTO "BlogPost" ("id", "title", "excerpt", "content", "author", "authorImage", "date", "category", "tags", "image", "readTime", "published", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const blogs = [
  ["The Future of Pharmaceutical Care in Rwanda", "Exploring emerging trends in pharmacy practice and how students can prepare.", "The pharmaceutical landscape in Rwanda is evolving rapidly with advancements in digital health and personalized medicine.", "Maurice Ishimwe", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop", "2026-03-15", "Healthcare", "Pharmacy,Future,Healthcare", "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop", "5 min read", 1],
  ["Student Spotlight: Research Excellence Awards", "Celebrating outstanding research achievements by pharmacy students.", "Our recent Pharmaceutical Research Symposium showcased exceptional work by pharmacy students across Rwanda.", "Octave Iragena", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", "2026-03-10", "Students", "Research,Awards,Students", "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop", "4 min read", 1],
  ["Community Impact: Musanze Health Outreach", "Recap of our successful community health outreach program.", "Our recent health outreach program in Musanze District brought free medication counseling to hundreds of community members.", "Eugene Rusanganira", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop", "2026-03-05", "Community", "Outreach,Community,Health", "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop", "6 min read", 1],
  ["Tips for Pharmacy Students: Exam Preparation", "Expert advice and study strategies to help you excel.", "Preparing for pharmacy exams requires strategic planning and effective study techniques.", "Isaie Hakizimana", "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop", "2026-02-28", "Education", "Study Tips,Exams,Education", "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop", "7 min read", 1],
  ["Partnership Announcement: Global Pharmacy Network", "RPSA joins international network connecting pharmacy students worldwide.", "We are thrilled to announce RPSA membership in the Global Pharmacy Student Network.", "Elite Tuyizere Ahanyuze", "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop", "2026-02-22", "Partnerships", "Partnership,International,Network", "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop", "5 min read", 1],
  ["Career Guide: Opportunities in Clinical Pharmacy", "Exploring diverse career paths in clinical pharmacy.", "Clinical pharmacy offers a wide range of career opportunities from hospital settings to community pharmacies.", "Pacifique Ahishakiye", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop", "2026-02-18", "Career", "Career,Clinical Pharmacy,Opportunities", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop", "8 min read", 1],
];
for (const b of blogs) {
  insertBlog.run(cuid(), ...b, now, now);
}
console.log(`Seeded ${blogs.length} blog posts.`);

// Seed Testimonials
const insertTestimonial = db.prepare(`INSERT INTO "Testimonial" ("id", "name", "role", "image", "quote", "order", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
const testimonials = [
  ["Alice Mukamana", "3rd Year Pharmacy Student", "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop", "RPSA has been instrumental in my growth as a pharmacy student. The networking opportunities and workshops have prepared me for my future career.", 1],
  ["Patrick Uwizeyimana", "Recent Graduate", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop", "The professional development programs and mentorship I received through RPSA helped me land my dream job at a leading hospital.", 2],
  ["Diane Ingabire", "2nd Year Pharmacy Student", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop", "Being part of RPSA's community outreach programs has shown me the real impact pharmacists can have on people's lives.", 3],
];
for (const t of testimonials) {
  insertTestimonial.run(cuid(), ...t, now, now);
}
console.log(`Seeded ${testimonials.length} testimonials.`);

db.close();
console.log('Database setup complete!');
