"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Team", path: "/team" },
  { name: "Blog", path: "/blog" },
  { name: "Membership", path: "/membership" },
  { name: "Contact", path: "/contact" },
];

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check auth state on mount and when pathname changes
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-200/50" 
        : "bg-white/80 backdrop-blur-lg border-b border-gray-200/30"
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.jpeg"
              alt="RPSA Logo"
              width={72}
              height={72}
              className="w-[72px] h-[72px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-gray-900 leading-tight">Rwanda Pharmaceutical</div>
              <div className="text-xs text-gray-600">Student Association</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/50 hover:scale-105 overflow-hidden group"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/50 hover:scale-105 overflow-hidden group"
                >
                  <span className="relative z-10">Create Account</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 active:scale-95"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(link.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl text-center mt-2 hover:shadow-lg transition-all duration-300"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="px-4 py-3 text-red-600 bg-red-50 rounded-xl text-center hover:bg-red-100 transition-all duration-300 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-gray-700 bg-gray-50 rounded-xl text-center mt-2 hover:bg-gray-100 transition-all duration-300 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl text-center hover:shadow-lg transition-all duration-300"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
