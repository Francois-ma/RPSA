import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Seed the database with real data
export async function POST() {
  try {
    // Clear existing data
    await prisma.teamMember.deleteMany()
    await prisma.event.deleteMany()
    await prisma.blogPost.deleteMany()
    await prisma.testimonial.deleteMany()

    // Seed Team Members
    const teamMembers = [
      { name: "Maurice Ishimwe", role: "President", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", bio: "Final year pharmacy student passionate about healthcare accessibility", twitter: "#", linkedin: "#", email: "maurice@rpsa.rw", order: 1 },
      { name: "Octave Iragena", role: "Vice President", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", bio: "Advocating for pharmaceutical education excellence", twitter: "#", linkedin: "#", email: "octave@rpsa.rw", order: 2 },
      { name: "Elite Tuyizere Ahanyuze", role: "Secretary General", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop", bio: "Coordinating student activities and communications", twitter: "#", linkedin: "#", email: "elite@rpsa.rw", order: 3 },
      { name: "Leonce Igirimbabazi", role: "Treasurer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", bio: "Managing finances and resources for student programs", twitter: "#", linkedin: "#", email: "leonce@rpsa.rw", order: 4 },
      { name: "Pacifique Ahishakiye", role: "Events Coordinator", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", bio: "Planning and executing memorable association events", twitter: "#", linkedin: "#", email: "pacifique@rpsa.rw", order: 5 },
      { name: "Eugene Rusanganira", role: "Outreach Director", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop", bio: "Leading community health initiatives and partnerships", twitter: "#", linkedin: "#", email: "eugene@rpsa.rw", order: 6 },
      { name: "Fabrice Ishimwe", role: "Communications Lead", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop", bio: "Managing social media and member communications", twitter: "#", linkedin: "#", email: "fabrice@rpsa.rw", order: 7 },
      { name: "Isaie Hakizimana", role: "Academic Affairs", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=400&fit=crop", bio: "Supporting academic excellence and student success", twitter: "#", linkedin: "#", email: "isaie@rpsa.rw", order: 8 },
    ]
    await prisma.teamMember.createMany({ data: teamMembers })

    // Seed Events
    const events = [
      {
        title: "Annual Pharmacy Conference 2026",
        date: "2026-04-15",
        time: "9:00 AM - 5:00 PM",
        location: "Kigali Convention Centre",
        category: "Conference",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
        description: "Join us for our flagship annual conference bringing together pharmacy students, professionals, and industry leaders from across East Africa. This year's theme focuses on innovation in pharmaceutical care and digital health solutions.",
        attendees: 250,
        isPast: false,
      },
      {
        title: "Clinical Pharmacy Workshop",
        date: "2026-03-28",
        time: "2:00 PM - 6:00 PM",
        location: "RPSA Training Center",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
        description: "Hands-on clinical pharmacy workshop focusing on patient counseling, medication therapy management, and pharmaceutical care practices.",
        attendees: 80,
        isPast: false,
      },
      {
        title: "Health Outreach Program - Musanze",
        date: "2026-03-30",
        time: "8:00 AM - 4:00 PM",
        location: "Musanze District",
        category: "Outreach",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop",
        description: "Community health outreach providing free medication counseling, health screenings, and pharmaceutical education to underserved communities.",
        attendees: 45,
        isPast: false,
      },
      {
        title: "Pharmaceutical Research Symposium",
        date: "2026-02-20",
        time: "10:00 AM - 3:00 PM",
        location: "University of Rwanda",
        category: "Symposium",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
        description: "Student-led research presentations showcasing innovative pharmaceutical studies and clinical research projects.",
        attendees: 120,
        isPast: true,
      },
    ]
    await prisma.event.createMany({ data: events })

    // Seed Blog Posts
    const blogPosts = [
      {
        title: "The Future of Pharmaceutical Care in Rwanda",
        excerpt: "Exploring emerging trends in pharmacy practice and how students can prepare for the evolving healthcare landscape.",
        content: "The pharmaceutical landscape in Rwanda is evolving rapidly. With advancements in digital health, personalized medicine, and regulatory frameworks, pharmacy students must prepare for a dynamic future.",
        author: "Maurice Ishimwe",
        authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        date: "2026-03-15",
        category: "Healthcare",
        tags: "Pharmacy,Future,Healthcare",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
        readTime: "5 min read",
      },
      {
        title: "Student Spotlight: Research Excellence Awards",
        excerpt: "Celebrating outstanding research achievements by pharmacy students at our recent symposium.",
        content: "Our recent Pharmaceutical Research Symposium showcased exceptional work by pharmacy students across Rwanda.",
        author: "Octave Iragena",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        date: "2026-03-10",
        category: "Students",
        tags: "Research,Awards,Students",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
        readTime: "4 min read",
      },
      {
        title: "Community Impact: Musanze Health Outreach",
        excerpt: "Recap of our successful community health outreach program and the lives we touched together.",
        content: "Our recent health outreach program in Musanze District brought free medication counseling and health screenings to hundreds of community members.",
        author: "Eugene Rusanganira",
        authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
        date: "2026-03-05",
        category: "Community",
        tags: "Outreach,Community,Health",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop",
        readTime: "6 min read",
      },
      {
        title: "Tips for Pharmacy Students: Exam Preparation",
        excerpt: "Expert advice and study strategies to help you excel in your pharmaceutical studies.",
        content: "Preparing for pharmacy exams requires strategic planning and effective study techniques.",
        author: "Isaie Hakizimana",
        authorImage: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop",
        date: "2026-02-28",
        category: "Education",
        tags: "Study Tips,Exams,Education",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop",
        readTime: "7 min read",
      },
      {
        title: "Partnership Announcement: Global Pharmacy Network",
        excerpt: "RPSA joins international network connecting pharmacy students worldwide for collaboration and exchange.",
        content: "We are thrilled to announce RPSA's membership in the Global Pharmacy Student Network.",
        author: "Elite Tuyizere Ahanyuze",
        authorImage: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop",
        date: "2026-02-22",
        category: "Partnerships",
        tags: "Partnership,International,Network",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
        readTime: "5 min read",
      },
      {
        title: "Career Guide: Opportunities in Clinical Pharmacy",
        excerpt: "Exploring diverse career paths in clinical pharmacy and how to position yourself for success.",
        content: "Clinical pharmacy offers a wide range of career opportunities from hospital settings to community pharmacies.",
        author: "Pacifique Ahishakiye",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        date: "2026-02-18",
        category: "Career",
        tags: "Career,Clinical Pharmacy,Opportunities",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
        readTime: "8 min read",
      },
    ]
    await prisma.blogPost.createMany({ data: blogPosts })

    // Seed Testimonials
    const testimonialsList = [
      {
        name: "Alice Mukamana",
        role: "3rd Year Pharmacy Student",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
        quote: "RPSA has been instrumental in my growth as a pharmacy student. The networking opportunities and workshops have prepared me for my future career.",
        order: 1,
      },
      {
        name: "Patrick Uwizeyimana",
        role: "Recent Graduate",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        quote: "The professional development programs and mentorship I received through RPSA helped me land my dream job at a leading hospital.",
        order: 2,
      },
      {
        name: "Diane Ingabire",
        role: "2nd Year Pharmacy Student",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
        quote: "Being part of RPSA's community outreach programs has shown me the real impact pharmacists can have on people's lives. It's truly inspiring.",
        order: 3,
      },
    ]
    await prisma.testimonial.createMany({ data: testimonialsList })

    const counts = {
      teamMembers: await prisma.teamMember.count(),
      events: await prisma.event.count(),
      blogPosts: await prisma.blogPost.count(),
      testimonials: await prisma.testimonial.count(),
    }

    return NextResponse.json({
      message: 'Database seeded successfully!',
      counts,
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', details: error instanceof Error ? error.message : error },
      { status: 500 }
    )
  }
}
