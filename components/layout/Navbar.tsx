// components/layout/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { LANGUAGES } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  ChevronDown,
  Box,
  LayoutPanelLeft,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

// ─── TYPE DEFINITIONS ────────────────────────────────────────────────────────
// This teaches TypeScript what shape our nav data has.
// "?" means the property is optional — not every link has a dropdown.
interface SubLink {
  key: string; // stable identity — never translated, safe for React keys/logic
  labelKey: string; // path into common.json — this is what gets translated
  path: string;
}

interface NavLink {
  key: string;
  labelKey: string;
  path: string;
  mega?: SubLink[];
}

// ─── NAV DATA ────────────────────────────────────────────────────────────────
// "key" is a stable English identifier — used for React keys and icon logic,
// NEVER shown to the user and NEVER translated.
// "labelKey" points into common.json's "nav" namespace — this is what t() resolves.
const navLinks: NavLink[] = [
  { key: "home", labelKey: "nav.home", path: "/" },
  { key: "about", labelKey: "nav.about", path: "/about" },
  {
    key: "products",
    labelKey: "nav.products",
    path: "/products",
    mega: [
      {
        key: "features",
        labelKey: "nav.productsMega.features",
        path: "/products/features",
      },
      {
        key: "pvcWpcPly",
        labelKey: "nav.productsMega.pvcWpcPly",
        path: "/products/pvc-wpc-ply",
      },
      {
        key: "wpcDoors",
        labelKey: "nav.productsMega.wpcDoors",
        path: "/products/wpc-doors",
      },
      {
        key: "prelaminatePly",
        labelKey: "nav.productsMega.prelaminatePly",
        path: "/products/prelaminate-ply",
      },
      {
        key: "wpcDoorFrames",
        labelKey: "nav.productsMega.wpcDoorFrames",
        path: "/products/wpc-door-frames",
      },
      {
        key: "pvcMarbleSheets",
        labelKey: "nav.productsMega.pvcMarbleSheets",
        path: "/products/pvc-marble-sheets",
      },
    ],
  },
  {
    key: "applications",
    labelKey: "nav.applications",
    path: "/applications/kitchen",
    mega: [
      {
        key: "kitchen",
        labelKey: "nav.applicationsMega.kitchen",
        path: "/applications/kitchen",
      },
      {
        key: "doors",
        labelKey: "nav.applicationsMega.doors",
        path: "/applications/doors",
      },
      {
        key: "wardrobe",
        labelKey: "nav.applicationsMega.wardrobe",
        path: "/applications/wardrobe",
      },
      {
        key: "office",
        labelKey: "nav.applicationsMega.office",
        path: "/applications/office",
      },
      {
        key: "wpcGrills",
        labelKey: "nav.applicationsMega.wpcGrills",
        path: "/applications/wpc-grills",
      },
      {
        key: "panels3d",
        labelKey: "nav.applicationsMega.panels3d",
        path: "/applications/3d-panels",
      },
      {
        key: "shuttering",
        labelKey: "nav.applicationsMega.shuttering",
        path: "/applications/shuttering",
      },
      {
        key: "other",
        labelKey: "nav.applicationsMega.other",
        path: "/applications/other",
      },
    ],
  },
  {
    key: "certifications",
    labelKey: "nav.certifications",
    path: "/certifications",
  },
  { key: "gallery", labelKey: "nav.gallery", path: "/gallery" },
  { key: "news", labelKey: "nav.news", path: "/news" },
  { key: "contact", labelKey: "nav.contact", path: "/contact" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  // ── STATE ──────────────────────────────────────────────────────────────────
  // useState(false) means "this variable starts as false"
  // setIsOpen is the function you call to change it
  const [isOpen, setIsOpen] = useState(false); // mobile menu open/closed
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // which desktop dropdown is open (null = none)
  const [scrolled, setScrolled] = useState(false); // has user scrolled down?

  // useLocation() gives us the current URL path (e.g. "/products")
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // ── SCROLL DETECTION ───────────────────────────────────────────────────────
  // useEffect runs code AFTER the component renders.
  // The second argument [] means "run this only once, when the component first appears".
  // This adds a scroll listener to change the navbar shadow when user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    // The "return" here is a cleanup function — it removes the listener
    // when the component is removed from the page (prevents memory leaks).
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── CLOSE MOBILE MENU ON ROUTE CHANGE ──────────────────────────────────────
  // This useEffect watches location.pathname. Every time the URL changes
  // (user clicked a link), it closes the mobile menu automatically.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // ── HELPER: is this link currently active? ─────────────────────────────────
  // A plain function that returns true/false.
  // We use it to highlight the current page in the nav.
  const isActive = (path: string): boolean => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* ── TOP BAR ── shown only on large screens ── */}
      <div className="hidden lg:block bg-brand-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          {/* Left: contact info */}
          <div className="flex items-center gap-8">
            <a
              href="tel:+919930349472"
              className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-brand-red transition-colors"
            >
              <Phone size={11} className="text-brand-red" />
              +91 99303 49472
            </a>

            <a
              href="mailto:info@fixoboard.com"
              className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-brand-red transition-colors"
            >
              <Mail size={11} className="text-brand-red" />
              info@fixoboard.com
            </a>
          </div>

          {/* Right: locations */}
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            <Globe size={11} />
            {t("topbar.locations")}
          </div>
        </div>
      </div>

      {/* ── MAIN NAV BAR ── */}
      {/*
        This div changes style based on the "scrolled" state.
        When scrolled = true  → add shadow + fully white background
        When scrolled = false → slightly transparent + no shadow
        This is called a "conditional class" — very common in Tailwind + React.
      */}
      <div
        className={`
        bg-white border-b border-slate-200 transition-shadow duration-300
        ${scrolled ? "shadow-lg shadow-slate-200/60" : "shadow-none"}
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* ── LOGO ── */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src="assets/logo/fix_logo.svg"
                alt="Fixoboard"
                className="h-10 w-auto"
              />
            </Link>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(link.key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {/* The nav link itself */}
                  <Link
                    to={link.path}
                    className={`
                      flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold
                      transition-colors duration-150
                      ${
                        isActive(link.path)
                          ? "text-brand-red"
                          : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                      }
                    `}
                  >
                    {t(link.labelKey)}
                    {/* Only show chevron if this link HAS a dropdown */}
                    {link.mega && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          activeMenu === link.key ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* ── DROPDOWN MEGA MENU ── */}
                  {/*
                    AnimatePresence lets Framer Motion animate elements
                    when they're REMOVED from the page (exit animation).
                    Without it, the exit animation would be skipped.
                  */}
                  {link.mega && (
                    <AnimatePresence>
                      {activeMenu === link.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[540px]"
                        >
                          {/* The white card */}
                          <div className="bg-white rounded-2xl shadow-lg shadow-slate-150 border border-slate-100 p-6 mega-menu-gradient">
                            <div className="grid grid-cols-2 gap-1">
                              {link.mega.map((sub) => (
                                <Link
                                  key={sub.key}
                                  to={sub.path}
                                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-brand-blue hover:text-white transition-all duration-150"
                                >
                                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                                    {link.key === "products" ? (
                                      <Box size={14} />
                                    ) : (
                                      <LayoutPanelLeft size={14} />
                                    )}
                                  </div>
                                  {t(sub.labelKey)}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* ── RIGHT SIDE: CTA + MOBILE TRIGGER ── */}
            <div className="flex items-center gap-3">
              {/* Get Quote — visible on desktop */}
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>
              <Link
                to="/get-quote"
                className="hidden lg:flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-red/20 hover:shadow-brand-red/30 hover:scale-[1.02]"
              >
                {t("cta.getQuote")}
              </Link>
              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label={t("aria.toggleMenu")}
              >
                {/* Animate between Menu and X icon */}
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-y-auto max-h-[calc(100vh-80px)]"
          >
            <div className="px-4 py-6 space-y-1 pb-20">
              {navLinks.map((link) => (
                <div key={link.key}>
                  {/* Parent link */}
                  <Link
                    to={link.path}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold
                      transition-colors
                      ${
                        isActive(link.path)
                          ? "bg-brand-red/5 text-brand-red"
                          : "text-slate-800 hover:bg-slate-50"
                      }
                    `}
                  >
                    {t(link.labelKey)}
                    {link.mega && (
                      <ChevronDown size={16} className="text-slate-400" />
                    )}
                  </Link>

                  {/* Sub-links — indented below parent */}
                  {link.mega && (
                    <div className="ml-4 mt-1 mb-2 pl-4 border-l-2 border-slate-100 space-y-0.5">
                      {link.mega.map((sub) => (
                        <Link
                          key={sub.key}
                          to={sub.path}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-brand-blue hover:bg-slate-50 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                          {t(sub.labelKey)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA + contact */}
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                {/* Language switcher — mobile */}
                <div className="flex flex-wrap gap-2 pb-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => i18n.changeLanguage(lang.code)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        lang.code === i18n.language
                          ? "bg-brand-blue text-white border-brand-blue"
                          : "bg-white text-slate-500 border-slate-200 hover:border-brand-blue hover:text-brand-blue"
                      }`}
                    >
                      {lang.nativeLabel}
                    </button>
                  ))}
                </div>
                <Link
                  to="/get-quote"
                  className="w-full bg-brand-red text-white py-4 rounded-xl text-center block font-bold uppercase tracking-wider text-sm shadow-lg shadow-brand-red/20"
                >
                  {t("cta.getQuote")}
                </Link>
                <div className="flex gap-3">
                  <a
                    href="tel:+919930349472"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <Phone size={16} className="text-brand-red" />
                    {t("cta.call")}
                  </a>

                  <a
                    href="mailto:info@fixoboard.com"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <Mail size={16} className="text-brand-blue" />
                    {t("cta.email")}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
