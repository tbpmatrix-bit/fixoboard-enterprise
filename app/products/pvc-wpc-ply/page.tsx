import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../../data/products";
import ProductComparisonTable from "../../../components/product/ProductComparisonTable";
import {
  CheckCircle2,
  Hammer,
  ShieldCheck,
  Layers,
  FileText,
  Sparkles,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const MotionDiv = motion.div as any;

const PVCWPCPage: React.FC = () => {
  const product = products.find((p) => p.slug === "pvc-wpc-ply")!;

  return (
    <div className="bg-white pb-24">
      {/* ── HERO ── */}
      <section className="bg-brand-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight size={12} />
                <Link
                  to="/products"
                  className="hover:text-white transition-colors"
                >
                  Products
                </Link>
                <ChevronRight size={12} />
                <span className="text-white">PVC / WPC Ply</span>
              </div>

              {/* Section label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-0.5 bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em]">
                  Industrial Grade Boards
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-2">
                PVC / WPC
              </h1>
              <h1 className="font-display text-4xl md:text-5xl font-black text-brand-red leading-tight mb-6">
                Ply.
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                A new generation eco-friendly board — highly durable with
                features superior to traditional plywood. Resistant to weather,
                moisture, fire, and termites.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] shadow-lg shadow-brand-red/20"
                >
                  Request Pricing <ArrowRight size={15} />
                </Link>
                <button className="inline-flex items-center gap-2 bg-white/10 border border-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all">
                  <FileText size={15} />
                  Download Catalog
                </button>
              </div>
            </MotionDiv>

            {/* Image */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80"
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-dark/20" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 hidden md:block">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="font-black text-slate-900 text-sm">
                    Lead Free Certified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Safe for healthcare & food prep areas
                </p>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* ── SPECS + COMPARISON ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left — Comparison Table */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-0.5 bg-brand-blue" />
                <span className="text-brand-blue text-xs font-semibold uppercase tracking-[0.25em]">
                  Performance Analysis
                </span>
              </div>
              <h2 className="font-display text-3xl font-black text-slate-900 leading-tight mb-2">
                Comparative
              </h2>
              <h2 className="font-display text-3xl font-black text-brand-blue leading-tight mb-10">
                Performance.
              </h2>
              <ProductComparisonTable />
            </div>

            {/* Right — Technical Data */}
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-brand-dark text-white rounded-2xl p-8 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-6 h-0.5 bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em]">
                  Technical Data
                </span>
              </div>

              <div className="space-y-5 flex-grow">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-white/10 pb-4">
                    <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest block mb-1">
                      {key}
                    </span>
                    <span className="text-white font-semibold text-sm">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-brand-blue/10 border border-brand-blue/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={14} className="text-brand-blue" />
                  <span className="text-brand-blue text-[10px] font-semibold uppercase tracking-widest">
                    Custom Sizes
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  We offer custom cutting and thickness production for
                  project-specific requirements.
                </p>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* ── SURFACE TREATMENTS ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-brand-red" />
            <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em]">
              Finishing Options
            </span>
            <div className="w-6 h-0.5 bg-brand-red" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-black text-slate-900 leading-tight text-center mb-2">
            Infinite Finish
          </h2>
          <h2 className="font-display text-3xl md:text-4xl font-black text-brand-red leading-tight text-center mb-6">
            Possibilities.
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-center leading-relaxed mb-16">
            FixoBoard surface acts as a perfect canvas for all traditional and
            modern finishing techniques.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "PU Gloss / Matt", icon: <Sparkles size={24} /> },
              { name: "Direct Paint", icon: <Hammer size={24} /> },
              { name: "Digital Printing", icon: <Layers size={24} /> },
              { name: "PVC Foil / Laminate", icon: <ShieldCheck size={24} /> },
            ].map((fin, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white p-8 rounded-2xl border border-slate-200 text-center flex flex-col items-center hover:border-brand-red transition-colors duration-200 group"
              >
                <div className="w-14 h-14 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mb-5 group-hover:bg-brand-red group-hover:text-white transition-all duration-200">
                  {fin.icon}
                </div>
                <span className="font-display font-black text-slate-900 text-sm">
                  {fin.name}
                </span>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PVCWPCPage;
