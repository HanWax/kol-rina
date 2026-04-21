import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { KolRinaEvent } from "../data/events";
import { typeStyles } from "../data/events";

export function EventCard({
  event,
  index = 0,
}: {
  event: KolRinaEvent;
  index?: number;
}) {
  const style = typeStyles[event.type];
  const isBookable = event.booking && !event.booking.closed;

  return (
    <Link to="/events/$eventId" params={{ eventId: event.id }}>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
        className="bg-kr-white rounded-2xl p-7 border border-kr-navy/[0.06] hover:shadow-[0_8px_30px_rgba(43,58,103,0.08)] transition-all duration-500 group cursor-pointer"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
          <span className="font-caps text-[10px] font-semibold tracking-[0.18em] uppercase text-kr-muted">
            {style.label}
          </span>
          <span className="text-kr-muted/40">&middot;</span>
          <span className="text-[13px] text-kr-muted font-body italic">
            {event.date}
            {event.endDate ? ` – ${event.endDate}` : ""}
          </span>

          {isBookable ? (
            <>
              <span className="text-kr-muted/40">&middot;</span>
              <span className="font-caps text-[9px] font-bold tracking-[0.15em] uppercase text-kr-teal bg-kr-teal/[0.08] px-2.5 py-0.5 rounded-full">
                Book Now
              </span>
            </>
          ) : null}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-heading text-2xl font-semibold text-kr-navy mb-2 group-hover:text-kr-navy-deep transition-colors">
              {event.title}
            </h3>
            <p className="text-kr-muted leading-relaxed text-[15px] font-body">
              {event.summary}
            </p>
          </div>

          {/* Arrow indicator */}
          <span className="mt-2 text-kr-navy/30 group-hover:text-kr-navy/60 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
