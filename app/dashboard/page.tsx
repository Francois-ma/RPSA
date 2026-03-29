"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Calendar,
  Users,
  Award,
  Clock,
  CheckCircle,
  BookOpen,
  MessageSquare,
  LogOut,
  GraduationCap,
} from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  yearOfStudy?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch {
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
      router.push("/login");
    }

    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const stats = [
    { icon: Calendar, label: "Events Registered", value: "12", color: "from-blue-500 to-blue-600" },
    { icon: Award, label: "Certificates Earned", value: "5", color: "from-green-500 to-green-600" },
    { icon: Clock, label: "Volunteer Hours", value: "48", color: "from-purple-500 to-purple-600" },
    { icon: Users, label: "Network Connections", value: "156", color: "from-orange-500 to-orange-600" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Annual Pharmacy Conference 2026", date: "Apr 15, 2026", location: "Kigali Convention Centre" },
    { id: 2, title: "Clinical Pharmacy Workshop", date: "Mar 28, 2026", location: "RPSA Training Center" },
    { id: 3, title: "Health Outreach - Musanze", date: "Mar 30, 2026", location: "Musanze District" },
  ];

  const recentActivities = [
    { id: 1, type: "event", description: "Registered for Annual Pharmacy Conference", date: "2 days ago" },
    { id: 2, type: "certificate", description: "Completed Clinical Pharmacy Workshop", date: "1 week ago" },
    { id: 3, type: "volunteer", description: "Volunteered at Community Health Screening", date: "2 weeks ago" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name.split(" ")[0]}!</h1>
              <p className="text-blue-100">Here&apos;s what&apos;s happening with your account</p>
              {user.yearOfStudy && (
                <div className="flex items-center gap-2 mt-2 text-blue-100">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">{user.yearOfStudy}</span>
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right mr-3">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-blue-200">{user.email}</div>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{getInitials(user.name)}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 -mt-8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Events */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                  <a href="/events" className="text-blue-600 hover:underline text-sm font-medium">View All</a>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{event.date}</span>
                          <span>•</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                  <a href="#" className="text-blue-600 hover:underline text-sm font-medium">View All</a>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 mb-1">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors font-medium text-left flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    Access Resources
                  </button>
                  <button className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors font-medium text-left flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    Update Profile
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors font-medium text-left flex items-center gap-3">
                    <MessageSquare className="w-5 h-5" />
                    Contact Support
                  </button>
                </div>
              </motion.div>

              {/* Membership Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl shadow-lg p-6 text-white"
              >
                <h2 className="text-xl font-bold mb-4">Membership Status</h2>
                <div className="mb-4">
                  <div className="text-sm opacity-80 mb-1">Professional Member</div>
                  <div className="text-3xl font-bold">Active</div>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm opacity-80">Valid until</div>
                  <div className="font-semibold">December 31, 2026</div>
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notifications</h2>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">Conference registration closes in 5 days</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">New workshop available: Clinical Skills</p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Logout */}
              <div className="md:hidden">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
