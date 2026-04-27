import { motion } from "motion/react";
import type { EventBookingConfig } from "../data/events";

export function BookingStatus({ booking }: { booking: EventBookingConfig }) {
  if (booking.closed) {
    return (
      <div className="flex items-center gap-2 text-kr-muted">
        <span className="w-2.5 h-2.5 rounded-full bg-kr-muted/40" />
        <span className="font-caps text-[11px] font-semibold tracking-[0.15em] uppercase">
          Booking Closed
        </span>
      </div>
    );
  }

  if (booking.capacity && booking.spotsRemaining === 0) {
    return (
      <div className="flex items-center gap-2 text-kr-coral">
        <span className="w-2.5 h-2.5 rounded-full bg-kr-coral" />
        <span className="font-caps text-[11px] font-semibold tracking-[0.15em] uppercase">
          Fully Booked
        </span>
      </div>
    );
  }

  if (booking.capacity == null || booking.spotsRemaining == null) {
    return (
      <div className="flex items-center gap-2 text-kr-teal">
        <span className="w-2.5 h-2.5 rounded-full bg-kr-teal" />
        <span className="font-caps text-[11px] font-semibold tracking-[0.15em] uppercase">
          Booking Open
        </span>
      </div>
    );
  }

  const filled = booking.capacity - booking.spotsRemaining;
  const pct = Math.min((filled / booking.capacity) * 100, 100);

  const showSpotCount = booking.spotsRemaining < booking.capacity;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-kr-teal">
          <span className="w-2.5 h-2.5 rounded-full bg-kr-teal" />
          <span className="font-caps text-[11px] font-semibold tracking-[0.15em] uppercase">
            Booking Open
          </span>
        </div>
        {showSpotCount && (
          <span className="text-[13px] text-kr-muted font-body">
            {booking.spotsRemaining} of {booking.capacity} spots remaining
          </span>
        )}
      </div>
      <div className="h-1.5 bg-kr-navy/[0.08] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-kr-teal rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
