import React, { useState } from "react";
import { motion } from "framer-motion";
import { products } from "../../data/products";
import ProductCard from "../../components/product/ProductCard";
import { Filter, Search } from "lucide-react";

const MotionDiv = motion.div as any;

const ProductsPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── HEADER + SEARCH ── */}
      <section className="bg-brand-dark border-b border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section label — centered variant */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-6 h-0.5 bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em]">
                Product Catalog
              </span>
              <div className="w-6 h-0.5 bg-brand-red" />
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-2">
              Our Product
            </h1>
            <h1 className="font-display text-4xl md:text-5xl font-black text-brand-red leading-tight mb-6">
              Range.
            </h1>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
              Explore our comprehensive range of high-performance PVC and WPC
              materials engineered for structural integrity and environmental
              sustainability.
            </p>
          </MotionDiv>

          {/* Search + Filter */}
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-xl mx-auto flex gap-3"
          >
            <div className="relative flex-grow">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products or specs..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-blue focus:bg-white/15 transition-all outline-none text-sm"
              />
            </div>
            <button className="bg-white/10 border border-white/10 px-5 py-3.5 rounded-xl text-white hover:bg-white/20 transition-all flex items-center gap-2 text-sm font-semibold">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </MotionDiv>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, idx) => (
              <MotionDiv
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <ProductCard product={p} />
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
