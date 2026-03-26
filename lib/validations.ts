import { z } from 'zod'

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  excerpt: z.string().min(1, 'Excerpt is required').max(500),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  authorImage: z.union([z.string().url('Invalid author image URL'), z.literal('')]).optional().default(''),
  date: z.string().min(1, 'Date is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().default(''),
  image: z.union([z.string().url('Invalid image URL'), z.literal('')]).optional().default(''),
  readTime: z.string().optional().default('5 min read'),
  published: z.boolean().optional().default(true),
})

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  category: z.string().min(1, 'Category is required'),
  image: z.union([z.string().url('Invalid image URL'), z.literal('')]).optional().default(''),
  description: z.string().min(1, 'Description is required'),
  attendees: z.number().int().min(0).optional().default(0),
  isPast: z.boolean().optional().default(false),
})

export const contactMessageSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
})

export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  role: z.string().min(1, 'Role is required').max(100),
  image: z.union([z.string().url('Invalid image URL'), z.literal('')]).optional().default(''),
  bio: z.string().min(1, 'Bio is required').max(500),
  twitter: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  email: z.string().email('Invalid email'),
  order: z.number().int().min(0).optional().default(0),
})

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  role: z.string().min(1, 'Role is required').max(100),
  image: z.union([z.string().url('Invalid image URL'), z.literal('')]).optional().default(''),
  quote: z.string().min(1, 'Quote is required').max(1000),
  order: z.number().int().min(0).optional().default(0),
})
