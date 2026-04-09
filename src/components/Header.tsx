import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/minyan-dates", label: "Minyan Dates" },
  { to: "/learning", label: "Learning" },
  { to: "/events", label: "Events" },
  { to: "/get-involved", label: "Get Involved" },
] as const;

function LogoBadge() {
  return (
    <Link to="/" className="block group" aria-label="Kol Rina home">
      <div className="w-[88px] h-[88px] md:w-[100px] md:h-[100px] rounded-full bg-kr-navy flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(58,73,114,0.35)] group-hover:shadow-[0_6px_30px_rgba(58,73,114,0.5)] transition-shadow duration-500 relative overflow-hidden">
        {/* Subtle inner ring */}
        <div className="absolute inset-[3px] rounded-full border border-white/[0.08]" />
        <span className="font-script text-white text-[22px] md:text-[26px] leading-[1.1] relative z-10">
          Kol
        </span>
        <span className="font-script text-white text-[22px] md:text-[26px] leading-[1.1] -mt-0.5 relative z-10">
          Rina
        </span>
        <span className="text-white text-[11px] md:text-[12px] mt-0.5 relative z-10" style={{ fontFamily: "serif" }}>
          קול רינה
        </span>
      </div>
    </Link>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [routerState.location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-kr-cream/95 backdrop-blur-md shadow-[0_1px_0_rgba(58,73,114,0.1)]"
          : "bg-kr-cream"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-8 py-3">
          {/* Logo badge — positioned to overlap below */}
          <div className="flex-shrink-0 -mb-4 relative z-10">
            <LogoBadge />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 pt-2 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-5 py-2 font-caps text-[12px] font-medium tracking-[0.2em] uppercase text-kr-navy/60 hover:text-kr-navy transition-colors duration-300 relative group"
                activeProps={{
                  className:
                    "px-5 py-2 font-caps text-[12px] font-medium tracking-[0.2em] uppercase text-kr-navy transition-colors duration-300 relative group",
                }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
                {/* Underline on hover / active */}
                <span className="absolute bottom-0 left-5 right-5 h-[1.5px] bg-kr-navy scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Spacer for symmetry on desktop */}
          <div className="hidden md:block w-[100px] flex-shrink-0" />

          {/* Mobile toggle */}
          <button
            className="md:hidden ml-auto p-2 text-kr-navy/70 hover:text-kr-navy transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span
                className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Navy rule under header */}
      <div className="navy-rule" />

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-kr-cream border-b-2 border-kr-navy"
          >
            <div className="px-6 py-3 space-y-0.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <Link
                    to={link.to}
                    className="block px-4 py-2.5 font-caps text-[11px] font-medium tracking-[0.2em] uppercase text-kr-navy/60 hover:text-kr-navy transition-colors"
                    activeProps={{
                      className:
                        "block px-4 py-2.5 font-caps text-[11px] font-medium tracking-[0.2em] uppercase text-kr-navy font-semibold transition-colors",
                    }}
                    activeOptions={{ exact: link.to === "/" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
