"use client";

import { motion } from "motion/react";
import { Check, Star, Award, Users, BookOpen, Briefcase, GraduationCap, Heart } from "lucide-react";
import { testimonials } from "@/data/mockData";

export default function MembershipPage() {
  const benefits = [
    { icon: BookOpen, title: "Educational Resources", description: "Access to exclusive learning materials and pharmaceutical databases" },
    { icon: Users, title: "Networking", description: "Connect with fellow students and industry leaders" },
    { icon: Award, title: "Professional Development", description: "Workshops and certification programs" },
    { icon: Briefcase, title: "Career Support", description: "Job placement assistance and career guidance" },
    { icon: GraduationCap, title: "Mentorship", description: "One-on-one mentorship with experienced pharmacists" },
    { icon: Heart, title: "Community Service", description: "Participate in health outreach programs" },
  ];

  const tiers = [
    {
      name: "Student",
      price: "$20",
      period: "/year",
      features: ["Access to all events", "Educational resources", "Networking opportunities", "Monthly newsletter", "Certificate of membership"],
      popular: false,
    },
    {
      name: "Professional",
      price: "$50",
      period: "/year",
      features: ["All Student benefits", "Mentorship program", "Career services", "Research grants access", "Leadership opportunities", "Conference discounts"],
      popular: true,
    },
    {
      name: "Honorary",
      price: "$100",
      period: "/year",
      features: ["All Professional benefits", "Advisory role", "Speaking opportunities", "Lifetime alumni network", "Special recognition"],
      popular: false,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg mb-6">
              Join RPSA Today
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Become Part of Something Greater
            </h1>
            <p className="text-xl text-blue-50 leading-relaxed mb-8">
              Join Rwanda's premier pharmaceutical student association and unlock a world of opportunities
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#membership-form" className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold">
                Join Now
              </a>
              <a href="#benefits" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-semibold">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg mb-4">
              Membership Benefits
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join RPSA?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Membership opens doors to exclusive opportunities that will shape your career
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-lg mb-4">
              Membership Plans
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className={`relative bg-white rounded-3xl p-8 ${
                  tier.popular ? 'shadow-2xl ring-2 ring-blue-600' : 'shadow-lg border border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-600">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Members Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
