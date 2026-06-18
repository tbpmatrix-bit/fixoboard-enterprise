import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../../data/products";
import ProductCard from "../../../components/product/ProductCard";
import {
  RefreshCw,
  Droplets,
  ShieldAlert,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const MotionDiv = motion.div as any;

const ShutteringApplicationPage: React.FC = () => {
  const product = products.find((p) => p.slug === "pvc-wpc-ply");

  return (
    <div className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[70vh] flex items-center bg-brand-dark text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=2070"
          alt="Construction Site"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
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
              <span className="text-white">Shuttering</span>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-6 h-0.5 bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em]">
                Industrial Construction Formwork
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-2">
              Shuttering &
            </h1>
            <h1 className="font-display text-5xl md:text-6xl font-black text-brand-red leading-tight mb-6">
              Centering.
            </h1>

            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-10 mx-auto">
              Revolutionizing concrete construction with high-reusability WPC
              panels that eliminate water absorption and surface finishing
              costs.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "60+ Reuses",
                "Zero Water Soak",
                "Mirror Finish",
                "Alkali Resistant",
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

      {/* SECTION 2: FEATURES GRID */}
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
                Why WPC for Formwork
              </span>
              <div className="w-6 h-0.5 bg-brand-blue" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
              Built for the
            </h2>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-red leading-tight">
              Toughest Sites.
            </h2>
          </MotionDiv>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <RefreshCw size={24} className="text-brand-blue" />,
                title: "High Reusability",
                desc: "Superior repetitions (up to 60) in concrete formwork compared to traditional ply.",
              },
              {
                icon: <Droplets size={24} className="text-brand-blue" />,
                title: "Zero Water Soak",
                desc: "Maintains weight and dimensions as it does not absorb water from concrete mix.",
              },
              {
                icon: <ShieldAlert size={24} className="text-brand-blue" />,
                title: "Mirror Finish",
                desc: "Leaves a smooth, paint-ready concrete surface that requires zero extra plastering.",
              },
            ].map((feature, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-black text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </MotionDiv>
            ))}
          </div>

          {/* Technical superiority + product card */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 p-12 bg-slate-50 rounded-2xl border border-slate-200"
          >
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-0.5 bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em]">
                    Technical Superiority
                  </span>
                </div>
                <h2 className="font-display text-3xl font-black text-slate-900 leading-tight mb-2">
                  Where Traditional
                </h2>
                <h2 className="font-display text-3xl font-black text-brand-red leading-tight mb-6">
                  Plywood Fails.
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Standard construction plywood fails due to delamination.
                  FixoBoard WPC panels remain structurally sound after multiple
                  cycles.
                </p>
                <div className="space-y-4">
                  {[
                    "Alkali & Corrosion Resistant",
                    "Easy Nail & Screw Removal",
                    "Zero Maintenance Requirement",
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
                      <span className="text-slate-600 text-sm">{item}</span>
                    </MotionDiv>
                  ))}
                </div>
              </div>

              {product && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                  <ProductCard product={product} />
                </div>
              )}
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default ShutteringApplicationPage;
