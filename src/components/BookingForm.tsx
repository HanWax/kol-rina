import { useState } from "react";
import { motion } from "motion/react";
import type { EventBookingConfig } from "../data/events";

type FormState = "idle" | "submitting" | "success" | "error";

export function BookingForm({
  booking,
  eventTitle,
  onSuccess,
}: {
  booking: EventBookingConfig;
  eventTitle: string;
  onSuccess?: () => void;
}) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (booking.closed) {
    return (
      <div className="text-center py-10">
        <p className="font-caps text-[12px] font-semibold tracking-[0.15em] uppercase text-kr-muted">
          Booking for this event has closed
        </p>
      </div>
    );
  }

  if (booking.capacity && booking.spotsRemaining === 0) {
    return (
      <div className="text-center py-10">
        <p className="font-caps text-[12px] font-semibold tracking-[0.15em] uppercase text-kr-coral">
          This event is fully booked
        </p>
      </div>
    );
  }

  const handleChange = (
    name: string,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    try {
      const payload = { ...formData, _eventTitle: eventTitle };

      if (
        booking.googleAppsScriptUrl &&
        booking.googleAppsScriptUrl !== "PLACEHOLDER_URL"
      ) {
        const res = await fetch(booking.googleAppsScriptUrl, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "text/plain" },
          mode: "no-cors",
        });

        // Google Apps Script with no-cors returns opaque response
        // We treat it as success if no error was thrown
        if (res.type !== "opaque" && !res.ok) {
          throw new Error("Submission failed");
        }
      }

      setState("success");
      onSuccess?.();
    } catch {
      setState("error");
      setErrorMessage(
        "Something went wrong. Please try again or email us directly.",
      );
    }
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10 px-6"
      >
        <div className="w-16 h-16 rounded-full bg-kr-teal/10 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-kr-teal"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-semibold text-kr-navy mb-2">
          Booking Confirmed
        </h3>
        <p className="text-kr-muted font-body text-[15px] leading-relaxed max-w-md mx-auto">
          Thank you for booking! Please see the payment details below to
          complete your registration.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {booking.fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="font-caps text-[10px] font-semibold tracking-[0.15em] uppercase text-kr-navy block mb-1.5"
          >
            {field.label}
            {field.required && (
              <span className="text-kr-coral ml-1">*</span>
            )}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              rows={3}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-kr-navy/[0.1] bg-kr-cream/50 text-[15px] font-body text-kr-text placeholder:text-kr-muted/40 focus:outline-none focus:border-kr-navy/30 focus:ring-2 focus:ring-kr-navy/[0.06] transition-all resize-none"
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-kr-navy/[0.1] bg-kr-cream/50 text-[15px] font-body text-kr-text focus:outline-none focus:border-kr-navy/30 focus:ring-2 focus:ring-kr-navy/[0.06] transition-all"
            >
              <option value="">Select an option...</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              min={field.type === "number" ? "1" : undefined}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-kr-navy/[0.1] bg-kr-cream/50 text-[15px] font-body text-kr-text placeholder:text-kr-muted/40 focus:outline-none focus:border-kr-navy/30 focus:ring-2 focus:ring-kr-navy/[0.06] transition-all"
            />
          )}
        </div>
      ))}

      {state === "error" && (
        <p className="text-kr-coral text-[14px] font-body">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-3.5 bg-kr-navy text-white font-caps text-[11px] font-semibold tracking-[0.2em] uppercase rounded-xl hover:bg-kr-navy-deep transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {state === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="opacity-75"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          "Submit Booking"
        )}
      </button>
    </form>
  );
}
