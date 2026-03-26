const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs')
const path = require('path')

const dbPath = path.join(__dirname, 'dev.db')
const db = new sqlite3.Database(dbPath)

async function seed() {
  console.log('🌱 Seeding database...')

  const hashedPassword = await bcrypt.hash('admin123', 10)

  // Clear existing data first
  await new Promise((resolve) => {
    db.serialize(() => {
      db.run('DELETE FROM ContactMessage')
      db.run('DELETE FROM Membership')
      db.run('DELETE FROM Testimonial')
      db.run('DELETE FROM BlogPost')
      db.run('DELETE FROM TeamMember')
      db.run('DELETE FROM Event')
      db.run('DELETE FROM User', resolve)
    })
  })

  console.log('Cleared existing data')

  // Insert data using promises
  await new Promise((resolve) => {
    db.serialize(() => {
      // Create admin user
      db.run(
        `INSERT INTO User (id, email, password, name, role, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        ['user-1', 'admin@rpsa.rw', hashedPassword, 'Admin User', 'admin'],
        (err) => {
          if (err) console.error('Error inserting user:', err)
          else console.log('✅ Admin user created')
        }
      )

      // Create events
      const events = [
        ['event-1', 'Annual Pharmacy Conference 2026', '2026-04-15', '9:00 AM - 5:00 PM', 'Kigali Convention Centre', 'Conference', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop', 'Join us for our flagship annual conference bringing together pharmacy students, professionals, and industry leaders from across East Africa.', 250, 0],
        ['event-2', 'Clinical Pharmacy Workshop', '2026-03-28', '2:00 PM - 6:00 PM', 'RPSA Training Center', 'Workshop', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop', 'Hands-on clinical pharmacy workshop focusing on patient counseling, medication therapy management, and pharmaceutical care practices.', 80, 0],
        ['event-3', 'Health Outreach Program - Musanze', '2026-03-30', '8:00 AM - 4:00 PM', 'Musanze District', 'Outreach', 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop', 'Community health outreach providing free medication counseling, health screenings, and pharmaceutical education to underserved communities.', 45, 0],
      ]

      events.forEach(event => {
        db.run(
          `INSERT INTO Event (id, title, date, time, location, category, image, description, attendees, isPast, createdAt, updatedAt) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
          event
        )
      })
      console.log('✅ Events created')

      // Create team members
      const teamMembers = [
        ['team-1', 'Emmanuel Habimana', 'President', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', 'Final year pharmacy student passionate about healthcare accessibility', '#', '#', 'emmanuel@rpsa.rw', 1],
        ['team-2', 'Grace Uwase', 'Vice President', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', 'Advocating for pharmaceutical education excellence', '#', '#', 'grace@rpsa.rw', 2],
      ]

      teamMembers.forEach(member => {
        db.run(
          `INSERT INTO TeamMember (id, name, role, image, bio, twitter, linkedin, email, "order", createdAt, updatedAt) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
          member
        )
      })
      console.log('✅ Team members created')

      // Create blog post
      db.run(
        `INSERT INTO BlogPost (id, title, excerpt, content, author, authorImage, date, category, tags, image, readTime, published, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        ['blog-1', 'The Future of Pharmaceutical Care in Rwanda', 'Exploring emerging trends in pharmacy practice and how students can prepare for the evolving healthcare landscape.', 'Full article content here...', 'Emmanuel Habimana', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', '2026-03-15', 'Healthcare', 'Pharmacy,Future,Healthcare', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop', '5 min read', 1],
        (err) => {
          if (err) console.error('Error inserting blog post:', err)
          else console.log('✅ Blog posts created')
        }
      )

      // Create testimonial
      db.run(
        `INSERT INTO Testimonial (id, name, role, image, quote, "order", createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        ['testimonial-1', 'Alice Mukamana', '3rd Year Pharmacy Student', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop', 'RPSA has been instrumental in my growth as a pharmacy student. The networking opportunities and workshops have prepared me for my future career.', 1],
        (err) => {
          if (err) console.error('Error inserting testimonial:', err)
          else console.log('✅ Testimonials created')
        }
      )

      setTimeout(() => {
        db.close()
        console.log('\n🎉 Database seeding completed successfully!')
        console.log('\nLogin credentials:')
        console.log('Email: admin@rpsa.rw')
        console.log('Password: admin123')
        resolve()
      }, 1000)
    })
  })
}

seed().catch(console.error)
