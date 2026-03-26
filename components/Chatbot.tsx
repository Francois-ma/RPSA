"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickQuestion {
  question: string;
  icon: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm the RPSA Assistant. I'm here to help you learn about the Rwanda Pharmaceutical Student Association and navigate our website. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickQuestions: QuickQuestion[] = [
    { question: "What is RPSA?", icon: "🎓" },
    { question: "How do I join?", icon: "✨" },
    { question: "What events do you organize?", icon: "📅" },
    { question: "How do I contact RPSA?", icon: "📧" },
    { question: "What are the membership benefits?", icon: "🎁" },
    { question: "How do I navigate the website?", icon: "🧭" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // About RPSA
    if (lowerMessage.includes("what is rpsa") || lowerMessage.includes("about rpsa") || lowerMessage.includes("tell me about")) {
      return "RPSA (Rwanda Pharmaceutical Student Association) is the leading organization representing pharmacy students across Rwanda. We're committed to advancing pharmaceutical education, professional development, and community health. With over 500 active members, we organize 50+ events annually and have made a positive impact on 10,000+ people in our community!";
    }

    // Membership/Join
    if (lowerMessage.includes("join") || lowerMessage.includes("member") || lowerMessage.includes("sign up") || lowerMessage.includes("register")) {
      return "Great question! To join RPSA, simply visit our Membership page by clicking 'Membership' in the navigation menu or the 'Join Now' button on the homepage. You'll find different membership tiers (Student, Professional, Honorary) with their benefits. Fill out the application form, and our team will get back to you within 2-3 business days. Membership includes access to exclusive workshops, networking events, and career development resources!";
    }

    // Events
    if (lowerMessage.includes("event") || lowerMessage.includes("workshop") || lowerMessage.includes("conference") || lowerMessage.includes("program")) {
      return "RPSA organizes a variety of events throughout the year! These include workshops, conferences, webinars, and community outreach programs. To see our upcoming and past events, visit the 'Events' page from the navigation menu. You can filter events by category (Workshop, Conference, Webinar, Community Outreach) and search for specific topics. Click on any event to see details and register!";
    }

    // Contact
    if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone") || lowerMessage.includes("reach")) {
      return "You can contact RPSA through multiple channels:\n\n📧 Email: info@rpsa.rw\n📞 Phone: +250 123 456 789\n📍 Location: Kigali, Rwanda\n\nYou can also use the Contact page (accessible from the navigation menu) to send us a message directly. We typically respond within 24 hours!";
    }

    // Benefits
    if (lowerMessage.includes("benefit") || lowerMessage.includes("advantage") || lowerMessage.includes("perks") || lowerMessage.includes("why join")) {
      return "RPSA membership comes with amazing benefits:\n\n✅ Exclusive workshops and professional development programs\n✅ Networking with industry leaders and fellow students\n✅ Hands-on community outreach experience\n✅ Career guidance and mentorship\n✅ Research opportunities and academic support\n✅ Leadership development\n✅ Discounted conference access\n✅ Platform to impact community health\n\nVisit our About page to learn more about our mission and values!";
    }

    // Navigation/Website help
    if (lowerMessage.includes("navigate") || lowerMessage.includes("website") || lowerMessage.includes("how to use") || lowerMessage.includes("find")) {
      return "Here's a quick guide to our website:\n\n🏠 Home: Overview and latest updates\n📖 About: Our mission, vision, and history\n📅 Events: Browse and register for events\n👥 Team: Meet our leadership team\n📝 Blog: Latest news and articles\n🎓 Membership: Join RPSA\n📧 Contact: Get in touch with us\n📊 Dashboard: Member portal (login required)\n\nUse the navigation menu at the top to access any section. You can also use the search function on the Events and Blog pages to find specific content!";
    }

    // Team
    if (lowerMessage.includes("team") || lowerMessage.includes("leader") || lowerMessage.includes("executive") || lowerMessage.includes("who runs")) {
      return "Our leadership team consists of dedicated pharmacy students and professionals committed to advancing RPSA's mission. Visit the 'Team' page from the navigation menu to meet our Executive Committee, including our President, Vice President, Secretary, Treasurer, and committee heads. Each member brings unique expertise and passion to the organization!";
    }

    // Blog
    if (lowerMessage.includes("blog") || lowerMessage.includes("article") || lowerMessage.includes("news") || lowerMessage.includes("post")) {
      return "Stay updated with RPSA through our Blog! We regularly publish articles about pharmaceutical trends, student success stories, health tips, research insights, and event recaps. Visit the 'Blog' page from the navigation menu to read our latest posts. You can browse by category or search for specific topics!";
    }

    // Dashboard
    if (lowerMessage.includes("dashboard") || lowerMessage.includes("login") || lowerMessage.includes("portal") || lowerMessage.includes("member area")) {
      return "The Dashboard is your personalized member portal! Click the 'Dashboard' button in the navigation menu to access features like:\n\n📊 Your membership overview\n📅 Registered events\n📈 Activity tracking\n💬 Community discussions\n📄 Important documents\n🎯 Personalized recommendations\n\nNote: You'll need to log in with your member credentials to access the dashboard.";
    }

    // History
    if (lowerMessage.includes("history") || lowerMessage.includes("founded") || lowerMessage.includes("started") || lowerMessage.includes("established")) {
      return "RPSA was founded in 2010 by a group of passionate pharmacy students. Since then, we've grown significantly:\n\n• 2010: Foundation established\n• 2013: First annual conference\n• 2016: Community outreach program launched\n• 2019: International partnerships formed\n• 2022: Student research grant program started\n• 2026: Reached 500+ active members!\n\nVisit our About page to see the complete timeline of our journey!";
    }

    // Values
    if (lowerMessage.includes("value") || lowerMessage.includes("mission") || lowerMessage.includes("vision") || lowerMessage.includes("believe")) {
      return "RPSA is built on four core values:\n\n❤️ Compassion: Patient care at the heart of everything\n🏆 Excellence: Highest standards in pharmaceutical education\n🤝 Collaboration: Strong healthcare partnerships\n💡 Innovation: Embracing new technologies\n\nOur mission is to empower pharmacy students through quality education, professional development, and community engagement. Visit the About page to learn more!";
    }

    // Default/Help
    if (lowerMessage.includes("help") || lowerMessage.includes("options") || lowerMessage.includes("can you do")) {
      return "I can help you with:\n\n• Information about RPSA (mission, vision, history)\n• Membership details and how to join\n• Events and programs\n• Website navigation\n• Contact information\n• Team and leadership\n• Blog and news\n• Benefits of joining\n\nJust ask me anything, or click one of the quick question buttons below!";
    }

    // Greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! 👋 I'm here to help you learn about RPSA and navigate our website. What would you like to know?";
    }

    // Thanks
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're very welcome! If you have any other questions about RPSA or need help navigating the website, feel free to ask. We're here to help! 😊";
    }

    // Default response
    return "I'm not sure I understand that question. I can help you with information about RPSA, membership, events, website navigation, and more. Try asking about:\n\n• What is RPSA?\n• How do I join?\n• What events do you organize?\n• How do I navigate the website?\n\nOr click one of the quick question buttons below!";
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full shadow-2xl hover:shadow-blue-300/50 flex items-center justify-center group"
          >
            <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] h-[100dvh] sm:h-[600px] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border-t sm:border border-gray-200"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 text-white p-6 flex items-center justify-between">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    RPSA Assistant
                    <Sparkles className="w-4 h-4" />
                  </h3>
                  <p className="text-xs text-blue-100">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:rotate-90 duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                      message.sender === "bot"
                        ? "bg-gradient-to-br from-blue-500 to-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {message.sender === "bot" ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender === "bot"
                        ? "bg-white border border-gray-200 text-gray-800"
                        : "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "bot" ? "text-gray-500" : "text-blue-100"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-6 py-3 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  Quick questions <ChevronDown className="w-3 h-3" />
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.slice(0, 3).map((q, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickQuestion(q.question)}
                      className="text-xs px-3 py-2 bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 rounded-xl hover:from-blue-100 hover:to-green-100 transition-all border border-blue-100/50"
                    >
                      {q.icon} {q.question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
