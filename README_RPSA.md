# RPSA Website - Next.js Version

A modern, professional website built with **Next.js 15** for the Rwanda Pharmaceutical Student Association (RPSA).

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first, works on all devices
- **Interactive UI**: Smooth animations using Framer Motion
- **AI Chatbot**: Built-in chatbot assistant for user support
- **SEO Optimized**: Server-side rendering and metadata optimization
- **Performance**: Fast loading with optimized assets

## 📁 Project Structure

```
new_web/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/page.tsx     # About page
│   ├── events/page.tsx    # Events listing
│   ├── team/page.tsx      # Team members
│   ├── blog/page.tsx      # Blog posts
│   ├── membership/page.tsx # Membership info
│   ├── contact/page.tsx   # Contact form
│   └── dashboard/page.tsx # User dashboard
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Site footer
│   ├── Chatbot.tsx       # AI chatbot
│   └── Layout.tsx        # Main layout wrapper
├── data/                  # Mock data
│   └── mockData.ts       # Sample events, team, blog posts
├── lib/                   # Utilities
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion (Motion)
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## 🏃 Getting Started

### Installation

```bash
cd new_web
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### Build for Production

```bash
npm run build
npm start
```

## 📄 Pages

1. **Home** - Hero section, featured events, testimonials, stats
2. **About** - Mission, vision, values, timeline, achievements
3. **Events** - Event listing with search and filters
4. **Team** - Leadership team profiles
5. **Blog** - Blog posts with categories
6. **Membership** - Membership tiers and benefits
7. **Contact** - Contact form and information
8. **Dashboard** - Member portal with activity tracking

## 🎨 Design Features

- **Color Scheme**: Blue (#2563eb) to Green (#16a34a) gradients
- **Typography**: Geist font family
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Breakpoints for mobile, tablet, desktop
- **Max Width**: 1440px container

## 🔧 Key Components

### Navbar
- Sticky navigation with scroll effects
- Mobile-responsive hamburger menu
- Active state indicators

### Chatbot
- Rule-based AI assistant
- Quick question suggestions
- Typing indicators
- Smooth animations

### Footer
- Social media links
- Quick navigation
- Newsletter subscription
- Contact information

## 📊 Data

Currently uses mock data from `data/mockData.ts`:
- 4 sample events
- 8 team members
- 6 blog posts
- 3 testimonials

## 🚀 Next Steps

To make this production-ready:

1. **Backend Integration**: Connect to a CMS or database
2. **Authentication**: Implement user login (NextAuth, Auth0)
3. **Forms**: Add form submission handling
4. **API Routes**: Create backend endpoints
5. **Database**: Set up PostgreSQL/MongoDB
6. **Testing**: Add unit and integration tests
7. **Analytics**: Integrate Google Analytics
8. **SEO**: Optimize meta tags and structured data

## 📝 Comparison with Original (React/Vite)

**Advantages of Next.js version:**
- ✅ Server-side rendering (better SEO)
- ✅ File-based routing (no route config needed)
- ✅ API routes capability
- ✅ Better performance optimization
- ✅ Image optimization
- ✅ Built-in TypeScript support

**Similarities:**
- Same design and visual identity
- Same component structure
- Same mock data
- Same chatbot functionality

## 👨‍💻 Author

Created as a Next.js migration of the original RPSA website.

## 📄 License

This project is for educational purposes.
