"use client";

import { motion } from "motion/react";
import { Heart, Award, Users, Target, TrendingUp, Globe } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: Heart, title: "Compassion", description: "Patient care at the heart of everything we do" },
    { icon: Award, title: "Excellence", description: "Highest standards in pharmaceutical education" },
    { icon: Users, title: "Collaboration", description: "Building strong healthcare partnerships" },
    { icon: Target, title: "Innovation", description: "Embracing new technologies and approaches" },
  ];

  const milestones = [
    { year: "2010", event: "Foundation established by passionate pharmacy students" },
    { year: "2013", event: "First annual conference held" },
    { year: "2016", event: "Community outreach program launched" },
    { year: "2019", event: "International partnerships formed" },
    { year: "2022", event: "Student research grant program started" },
    { year: "2026", event: "Reached 500+ active members" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg mb-6">
              About RPSA
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Rwanda Pharmaceutical Students’ Association is a youth-led organization, established since 1999, which champions efforts to help young people, and communities make informed and responsible decisions on their health as well as social and economic standards of living. As young professionals, we are on a mission to empower its members into a responsible and efficient pharmaceutical society that reflects its role in a multi-disciplinary collaboration aimed at providing top-notch healthcare through advocacy, information sharing and transformative education whilst fostering a culture of human rights. We address issues affecting the responsibility of pharmacists within the health care system thus professional development and promote public health.
            </h1>
            <p className="text-xl text-blue-50 leading-relaxed">
              We are Rwanda's premier pharmaceutical student association, dedicated to advancing healthcare education and community well-being.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                
RPSA’s main mission is to promote sustainable healthcare through pharmacy practice and research as well as empower the Rwandan youth community about their reproductive, social, and civic responsibilities through advocacy, information sharing and transformative education while nurturing the culture of human right.
              </p>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl border border-green-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                We envision a youthful leadership that is analytical, enlightened, reflective and responsive dedicated to the service of humanity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg mb-4">
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-lg mb-4">
              Our Journey
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Milestones & Achievements</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="flex gap-6 mb-8 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-lg font-bold text-blue-600">{milestone.year}</span>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-0 w-3 h-3 bg-blue-600 rounded-full -translate-x-[1.35rem] mt-2" />
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Active Members</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Annual Events</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Lives Impacted</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
