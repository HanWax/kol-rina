import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SectionHeading } from "../components/SectionHeading";
import type { KolRinaEvent } from "../data/events";
import { getUpcomingEvents } from "../data/events";
import { fetchEvents } from "../lib/api";

export function HomePage() {
  const [events, setEvents] = useState<KolRinaEvent[]>(getUpcomingEvents());

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => {
        // Keep hardcoded fallback on API failure
      });
  }, []);

  const upcomingDates = events
    .filter((e) => e.type === "shabbat")
    .slice(0, 4);

  return (
    <div>
      {/* ============================================= */}
      {/* HERO — Chagall painting + overlapping circles */}
      {/* ============================================= */}
      <section className="relative overflow-hidden bg-kr-cream">
        {/* Chagall painting hero background */}
        <div className="relative w-full h-[400px] md:h-[520px] overflow-hidden flex items-center justify-center pt-[100px] md:pt-[115px]">
          <img
            src="/hero-chagall.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          {/* Welcome circle — navy, centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full bg-kr-navy shadow-[0_8px_50px_rgba(58,73,114,0.5)] flex flex-col items-center justify-center z-10"
          >
            <span className="font-caps text-[9px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-white/60">
              Welcome to
            </span>
            <h1 className="font-script text-3xl md:text-5xl text-kr-gold mt-1 drop-shadow-[0_2px_10px_rgba(179,153,98,0.3)]">
              Kol Rina
            </h1>
            <div className="flex items-center gap-0 my-2 md:my-3 w-28 md:w-40">
              <div className="flex-1 h-[1.5px] bg-kr-gold/70" />
            </div>
            <p className="font-caps text-[9px] md:text-[11px] font-semibold tracking-[0.2em] uppercase text-white text-center leading-relaxed px-6">
              The Golders Green
              <br />
              Partnership Minyan
            </p>
            <div className="flex items-center gap-0 my-2 md:my-3 w-28 md:w-40">
              <div className="flex-1 h-[1.5px] bg-kr-gold/70" />
            </div>
            <Link
              to="/minyan-dates"
              className="font-caps text-[9px] md:text-[10px] font-medium tracking-[0.25em] uppercase text-kr-gold hover:text-kr-gold-light transition-colors duration-300 mt-1"
            >
              Minyan Dates
            </Link>
          </motion.div>
        </div>

        {/* Navy rule under hero image */}
        <div className="h-[3px] bg-kr-navy" />
      </section>

      {/* ============================================= */}
      {/* WHO ARE WE — Coral circle + teal Support      */}
      {/* ============================================= */}
      <section className="relative py-16 md:py-24 bg-kr-cream overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-0">
            {/* Coral circle — Who Are We */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-kr-coral shadow-[0_8px_50px_rgba(186,145,146,0.25)] flex flex-col items-center justify-center px-10 md:px-14 text-center relative z-10"
            >
              <h2 className="font-caps text-[13px] md:text-[15px] font-bold tracking-[0.2em] uppercase text-kr-navy mb-4 md:mb-5">
                Who Are We?
              </h2>
              <p className="text-kr-navy text-[13px] md:text-[15px] leading-relaxed font-body">
                <span className="font-script text-kr-navy-deep text-lg">Kol Rina</span> is a
                lay-led partnership minyan which meets every few Shabbatot. We offer
                uplifting and song-filled orthodox prayer, in which both men and women
                participate to the extent permitted by halacha. We run a range of
                educational and social events to complement our minyanim.
              </p>
            </motion.div>

            {/* Teal circle — Membership */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full bg-kr-teal shadow-[0_8px_50px_rgba(123,152,120,0.25)] flex flex-col items-center justify-center px-8 md:px-10 text-center md:-ml-12 md:mt-28 relative z-20"
            >
              <span className="font-caps text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-kr-navy">
                Become a
              </span>
              <span className="font-script text-2xl md:text-3xl text-kr-navy-deep mt-1">
                Member
              </span>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdqXFWRy-84vUVLP4O7t-7kNBXUk1wsweJd5wQ8o_cNgdanVw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-4 py-1.5 bg-kr-navy text-white font-caps text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-kr-navy-deep transition-colors duration-300"
              >
                Join Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navy rule divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-[2px] bg-kr-navy/15" />
      </div>

      {/* ============================================= */}
      {/* UPCOMING DATES                                */}
      {/* ============================================= */}
      <section className="py-20 md:py-24 bg-kr-cream">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading>Upcoming Minyan Dates</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            {upcomingDates.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative bg-kr-white rounded-2xl p-7 border border-kr-navy/[0.06] hover:border-kr-coral/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(186,145,146,0.08)]"
              >
                {/* Coral dot accent */}
                <div className="absolute top-7 right-7 w-2 h-2 rounded-full bg-kr-coral/40 group-hover:bg-kr-coral/80 transition-colors duration-300" />

                <p className="font-heading text-xl md:text-2xl font-semibold text-kr-navy leading-tight">
                  {d.date}
                </p>
                <p className="font-body text-kr-coral text-[15px] mt-1.5 italic">
                  {d.title}
                </p>
                {d.time && (
                  <p className="text-[12px] text-kr-muted mt-3 font-caps tracking-[0.15em] uppercase">
                    Shacharit {d.time}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/minyan-dates"
              className="inline-flex items-center gap-2 font-caps text-[11px] font-semibold tracking-[0.2em] uppercase text-kr-navy/60 hover:text-kr-coral transition-colors duration-300 group"
            >
              See all dates
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* CTA                                           */}
      {/* ============================================= */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-kr-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex flex-col items-center justify-center w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-kr-coral shadow-[0_8px_50px_rgba(186,145,146,0.2)] mx-auto"
          >
            <h2 className="font-caps text-[11px] md:text-[13px] font-bold tracking-[0.25em] uppercase text-white mb-3">
              Join Our Community
            </h2>
            <div className="w-16 md:w-24 h-[1.5px] bg-white/30 mb-4" />
            <p className="text-white/80 text-[13px] md:text-[15px] px-10 md:px-14 leading-relaxed font-body">
              Whether you'd like to daven, lein, or simply join us for Shabbat — we'd
              love to hear from you.
            </p>
            <Link
              to="/get-involved"
              className="mt-5 px-7 py-2.5 bg-kr-navy text-white font-caps text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-kr-navy-deep transition-colors duration-300"
            >
              Get Involved
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
