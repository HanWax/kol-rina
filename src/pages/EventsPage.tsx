import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SectionHeading } from "../components/SectionHeading";
import { StainedGlassHero } from "../components/StainedGlassHero";
import { EventCard } from "../components/EventCard";
import type { KolRinaEvent } from "../data/events";
import {
  getUpcomingEvents,
  sortEventsChronologically,
} from "../data/events";
import { fetchEvents } from "../lib/api";

export function EventsPage() {
  const [events, setEvents] = useState<KolRinaEvent[]>(getUpcomingEvents());

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(sortEventsChronologically(data)))
      .catch(() => {
        // Keep hardcoded fallback on API failure
      });
  }, []);

  const specialEvents = events.filter((e) => e.type !== "shabbat");

  return (
    <div>
      <StainedGlassHero title="Events" subtitle="What's Coming Up" />

      <div className="navy-rule" />

      <section className="py-20 md:py-24 bg-kr-cream relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-kr-coral/[0.04]" />

        <div className="relative max-w-4xl mx-auto px-6">
          <SectionHeading>Upcoming Events</SectionHeading>

          {specialEvents.length === 0 ? (
            <p className="text-center text-kr-muted font-body">
              No special events scheduled.
            </p>
          ) : (
            <div className="flex flex-col gap-10 md:gap-12 mt-8">
              {specialEvents.map((ev, i) => (
                <EventCard key={ev.id} event={ev} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
