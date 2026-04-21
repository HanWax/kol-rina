import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "../components/SectionHeading";
import { StainedGlassHero } from "../components/StainedGlassHero";
import type { KolRinaEvent } from "../data/events";
import {
  getUpcomingEvents,
  sortEventsChronologically,
} from "../data/events";
import { fetchEvents } from "../lib/api";

export function MinyanDatesPage() {
  const [events, setEvents] = useState<KolRinaEvent[]>(getUpcomingEvents());

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(sortEventsChronologically(data)))
      .catch(() => {
        // Keep hardcoded fallback on API failure
      });
  }, []);

  const dates = events.filter((e) => e.type === "shabbat");

  return (
    <div>
      <StainedGlassHero title="Minyan Dates" subtitle="Upcoming Services" />

      <div className="navy-rule" />

      <section className="py-20 md:py-24 bg-kr-cream relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-kr-coral/[0.04]" />
        <div className="absolute bottom-20 -left-20 w-56 h-56 rounded-full bg-kr-teal/[0.04]" />

        <div className="relative max-w-4xl mx-auto px-6">
          <SectionHeading>Upcoming Dates</SectionHeading>

          <p className="text-center text-kr-muted text-[15px] mb-10 max-w-xl mx-auto">
            We meet every few Shabbatot for an uplifting Shacharit service. All are welcome.
          </p>

          {dates.length === 0 ? (
            <p className="text-center text-kr-muted font-body">
              No upcoming Shabbat dates scheduled.
            </p>
          ) : (
            <div className="space-y-3">
              {dates.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group bg-kr-white rounded-xl border border-kr-navy/[0.06] hover:border-kr-coral/25 transition-all duration-500 hover:shadow-[0_6px_24px_rgba(186,145,146,0.06)]"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 p-5 md:p-6">
                    {/* Coral dot */}
                    <div className="hidden md:block w-3 h-3 rounded-full bg-kr-coral/30 group-hover:bg-kr-coral/70 transition-colors duration-500 flex-shrink-0" />

                    <div className="flex-1">
                      <h3 className="font-heading text-lg md:text-xl font-semibold text-kr-navy">
                        {d.date}
                      </h3>
                      <p className="text-kr-coral font-body italic text-[15px] mt-0.5">
                        {d.title}
                      </p>
                    </div>

                    <div className="md:text-right text-[13px] text-kr-muted space-y-0.5">
                      {d.time ? (
                        <p>
                          Shacharit:{" "}
                          <span className="font-semibold text-kr-text">
                            {d.time}
                          </span>
                        </p>
                      ) : null}
                      {d.location ? (
                        <p>
                          Venue:{" "}
                          <span className="font-semibold text-kr-text">
                            {d.location}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Note */}
      <section className="py-16 bg-kr-parchment relative overflow-hidden">
        <div className="absolute -bottom-12 right-[10%] w-36 h-36 rounded-full bg-kr-navy/[0.03]" />

        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Small teal circle accent */}
            <div className="w-16 h-16 rounded-full bg-kr-teal/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-kr-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <h3 className="font-caps text-[12px] font-bold tracking-[0.2em] uppercase text-kr-navy mb-3">
              Please Note
            </h3>
            <p className="text-kr-muted leading-relaxed text-[15px] max-w-lg mx-auto">
              Services are not held every Shabbat. Please check this page or sign up to
              our mailing list for the most up-to-date schedule. Dates and times may
              occasionally change.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
