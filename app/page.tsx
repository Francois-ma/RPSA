"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Users,
  Award,
  ArrowRight,
  Star,
  Heart,
  BookOpen,
  Globe,
  Target,
  Eye,
  Lightbulb,
  ChevronRight,
  MapPin,
  Clock,
  Play,
  CheckCircle,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "motion/react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  description: string;
  attendees: number;
  isPast: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

/* ───── Animated counter ───── */
function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const heroImages = ["/home1.jpeg", "/home2.jpeg", "/FDADG.jpeg"];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  const [events, setEvents] = useState<Event[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setEvents(d);
      })
      .catch(() => {});
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setTestimonials(d);
      })
      .catch(() => {});
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setBlogPosts(d);
      })
      .catch(() => {});
    fetch("/api/team")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setTeamMembers(d);
      })
      .catch(() => {});
  }, []);

  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 3);
  const latestPosts = blogPosts.slice(0, 3);
  const featuredTeam = teamMembers.slice(0, 4);

  return (
    <div className="bg-white">
      {/* ━━━━━━━ HERO ━━━━━━━ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Rotating background images */}
        <div className="absolute inset-0 bg-slate-900" />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <img
              src={heroImages[currentImage]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-950/60 to-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/40" />

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentImage
                  ? "w-8 bg-white"
                  : "w-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>

        {/* Animated shapes */}
        <motion.div
          className="absolute top-20 left-[10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-blue-100 font-medium tracking-wide">
                Empowering Future Pharmacists Since 1999
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6"
            >
              Building the Future of{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Pharmacy in Rwanda
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl"
            >
              Join 500+ pharmacy students shaping tomorrow&apos;s healthcare
              through education, research, community outreach, and professional
              development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-[1.03] font-semibold text-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join RPSA Today
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/about"
                className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 font-semibold text-lg flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Hero stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-white/10 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-0"
          >
            {[
              { value: 500, suffix: "+", label: "Active Members" },
              { value: 50, suffix: "+", label: "Annual Events" },
              { value: 25, suffix: "+", label: "Awards Won" },
              { value: 10, suffix: "K+", label: "Lives Impacted" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:py-6 md:px-8">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━ ABOUT PREVIEW — Mission, Vision, Values ━━━━━━━ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
              Who We Are
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              Dedicated to Pharmaceutical Excellence
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              RPSA unites pharmacy students across Rwanda, fostering academic
              growth, professional skills, and a deep commitment to public
              health.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description:
                  "To empower pharmacy students with the knowledge, skills, and networks needed to excel as future healthcare leaders in Rwanda and beyond.",
                gradient: "from-blue-600 to-blue-700",
                bg: "bg-blue-50",
                border: "border-blue-100",
              },
              {
                icon: Eye,
                title: "Our Vision",
                description:
                  "A Rwanda where every pharmacy graduate is equipped to deliver world-class pharmaceutical care, drive innovation, and improve community health outcomes.",
                gradient: "from-emerald-600 to-emerald-700",
                bg: "bg-emerald-50",
                border: "border-emerald-100",
              },
              {
                icon: Lightbulb,
                title: "Our Values",
                description:
                  "Excellence, integrity, collaboration, and service guide everything we do — from academic programs and workshops to community health outreach.",
                gradient: "from-amber-500 to-orange-600",
                bg: "bg-amber-50",
                border: "border-amber-100",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className={`relative ${card.bg} border ${card.border} rounded-3xl p-8 transition-all duration-300 hover:shadow-xl group`}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group text-lg"
            >
              Learn more about RPSA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━ WHAT WE DO ━━━━━━━ */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
              What We Do
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              Programs &amp; Initiatives
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              From hands-on workshops to nationwide outreach, we create
              opportunities that shape well-rounded pharmaceutical professionals.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Academic Support",
                desc: "Study groups, tutoring, and exam prep resources for every year of study.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: Users,
                title: "Networking",
                desc: "Connect with pharmacists, researchers, and industry leaders across Rwanda.",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                icon: Heart,
                title: "Community Outreach",
                desc: "Free health screenings, drug awareness campaigns, and public education.",
                color: "text-rose-600",
                bg: "bg-rose-50",
              },
              {
                icon: Globe,
                title: "Research & Innovation",
                desc: "Collaborate on research projects that address Rwanda's healthcare challenges.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-5`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━ UPCOMING EVENTS ━━━━━━━ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                Events
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Upcoming Events
              </h2>
              <p className="text-gray-600 mt-3 text-lg max-w-xl">
                Stay engaged — register for conferences, workshops, and
                community initiatives.
              </p>
            </div>
            <Link
              href="/events"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href="/events"
                    className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={
                          event.image ||
                          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop"
                        }
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur rounded-lg text-xs font-bold text-blue-700 shadow">
                        {event.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="flex flex-col gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          {event.time || "TBA"}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          {event.location}
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">
                          {event.attendees} attending
                        </span>
                        <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Details <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Upcoming events will be announced soon!
              </p>
            </div>
          )}

          <div className="md:hidden mt-8 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━ IMPACT / WHY JOIN ━━━━━━━ */}
      <section className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/10 text-blue-200 rounded-full text-sm font-semibold mb-6 tracking-wide uppercase border border-white/10">
                Why Join RPSA?
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Transform Your Pharmacy Career
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-10">
                RPSA membership opens doors to exclusive resources, mentorship
                from experienced pharmacists, and a supportive community that
                will stay with you throughout your career.
              </p>

              <div className="space-y-5">
                {[
                  "Access to exclusive workshops & training programs",
                  "Mentorship from practicing pharmacists",
                  "Leadership development opportunities",
                  "Community health outreach participation",
                  "Networking with peers & industry professionals",
                  "Certificates & professional recognition",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-200">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <Link
                  href="/membership"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-[1.03] transition-all duration-300"
                >
                  Become a Member
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=700&h=800&fit=crop"
                alt="Pharmacy students collaborating"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">15+</div>
                    <div className="text-sm text-gray-500">
                      Years of Impact
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━ OUR TEAM PREVIEW ━━━━━━━ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
              Leadership
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Passionate student leaders driving RPSA&apos;s mission forward
              every day.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTeam.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group text-center"
              >
                <div className="relative mb-5 overflow-hidden rounded-2xl aspect-square">
                  <img
                    src={
                      member.image ||
                      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
                    }
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              View Full Team <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━ TESTIMONIALS ━━━━━━━ */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              What Our Members Say
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Real stories from students whose journeys have been transformed by
              RPSA.
            </p>
          </motion.div>

          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 flex-1 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                    <img
                      src={
                        t.image ||
                        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop"
                      }
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Star className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Testimonials coming soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━━ LATEST BLOG ━━━━━━━ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                Blog
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Latest Articles
              </h2>
              <p className="text-gray-600 mt-3 text-lg max-w-xl">
                Insights, news, and stories from the RPSA community.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              Read All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {latestPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href="/blog"
                    className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          post.image ||
                          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop"
                        }
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur rounded-lg text-xs font-bold text-rose-600">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Blog articles coming soon!
              </p>
            </div>
          )}

          <div className="md:hidden mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              Read All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━ CTA SECTION ━━━━━━━ */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white rounded-full blur-[120px]" />
        </div>
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0V0zm39 0h1v40h-1V0z'/%3E%3Cpath d='M0 0h40v1H0V0zm0 39h40v1H0v-1z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20"
          >
            <Image
              src="/logo.jpeg"
              alt="RPSA"
              width={48}
              height={48}
              className="w-12 h-12 object-contain rounded-lg"
            />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Shape the Future
            <br className="hidden sm:block" /> of Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Rwanda&apos;s largest pharmaceutical student community and take
            the first step towards an impactful career in pharmacy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/register"
              className="group relative px-10 py-4 bg-white text-blue-700 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] overflow-hidden"
            >
              <span className="relative z-10">Create Your Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-transparent text-white rounded-2xl border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-bold text-lg"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
