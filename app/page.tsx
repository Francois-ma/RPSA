"use client";

import Link from "next/link";
import { Calendar, Users, Award, TrendingUp, ArrowRight, Star, Sparkles } from "lucide-react";
import { eventsData, testimonials } from "@/data/mockData";
import { motion } from "motion/react";

export default function HomePage() {
  const upcomingEvents = eventsData.filter(e => !e.isPast).slice(0, 3);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 -z-10" />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 rounded-full border border-blue-100/50 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700 font-medium">Empowering Future Pharmacists</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
              >
                Rwanda Pharmaceutical{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 bg-clip-text text-transparent animate-gradient">
                  Student Association
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Join a vibrant community of pharmacy students dedicated to excellence in pharmaceutical education, 
                professional development, and community health service.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/membership"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200/50 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Join Now
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link
                  href="/events"
                  className="px-8 py-4 bg-white text-gray-900 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Explore Events
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 rounded-3xl blur-3xl opacity-30 animate-pulse" />
              <motion.img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
                alt="Pharmacy students"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              {/* Floating Stats Cards */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-100/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/50">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Active Members</div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-100/50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200/50">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50+</div>
                    <div className="text-sm text-gray-600">Annual Events</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Users, label: "Active Members", value: "500+", gradient: "from-blue-500 to-blue-600", iconColor: "text-blue-600", shadowColor: "shadow-blue-200/50" },
              { icon: Calendar, label: "Events/Year", value: "50+", gradient: "from-green-500 to-green-600", iconColor: "text-green-600", shadowColor: "shadow-green-200/50" },
              { icon: Award, label: "Awards Won", value: "25+", gradient: "from-purple-500 to-purple-600", iconColor: "text-purple-600", shadowColor: "shadow-purple-200/50" },
              { icon: TrendingUp, label: "Community Reach", value: "10K+", gradient: "from-orange-500 to-orange-600", iconColor: "text-orange-600", shadowColor: "shadow-orange-200/50" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <motion.div 
                    className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${stat.shadowColor}`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="flex items-end justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 rounded-xl mb-4 border border-blue-100/50">
                Upcoming Events
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Join Our Next Events</h2>
              <p className="text-gray-600 mt-2 text-lg">Expand your knowledge and network with fellow students</p>
            </div>
            <Link href="/events" className="hidden lg:flex items-center gap-2 text-blue-600 hover:gap-4 transition-all group">
              View All Events
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <Link
                  href={`/events/${event.id}`}
                  className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-md rounded-xl text-sm font-semibold text-blue-600 shadow-lg">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500 font-medium">{event.attendees} attending</span>
                      <span className="text-blue-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="lg:hidden mt-8 text-center">
            <Link href="/events" className="inline-flex items-center gap-2 text-blue-600 hover:gap-4 transition-all">
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-200 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-700 rounded-xl mb-4 border border-blue-100/50 shadow-sm">
              Testimonials
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Our Members Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hear from students whose lives have been transformed through RPSA membership
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id} 
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <motion.div 
          className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-blue-50 mb-8 max-w-3xl mx-auto leading-relaxed">
            Become part of Rwanda's leading pharmaceutical student association and unlock opportunities for growth, 
            learning, and professional development.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/membership"
              className="group relative px-8 py-4 bg-white text-blue-600 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 font-semibold"
            >
              <span className="relative z-10">Become a Member</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent text-white rounded-2xl border-2 border-white hover:bg-white/10 transition-all duration-300 font-semibold hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
