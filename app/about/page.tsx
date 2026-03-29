"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Award,
  Users,
  Target,
  GraduationCap,
  Globe,
  BookOpen,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const heroImages = ["/about1.jpeg", "/about2.jpeg", "/about3.jpeg"];

export default function AboutPage() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "Patient care at the heart of everything we do, driving us to serve communities with empathy and dedication.",
      color: "from-rose-500 to-pink-500",
      border: "border-rose-100",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Upholding the highest standards in pharmaceutical education, research, and professional practice.",
      color: "from-amber-500 to-orange-500",
      border: "border-amber-100",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Building strong, multi-disciplinary healthcare partnerships to improve patient outcomes nationwide.",
      color: "from-blue-500 to-cyan-500",
      border: "border-blue-100",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "Embracing new technologies, research methodologies, and forward-thinking approaches to pharmacy.",
      color: "from-green-500 to-emerald-500",
      border: "border-green-100",
    },
  ];

  const milestones = [
    {
      year: "1999",
      event:
        "RPSA founded by passionate pharmacy students at the University of Rwanda.",
    },
    {
      year: "2010",
      event:
        "Foundation re-established with expanded mission and new leadership structure.",
    },
    {
      year: "2013",
      event:
        "First annual pharmacy conference held, attracting students across East Africa.",
    },
    {
      year: "2016",
      event:
        "Community outreach and public health awareness programs launched nationwide.",
    },
    {
      year: "2019",
      event:
        "International partnerships formed with pharmaceutical associations across Africa.",
    },
    {
      year: "2022",
      event:
        "Student research grant program started, funding groundbreaking pharmacy research.",
    },
    {
      year: "2026",
      event:
        "Reached 500+ active members and expanded to multiple campuses across Rwanda.",
    },
  ];

  const objectives = [
    "Promote sustainable healthcare through pharmacy practice and research",
    "Empower Rwandan youth about reproductive, social, and civic responsibilities",
    "Foster a culture of human rights through advocacy and education",
    "Address issues affecting the role of pharmacists in the healthcare system",
    "Promote professional development and public health initiatives",
    "Build multi-disciplinary collaborations for top-notch healthcare delivery",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32">
        {/* Rotating background images */}
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
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-green-900/80" />
        <div className="absolute inset-0 bg-black/30" />
        {/* Animated decorative blurs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-80 h-80 bg-green-300/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
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

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">
                Est. 1999 — Kigali, Rwanda
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Shaping the Future of{" "}
              <span className="relative inline-block">
                Pharmacy
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8 C50 2, 150 2, 198 8"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              in Rwanda
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-10">
              RPSA is a youth-led organization championing efforts to help young
              people and communities make informed decisions on their health,
              social, and economic well-being. As young professionals, we empower
              members into a responsible and efficient pharmaceutical society
              through advocacy, information sharing, and transformative
              education.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/membership"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-semibold rounded-2xl shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Become a Member
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/25 hover:bg-white/25 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                Who We Are
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                A Community of Future Pharmacists Making a Difference
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                The Rwanda Pharmaceutical Students&apos; Association (RPSA) was
                established in 1999 as a youth-led organization dedicated to
                empowering pharmacy students and promoting public health across
                Rwanda. We operate at the intersection of education, advocacy,
                and community service.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our members are passionate about addressing issues that affect
                the role of pharmacists within the healthcare system, driving
                professional development, and fostering multi-disciplinary
                collaboration aimed at providing top-notch healthcare to every
                Rwandan.
              </p>

              <div className="space-y-3">
                {objectives.slice(0, 4).map((obj, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{obj}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl -z-10" />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl -z-10" />

                <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      Our Impact in Numbers
                    </h3>
                    <p className="text-blue-100">
                      Over 25 years of service to Rwandan communities
                    </p>
                  </div>
                  <div className="p-8 grid grid-cols-2 gap-6">
                    {[
                      { value: "500+", label: "Active Members", icon: Users },
                      { value: "50+", label: "Annual Events", icon: Award },
                      { value: "10K+", label: "Lives Impacted", icon: Heart },
                      { value: "25+", label: "Years of Service", icon: Globe },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        className="text-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-4">
              Our Purpose
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="group relative bg-white p-10 rounded-3xl border border-blue-100 shadow-lg shadow-blue-50/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-3xl" />
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200/50">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To promote sustainable healthcare through pharmacy practice and
                research, as well as empower the Rwandan youth community about
                their reproductive, social, and civic responsibilities through
                advocacy, information sharing, and transformative education while
                nurturing the culture of human rights.
              </p>
            </motion.div>

            <motion.div
              className="group relative bg-white p-10 rounded-3xl border border-green-100 shadow-lg shadow-green-50/50 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-3xl" />
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-200/50">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We envision a youthful leadership that is analytical,
                enlightened, reflective, and responsive — dedicated to the
                service of humanity and committed to transforming pharmaceutical
                care across Rwanda and the broader East African community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
              Our Values
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our core values guide every initiative, partnership, and decision
              we make as an organization.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className={`group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border ${value.border}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              Our Objectives
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What We Aim to Achieve
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Our strategic objectives drive meaningful change in pharmacy
              education and public health.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <span className="text-white font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-white/90 leading-relaxed">{objective}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Milestones & Achievements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From our humble beginnings to a thriving community — here&apos;s
              how we&apos;ve grown over the years.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-green-400 md:-translate-x-px" />

            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center mb-12 last:mb-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Content */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-4 md:text-right" : "md:pl-4"
                    }`}
                  >
                    <div
                      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 ${
                        isLeft ? "md:ml-auto" : ""
                      }`}
                    >
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-bold rounded-lg mb-3">
                        {milestone.year}
                      </span>
                      <p className="text-gray-700 leading-relaxed">
                        {milestone.event}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full ring-4 ring-white shadow-md" />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Our Growing Impact
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Every number represents real lives changed and communities
                  strengthened through our collective efforts.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    value: "500+",
                    label: "Active Members",
                    sub: "Across Rwanda",
                  },
                  {
                    value: "50+",
                    label: "Annual Events",
                    sub: "Conferences & Workshops",
                  },
                  {
                    value: "10K+",
                    label: "Lives Impacted",
                    sub: "Through Outreach",
                  },
                  {
                    value: "15+",
                    label: "Partnerships",
                    sub: "National & International",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white font-medium mb-1">
                      {stat.label}
                    </div>
                    <div className="text-gray-500 text-sm">{stat.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Whether you&apos;re a pharmacy student, a recent graduate, or a
              healthcare professional — there&apos;s a place for you in RPSA.
              Together, we can shape the future of pharmaceutical care in Rwanda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/membership"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 hover:scale-105 transition-all duration-300"
              >
                Become a Member
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-2xl hover:bg-gray-200 transition-all duration-300"
              >
                View Upcoming Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
