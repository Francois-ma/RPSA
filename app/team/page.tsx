"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { teamMembers as mockTeamMembers } from "@/data/mockData";
import { Mail, Globe, Send } from "lucide-react";

interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  image: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  socials?: { twitter: string; linkedin: string; email: string };
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers as TeamMember[]);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Map API data to include socials for backwards compatibility with the template
            const mapped = data.map((m: TeamMember) => ({
              ...m,
              socials: m.socials || {
                twitter: m.twitter || '#',
                linkedin: m.linkedin || '#',
                email: m.email || '',
              },
            }));
            setTeamMembers(mapped as TeamMember[]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch team members, using mock data:', error);
      }
    }
    fetchTeam();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg mb-6">
              Our Team
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Meet Our Leadership</h1>
            <p className="text-xl text-blue-50 max-w-3xl mx-auto">
              Dedicated pharmacy students working together to advance our profession and serve the community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      <a href={member.socials?.twitter || member.twitter || '#'} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                        <Send className="w-5 h-5 text-gray-700 hover:text-white" />
                      </a>
                      <a href={member.socials?.linkedin || member.linkedin || '#'} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                        <Globe className="w-5 h-5 text-gray-700 hover:text-white" />
                      </a>
                      <a href={`mailto:${member.socials?.email || member.email || ''}`} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                        <Mail className="w-5 h-5 text-gray-700 hover:text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
