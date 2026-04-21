import { useState, useEffect } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { motion } from "motion/react";
import { getEventById, typeStyles } from "../data/events";
import type { KolRinaEvent } from "../data/events";
import { StainedGlassHero } from "../components/StainedGlassHero";
import { SectionHeading } from "../components/SectionHeading";
import { BookingForm } from "../components/BookingForm";
import { BookingStatus } from "../components/BookingStatus";
import { BankTransferCard } from "../components/BankTransferCard";
import { fetchEvent } from "../lib/api";

export function EventDetailPage() {
  const { eventId } = useParams({ strict: false });
  const [event, setEvent] = useState<KolRinaEvent | null | undefined>(
    eventId ? getEventById(eventId) ?? undefined : undefined,
  );
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (eventId) {
      fetchEvent(eventId)
        .then((data) => {
          if (data) setEvent(data);
          else if (!event) setEvent(null);
        })
        .catch(() => {
          // Keep hardcoded fallback on API failure
          if (!event) setEvent(null);
        });
    }
  }, [eventId]);

  if (event === undefined) {
    return (
      <div>
        <StainedGlassHero title="Loading..." subtitle="Events" />
        <div className="navy-rule" />
      </div>
    );
  }

  if (!event) {
    return (
      <div>
        <StainedGlassHero title="Not Found" subtitle="Events" />
        <div className="navy-rule" />
        <section className="py-20 bg-kr-cream">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-kr-muted font-body text-lg mb-6">
              We couldn't find this event.
            </p>
            <Link
              to="/events"
              className="font-caps text-[11px] font-semibold tracking-[0.15em] uppercase text-kr-navy hover:text-kr-navy-deep border-b border-kr-navy/30 hover:border-kr-navy/60 pb-0.5 transition-all"
            >
              Back to Events
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const style = typeStyles[event.type];

  return (
    <div>
      <StainedGlassHero title={event.title} subtitle={style.label} />

      <div className="navy-rule" />

      {/* Event Details */}
      <section className="py-16 md:py-20 bg-kr-cream relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-kr-coral/[0.04]" />

        <div className="relative max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 font-caps text-[10px] font-semibold tracking-[0.15em] uppercase text-kr-muted hover:text-kr-navy transition-colors mb-8"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to Events
          </Link>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3 mb-10"
          >
            <div className="flex flex-wrap items-center gap-3 text-[14px] font-body text-kr-muted">
              <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
              <span className="font-caps text-[10px] font-semibold tracking-[0.18em] uppercase">
                {style.label}
              </span>
              <span className="text-kr-muted/40">&middot;</span>
              <span className="italic">
                {event.date}
                {event.endDate ? ` – ${event.endDate}` : ""}
              </span>
              {event.time ? (
                <>
                  <span className="text-kr-muted/40">&middot;</span>
                  <span>{event.time}</span>
                </>
              ) : null}
            </div>
            {event.location ? (
              <p className="text-[14px] text-kr-muted font-body">
                {event.location}
              </p>
            ) : null}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4 mb-10"
          >
            {event.description.map((para, i) => (
              <p
                key={i}
                className="text-kr-text text-[16px] font-body leading-relaxed"
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Schedule */}
          {event.schedule && event.schedule.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-10"
            >
              <h3 className="font-caps text-[11px] font-semibold tracking-[0.2em] uppercase text-kr-navy mb-4">
                Programme
              </h3>
              <div className="bg-kr-white rounded-2xl border border-kr-navy/[0.06] overflow-hidden">
                {event.schedule.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 px-6 py-4 ${
                      i > 0 ? "border-t border-kr-navy/[0.05]" : ""
                    }`}
                  >
                    <span className="font-body text-[14px] text-kr-gold font-semibold w-20 flex-shrink-0">
                      {item.time}
                    </span>
                    <span className="font-body text-[15px] text-kr-text">
                      {item.activity}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* Booking Section */}
      {event.booking ? (
        <section className="py-16 md:py-20 bg-kr-parchment relative overflow-hidden">
          <div className="absolute bottom-0 -left-16 w-44 h-44 rounded-full bg-kr-teal/[0.04]" />

          <div className="relative max-w-xl mx-auto px-6">
            <SectionHeading>Book Your Place</SectionHeading>

            {/* Booking status */}
            <div className="mb-8">
              <BookingStatus booking={event.booking} />
            </div>

            {/* Booking form */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-kr-white rounded-2xl p-7 md:p-9 border border-kr-navy/[0.06] shadow-[0_4px_20px_rgba(43,58,103,0.04)]"
            >
              <BookingForm
                booking={event.booking}
                eventId={event.id}
                onSuccess={() => setBookingConfirmed(true)}
              />
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Payment Section */}
      {event.payment ? (
        <section
          id="payment"
          className="py-16 md:py-20 bg-kr-cream relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-kr-gold/[0.04]" />

          <div className="relative max-w-md mx-auto px-6">
            <SectionHeading>Payment</SectionHeading>

            <BankTransferCard
              payment={event.payment}
              highlight={bookingConfirmed}
            />
          </div>
        </section>
      ) : null}

      {/* Bottom back link */}
      <section className="py-12 bg-kr-parchment">
        <div className="text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 font-caps text-[10px] font-semibold tracking-[0.15em] uppercase text-kr-muted hover:text-kr-navy transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to All Events
          </Link>
        </div>
      </section>
    </div>
  );
}
