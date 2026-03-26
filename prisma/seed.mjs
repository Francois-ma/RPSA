import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const adapter = new PrismaBetterSqlite3({
  url: `file:${path.join(__dirname, 'dev.db')}`,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@rpsa.rw' },
    update: {},
    create: {
      email: 'admin@rpsa.rw',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })
  console.log('✅ Admin user created (email: admin@rpsa.rw, password: admin123)')

  // Create events
  const events = [
    {
      title: 'Annual Pharmacy Conference 2026',
      date: '2026-04-15',
      time: '9:00 AM - 5:00 PM',
      location: 'Kigali Convention Centre',
      category: 'Conference',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
      description: 'Join us for our flagship annual conference bringing together pharmacy students, professionals, and industry leaders from across East Africa.',
      attendees: 250,
      isPast: false,
    },
    {
      title: 'Clinical Pharmacy Workshop',
      date: '2026-03-28',
      time: '2:00 PM - 6:00 PM',
      location: 'RPSA Training Center',
      category: 'Workshop',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
      description: 'Hands-on clinical pharmacy workshop focusing on patient counseling, medication therapy management, and pharmaceutical care practices.',
      attendees: 80,
      isPast: false,
    },
    {
      title: 'Health Outreach Program - Musanze',
      date: '2026-03-30',
      time: '8:00 AM - 4:00 PM',
      location: 'Musanze District',
      category: 'Outreach',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop',
      description: 'Community health outreach providing free medication counseling, health screenings, and pharmaceutical education to underserved communities.',
      attendees: 45,
      isPast: false,
    },
  ]

  for (const event of events) {
    await prisma.event.create({ data: event })
  }
  console.log('✅ Events created')

  // Create team members
  const teamMembers = [
    {
      name: 'Emmanuel Habimana',
      role: 'President',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      bio: 'Final year pharmacy student passionate about healthcare accessibility',
      twitter: '#',
      linkedin: '#',
      email: 'emmanuel@rpsa.rw',
      order: 1,
    },
    {
      name: 'Grace Uwase',
      role: 'Vice President',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: 'Advocating for pharmaceutical education excellence',
      twitter: '#',
      linkedin: '#',
      email: 'grace@rpsa.rw',
      order: 2,
    },
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member })
  }
  console.log('✅ Team members created')

  // Create blog posts
  const blogPosts = [
    {
      title: 'The Future of Pharmaceutical Care in Rwanda',
      excerpt: 'Exploring emerging trends in pharmacy practice and how students can prepare for the evolving healthcare landscape.',
      content: 'Full article content here...',
      author: 'Emmanuel Habimana',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      date: '2026-03-15',
      category: 'Healthcare',
      tags: 'Pharmacy,Future,Healthcare',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
      readTime: '5 min read',
      published: true,
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post })
  }
  console.log('✅ Blog posts created')

  // Create testimonials
  const testimonials = [
    {
      name: 'Alice Mukamana',
      role: '3rd Year Pharmacy Student',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
      quote: 'RPSA has been instrumental in my growth as a pharmacy student. The networking opportunities and workshops have prepared me for my future career.',
      order: 1,
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial })
  }
  console.log('✅ Testimonials created')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
