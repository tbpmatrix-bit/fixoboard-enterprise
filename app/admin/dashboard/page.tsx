import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";
import {
  Image as ImageIcon,
  Newspaper,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { initialGalleryItems } from "../../../data/gallery";
import { initialNewsItems } from "../../../data/news";

const MotionDiv = motion.div as any;

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    galleryCount: 0,
    newsCount: 0,
    draftNews: 0,
    activeImages: 0,
  });

  useEffect(() => {
    // Load current counts from local storage
    const gallery = JSON.parse(
      localStorage.getItem("fixoboard_gallery") || "[]",
    );
    const news = JSON.parse(localStorage.getItem("fixoboard_news") || "[]");

    // Fallback to defaults if empty
    const finalGallery = gallery.length ? gallery : initialGalleryItems;
    const finalNews = news.length ? news : initialNewsItems;

    setStats({
      galleryCount: finalGallery.length,
      activeImages: finalGallery.filter((i: any) => i.isActive).length,
      newsCount: finalNews.filter((i: any) => i.isPublished).length,
      draftNews: finalNews.filter((i: any) => !i.isPublished).length,
    });
  }, []);

  const quickStats = [
    {
      label: "Gallery Assets",
      value: stats.galleryCount,
      sub: `${stats.activeImages} Publicly Visible`,
      icon: <ImageIcon size={22} />,
      accent: "red",
    },
    {
      label: "Live Articles",
      value: stats.newsCount,
      sub: "Fresh updates on site",
      icon: <TrendingUp size={22} />,
      accent: "red",
    },
    {
      label: "Pending Drafts",
      value: stats.draftNews,
      sub: "Needs review/publish",
      icon: <Clock size={22} />,
      accent: "blue",
    },
    {
      label: "Active Users",
      value: 1,
      sub: "Admin session active",
      icon: <UserCheck size={22} />,
      accent: "dark",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex bg-slate-50 min-h-screen font-sans">
        <AdminSidebar />

        <main className="flex-grow pl-72">
          <div className="p-10 max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-12 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
                  Welcome, Admin
                </h1>
                <p className="text-slate-500 font-medium mt-2">
                  Manage your industrial visual library and company
                  announcements.
                </p>
              </div>
              <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  System Online
                </span>
              </div>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {quickStats.map((item, idx) => (
                <MotionDiv
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                      item.accent === "red"
                        ? "bg-brand-red/10 text-brand-red"
                        : item.accent === "blue"
                          ? "bg-brand-blue/10 text-brand-blue"
                          : "bg-brand-dark/10 text-brand-dark"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="text-3xl font-display font-black text-slate-900 tracking-tight mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                    {item.label}
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 border-t border-slate-100 pt-4">
                    {item.sub}
                  </p>
                </MotionDiv>
              ))}
            </div>

            {/* Main Navigation Sections */}
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Gallery Management Card */}
              <MotionDiv
                whileHover={{ scale: 1.01 }}
                className="bg-brand-dark rounded-2xl p-12 text-white relative overflow-hidden shadow-2xl group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-3xl rounded-full group-hover:bg-brand-red/20 transition-all duration-300" />
                <div className="relative z-10">
                  <ImageIcon size={44} className="text-brand-red mb-8" />
                  <h2 className="font-display text-3xl font-black mb-4">
                    Manage Visual Gallery
                  </h2>
                  <p className="text-slate-400 mb-10 max-w-md leading-relaxed">
                    Upload new project installations, manufacturing highlights,
                    and product showcases.
                  </p>
                  <Link
                    to="/admin/gallery"
                    className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] shadow-lg shadow-brand-red/20"
                  >
                    Enter Gallery Admin
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </MotionDiv>

              {/* News Management Card */}
              <MotionDiv
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl p-12 border border-slate-100 shadow-xl group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 blur-3xl rounded-full group-hover:bg-brand-red/5 transition-all duration-300" />
                <div className="relative z-10">
                  <Newspaper size={44} className="text-brand-red mb-8" />
                  <h2 className="font-display text-3xl font-black text-slate-900 mb-4">
                    News &amp; Announcements
                  </h2>
                  <p className="text-slate-500 mb-10 max-w-md leading-relaxed">
                    Publish latest achievements, product launches, and press
                    releases for SEO visibility.
                  </p>
                  <Link
                    to="/admin/news"
                    className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-red text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-lg"
                  >
                    Enter News Editor
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </MotionDiv>
            </div>

            {/* Quick Tips / System Health */}
            <div className="mt-12 p-10 bg-brand-red rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-brand-red/20">
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-black mb-1">
                    CMS Integrity Checked
                  </h3>
                  <p className="text-white/80">
                    All systems operational. Content is synchronizing with
                    public endpoints in real-time.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="px-6 py-3 bg-white/10 rounded-full text-[11px] font-semibold uppercase tracking-wider border border-white/20">
                  v2.1 Stable
                </div>
                <div className="px-6 py-3 bg-white/10 rounded-full text-[11px] font-semibold uppercase tracking-wider border border-white/20">
                  HTTPS Secure
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboardPage;
