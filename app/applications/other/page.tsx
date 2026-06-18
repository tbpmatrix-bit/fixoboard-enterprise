import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Hospital,
  School,
  Building2,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const MotionDiv = motion.div as any;

const OtherApplicationsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* SECTION 1: HERO — no image on this page originally, keeping dark solid bg */}
      <section className="relative min-h-[70vh] flex items-center bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-32 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link
                to="/applications"
                className="hover:text-white transition-colors"
              >
                Applications
              </Link>
              <ChevronRight size={12} />
              <span className="text-white">Other</span>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-6 h-0.5 bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em]">
                Industrial Versatility
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-2">
              Beyond
            </h1>
            <h1 className="font-display text-5xl md:text-6xl font-black text-brand-red leading-tight mb-6">
              The Traditional.
            </h1>

            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-10 mx-auto">
              From retail to critical healthcare environments, Fixoboard
              provides the necessary certification and durability for
              specialized infrastructure.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "SGS Tested",
                "Hospital Grade",
                "Lead-Free",
                "Safety Compliant",
              ].map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider border bg-white/10 text-white border-white/20"
                >
                  {pill}
                </span>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* SECTION 2: SECTORS GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-6 h-0.5 bg-brand-blue" />
              <span className="text-brand-blue text-xs font-semibold uppercase tracking-[0.25em]">
                Where We're Used
              </span>
              <div className="w-6 h-0.5 bg-brand-blue" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
              Built for Every
            </h2>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-red leading-tight">
              Environment.
            </h2>
          </MotionDiv>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ShoppingBag size={22} className="text-brand-blue" />,
                title: "Retail Interiors",
                desc: "Durable display units and partitions for high-traffic stores.",
              },
              {
                icon: <Hospital size={22} className="text-brand-blue" />,
                title: "Hospitals",
                desc: "Anti-bacterial and lead-free surfaces essential for clinical zones.",
              },
              {
                icon: <School size={22} className="text-brand-blue" />,
                title: "Schools",
                desc: "Impact-resistant furniture that withstands intense daily usage.",
              },
              {
                icon: <Building2 size={22} className="text-brand-blue" />,
                title: "Commercial",
                desc: "Long-term cladding and utility solutions for public buildings.",
              },
            ].map((sector, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue/20 transition-colors">
                  {sector.icon}
                </div>
                <h3 className="font-display text-lg font-black text-slate-900 mb-3">
                  {sector.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {sector.desc}
                </p>
              </MotionDiv>
            ))}
          </div>

          {/* Dark certification card */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 p-12 bg-brand-dark rounded-2xl text-white"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: checklist */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-0.5 bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em]">
                    Certified for Specialized Use
                  </span>
                </div>
                <h2 className="font-display text-3xl font-black text-white leading-tight mb-2">
                  Trusted by
                </h2>
                <h2 className="font-display text-3xl font-black text-brand-red leading-tight mb-8">
                  Critical Industries.
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Fixoboard is often selected for projects requiring strict
                  environmental and safety compliance.
                </p>
                <div className="space-y-4">
                  {[
                    "SGS Laboratory Tested",
                    "Hospital-Grade Hygiene",
                    "Public Safety Compliance",
                  ].map((item, idx) => (
                    <MotionDiv
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-brand-blue shrink-0"
                      />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </MotionDiv>
                  ))}
                </div>
              </div>

              {/* Right: consultation card */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-0.5 bg-brand-blue" />
                  <span className="text-brand-blue text-xs font-semibold uppercase tracking-[0.25em]">
                    Expert Consultation
                  </span>
                </div>
                <h4 className="font-display text-xl font-black text-white mb-4">
                  Talk to Our Technical Team.
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Discuss your specific institutional requirements with our
                  technical team to identify the right density and shore
                  hardness for your project.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] shadow-lg shadow-brand-red/20 w-full justify-center"
                >
                  Talk to a Tech Expert <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default OtherApplicationsPage;
