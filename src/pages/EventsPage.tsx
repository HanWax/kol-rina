import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SectionHeading } from "../components/SectionHeading";
import { StainedGlassHero } from "../components/StainedGlassHero";
import { EventCard } from "../components/EventCard";
import type { KolRinaEvent } from "../data/events";
import { getUpcomingEvents } from "../data/events";
import { fetchEvents } from "../lib/api";

export function EventsPage() {
  const [events, setEvents] = useState<KolRinaEvent[]>(getUpcomingEvents());

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => {
        // Keep hardcoded fallback on API failure
      });
  }, []);

  return (
    <div>
      <StainedGlassHero title="Events" subtitle="What's Coming Up" />

      <div className="navy-rule" />

      <section className="py-20 md:py-24 bg-kr-cream relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-kr-coral/[0.04]" />

        <div className="relative max-w-4xl mx-auto px-6">
          <SectionHeading>Upcoming Events</SectionHeading>

          <div className="space-y-4 mt-8">
            {events.map((ev, i) => (
              <EventCard key={ev.id} event={ev} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* High Holy Days */}
      <section className="py-20 bg-kr-parchment relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-kr-gold/[0.03]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-col items-center justify-center w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full bg-kr-navy shadow-[0_8px_50px_rgba(58,73,114,0.25)] mx-auto"
          >
            <span className="font-caps text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-white/60 mb-2">
              Save the Date
            </span>
            <div className="w-20 h-[1.5px] bg-kr-gold/50 mb-2" />
            <h3 className="font-script text-2xl md:text-3xl text-kr-gold">
              High Holy Days
            </h3>
            <div className="w-20 h-[1.5px] bg-kr-gold/50 mt-2 mb-3" />
            <p className="text-white/60 text-[12px] md:text-[13px] px-10 md:px-12 leading-relaxed font-body">
              Partnership-style services for Rosh Hashana & Yom Kippur
            </p>
            <Link
              to="/get-involved"
              className="mt-3 font-caps text-[9px] font-medium tracking-[0.2em] uppercase text-kr-gold hover:text-kr-gold-light border-b border-kr-gold/30 hover:border-kr-gold/60 pb-0.5 transition-all duration-300"
            >
              Join Mailing List
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
