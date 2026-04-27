import { useState, useEffect, useCallback } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import type { KolRinaEvent, EventType } from "../data/events";
import { KOL_RINA_BANK_DETAILS } from "../data/payments";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  fetchBookings,
  type Booking,
} from "../lib/api";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const EVENT_TYPES: { value: EventType; label: string }[] = [
  { value: "shabbat", label: "Shabbat" },
  { value: "chag", label: "Chag" },
  { value: "special", label: "Special Event" },
  { value: "social", label: "Social" },
  { value: "learning", label: "Learning" },
];

const DEFAULT_BOOKING_FIELDS = [
  { name: "fullName", label: "Full Name", type: "text" as const, required: true, placeholder: "Your full name" },
  { name: "email", label: "Email Address", type: "email" as const, required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone Number", type: "tel" as const, placeholder: "07XXX XXXXXX" },
  { name: "numberOfAttendees", label: "Number of Attendees (including yourself)", type: "number" as const, required: true, placeholder: "1" },
  { name: "dietaryRequirements", label: "Dietary Requirements", type: "textarea" as const, placeholder: "Any allergies or dietary needs" },
  { name: "notes", label: "Additional Notes", type: "textarea" as const, placeholder: "Anything else we should know" },
];

function AdminDashboard() {
  const { getToken } = useAuth();
  const [events, setEvents] = useState<KolRinaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<KolRinaEvent | null>(null);
  const [creating, setCreating] = useState(false);
  const [viewingBookingsFor, setViewingBookingsFor] = useState<KolRinaEvent | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleSave = async (eventData: Partial<KolRinaEvent>) => {
    setSaving(true);
    setError("");
    try {
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");

      if (editing) {
        await updateEvent(editing.id, eventData, token);
      } else {
        await createEvent(eventData, token);
      }
      setEditing(null);
      setCreating(false);
      await loadEvents();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    setError("");
    try {
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");
      await deleteEvent(id, token);
      await loadEvents();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (viewingBookingsFor) {
    return (
      <BookingsList
        event={viewingBookingsFor}
        getToken={getToken}
        onBack={() => setViewingBookingsFor(null)}
      />
    );
  }

  if (creating || editing) {
    return (
      <EventForm
        initial={editing || undefined}
        saving={saving}
        onSave={handleSave}
        onCancel={() => {
          setCreating(false);
          setEditing(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-2xl font-semibold text-kr-navy">
          Events
        </h2>
        <button
          onClick={() => setCreating(true)}
          className="px-5 py-2.5 bg-kr-navy text-white font-caps text-[10px] font-semibold tracking-[0.15em] uppercase rounded-lg hover:bg-kr-navy-deep transition-colors cursor-pointer"
        >
          + New Event
        </button>
      </div>

      {error ? (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-body">
          {error}
        </div>
      ) : null}

      {loading ? (
        <p className="text-kr-muted font-body">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-kr-muted font-body">No events yet.</p>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-xl p-5 border border-kr-navy/[0.08] flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-caps text-[9px] font-semibold tracking-[0.15em] uppercase text-kr-muted">
                    {ev.type}
                  </span>
                  <span className="text-kr-muted/40">&middot;</span>
                  <span className="text-[13px] text-kr-muted font-body italic">
                    {ev.date}
                  </span>
                  {ev.booking ? (
                    <>
                      <span className="text-kr-muted/40">&middot;</span>
                      <span
                        className={`font-caps text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full ${
                          ev.booking.closed
                            ? "text-kr-muted bg-kr-muted/10"
                            : "text-kr-teal bg-kr-teal/10"
                        }`}
                      >
                        {ev.booking.closed ? "Closed" : "Booking Open"}
                      </span>
                    </>
                  ) : null}
                </div>
                <h3 className="font-heading text-lg font-semibold text-kr-navy truncate">
                  {ev.title}
                </h3>
                <p className="text-sm text-kr-muted font-body truncate">
                  {ev.summary}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {ev.booking ? (
                  <button
                    onClick={() => setViewingBookingsFor(ev)}
                    className="px-3 py-1.5 text-kr-teal bg-kr-teal/[0.1] font-caps text-[9px] font-semibold tracking-[0.1em] uppercase rounded-lg hover:bg-kr-teal/[0.2] transition-colors cursor-pointer"
                  >
                    Bookings
                  </button>
                ) : null}
                <button
                  onClick={() => setEditing(ev)}
                  className="px-3 py-1.5 text-kr-navy bg-kr-navy/[0.06] font-caps text-[9px] font-semibold tracking-[0.1em] uppercase rounded-lg hover:bg-kr-navy/[0.12] transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ev.id)}
                  className="px-3 py-1.5 text-kr-coral bg-kr-coral/[0.08] font-caps text-[9px] font-semibold tracking-[0.1em] uppercase rounded-lg hover:bg-kr-coral/[0.16] transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventForm({
  initial,
  saving,
  onSave,
  onCancel,
}: {
  initial?: KolRinaEvent;
  saving: boolean;
  onSave: (data: Partial<KolRinaEvent>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [date, setDate] = useState(initial?.date || "");
  const [endDate, setEndDate] = useState(initial?.endDate || "");
  const [time, setTime] = useState(initial?.time || "");
  const [location, setLocation] = useState(initial?.location || "");
  const [type, setType] = useState<EventType>(initial?.type || "special");
  const [summary, setSummary] = useState(initial?.summary || "");
  const [description, setDescription] = useState(
    initial?.description?.join("\n\n") || "",
  );

  // Booking
  const [enableBooking, setEnableBooking] = useState(!!initial?.booking);
  const [capacity, setCapacity] = useState(
    initial?.booking?.capacity?.toString() || "",
  );
  const [spotsRemaining, setSpotsRemaining] = useState(
    initial?.booking?.spotsRemaining?.toString() || "",
  );
  const [bookingClosed, setBookingClosed] = useState(
    initial?.booking?.closed || false,
  );

  // Payment
  const [enablePayment, setEnablePayment] = useState(!!initial?.payment);
  const [amount, setAmount] = useState(initial?.payment?.amount || "");
  const [reference, setReference] = useState(
    initial?.payment?.reference || KOL_RINA_BANK_DETAILS.reference,
  );
  const [paymentNotes, setPaymentNotes] = useState(
    initial?.payment?.notes || "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Partial<KolRinaEvent> = {
      title,
      date,
      endDate: endDate || undefined,
      time: time || undefined,
      location: location || undefined,
      type,
      summary,
      description: description
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    if (enableBooking) {
      data.booking = {
        capacity: capacity ? parseInt(capacity) : undefined,
        spotsRemaining: spotsRemaining ? parseInt(spotsRemaining) : undefined,
        closed: bookingClosed,
        fields: initial?.booking?.fields || DEFAULT_BOOKING_FIELDS,
      };
    }

    if (enablePayment) {
      data.payment = {
        amount: amount || undefined,
        reference: reference || undefined,
        notes: paymentNotes || undefined,
      };
    }

    onSave(data);
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-kr-navy/[0.12] bg-white text-[14px] font-body text-kr-text placeholder:text-kr-muted/40 focus:outline-none focus:border-kr-navy/30 focus:ring-2 focus:ring-kr-navy/[0.06] transition-all";
  const labelClass =
    "font-caps text-[9px] font-semibold tracking-[0.15em] uppercase text-kr-navy block mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl font-semibold text-kr-navy">
          {initial ? "Edit Event" : "New Event"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="font-caps text-[10px] font-semibold tracking-[0.1em] uppercase text-kr-muted hover:text-kr-navy transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {/* Basic info */}
      <fieldset className="space-y-4 bg-white rounded-xl p-5 border border-kr-navy/[0.08]">
        <legend className="font-caps text-[10px] font-bold tracking-[0.2em] uppercase text-kr-navy px-2">
          Event Details
        </legend>

        <div>
          <label className={labelClass}>Title *</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Shabbat Shacharit Service"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Date *</label>
            <input
              className={inputClass}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              placeholder="e.g. 18 April 2026"
            />
          </div>
          <div>
            <label className={labelClass}>End Date</label>
            <input
              className={inputClass}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="For multi-day events"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Time</label>
            <input
              className={inputClass}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 9:15 AM"
            />
          </div>
          <div>
            <label className={labelClass}>Type *</label>
            <select
              className={inputClass}
              value={type}
              onChange={(e) => setType(e.target.value as EventType)}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input
            className={inputClass}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Venue, Golders Green"
          />
        </div>

        <div>
          <label className={labelClass}>Summary (shown on listing) *</label>
          <textarea
            className={inputClass}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            rows={2}
            style={{ resize: "vertical" }}
          />
        </div>

        <div>
          <label className={labelClass}>
            Full Description (separate paragraphs with blank lines)
          </label>
          <textarea
            className={inputClass}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{ resize: "vertical" }}
          />
        </div>
      </fieldset>

      {/* Booking */}
      <fieldset className="space-y-4 bg-white rounded-xl p-5 border border-kr-navy/[0.08]">
        <legend className="font-caps text-[10px] font-bold tracking-[0.2em] uppercase text-kr-navy px-2">
          Booking
        </legend>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={enableBooking}
            onChange={(e) => setEnableBooking(e.target.checked)}
            className="w-4 h-4 rounded border-kr-navy/20 accent-kr-navy"
          />
          <span className="text-[14px] font-body text-kr-text">
            Enable booking for this event
          </span>
        </label>

        {enableBooking ? (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Capacity</label>
                <input
                  className={inputClass}
                  type="number"
                  min="1"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="Leave blank for unlimited"
                />
              </div>
              <div>
                <label className={labelClass}>Spots Remaining</label>
                <input
                  className={inputClass}
                  type="number"
                  min="0"
                  value={spotsRemaining}
                  onChange={(e) => setSpotsRemaining(e.target.value)}
                  placeholder="Leave blank to hide"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bookingClosed}
                onChange={(e) => setBookingClosed(e.target.checked)}
                className="w-4 h-4 rounded border-kr-navy/20 accent-kr-navy"
              />
              <span className="text-[14px] font-body text-kr-text">
                Booking closed
              </span>
            </label>
          </div>
        ) : null}
      </fieldset>

      {/* Payment */}
      <fieldset className="space-y-4 bg-white rounded-xl p-5 border border-kr-navy/[0.08]">
        <legend className="font-caps text-[10px] font-bold tracking-[0.2em] uppercase text-kr-navy px-2">
          Payment
        </legend>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={enablePayment}
            onChange={(e) => setEnablePayment(e.target.checked)}
            className="w-4 h-4 rounded border-kr-navy/20 accent-kr-navy"
          />
          <span className="text-[14px] font-body text-kr-text">
            Show bank transfer details
          </span>
        </label>

        {enablePayment ? (
          <div className="space-y-4 pt-2">
            <div className="p-3 bg-kr-navy/[0.03] rounded-lg border border-kr-navy/[0.06]">
              <p className="text-[12px] text-kr-muted font-body">
                <strong>Bank details:</strong> {KOL_RINA_BANK_DETAILS.accountName} • {KOL_RINA_BANK_DETAILS.sortCode} • {KOL_RINA_BANK_DETAILS.accountNumber}
              </p>
            </div>
            <div>
              <label className={labelClass}>Amount</label>
              <input
                className={inputClass}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. £18 per person / £45 per family"
              />
            </div>
            <div>
              <label className={labelClass}>Payment Reference Format</label>
              <input
                className={inputClass}
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. SHAVUOT26-[SURNAME]"
              />
            </div>
            <div>
              <label className={labelClass}>Payment Notes</label>
              <textarea
                className={inputClass}
                value={paymentNotes}
                onChange={(e) => setPaymentNotes(e.target.value)}
                rows={2}
                style={{ resize: "vertical" }}
                placeholder="e.g. Please pay within 7 days"
              />
            </div>
          </div>
        ) : null}
      </fieldset>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-3 bg-kr-navy text-white font-caps text-[10px] font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-kr-navy-deep transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : initial ? "Update Event" : "Create Event"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-kr-navy/[0.06] text-kr-navy font-caps text-[10px] font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-kr-navy/[0.12] transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function BookingsList({
  event,
  getToken,
  onBack,
}: {
  event: KolRinaEvent;
  getToken: () => Promise<string | null>;
  onBack: () => void;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("Not authenticated");
        const data = await fetchBookings(event.id, token);
        setBookings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [event.id, getToken]);

  const totalAttendees = bookings.reduce(
    (sum, b) => sum + b.number_of_attendees,
    0,
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="font-caps text-[10px] font-semibold tracking-[0.15em] uppercase text-kr-muted hover:text-kr-navy transition-colors cursor-pointer mb-2"
          >
            ← Back to events
          </button>
          <h2 className="font-heading text-2xl font-semibold text-kr-navy">
            Bookings — {event.title}
          </h2>
          {!loading ? (
            <p className="text-[13px] text-kr-muted font-body mt-1">
              {bookings.length} booking{bookings.length === 1 ? "" : "s"} · {totalAttendees} attendee{totalAttendees === 1 ? "" : "s"}
              {event.booking?.capacity ? ` · ${event.booking.capacity} capacity` : ""}
            </p>
          ) : null}
        </div>
      </div>

      {error ? (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-body">
          {error}
        </div>
      ) : null}

      {loading ? (
        <p className="text-kr-muted font-body">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-kr-muted font-body">No bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl p-5 border border-kr-navy/[0.08]"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-heading text-base font-semibold text-kr-navy">
                    {b.full_name}
                  </h3>
                  <a
                    href={`mailto:${b.email}`}
                    className="text-[13px] text-kr-teal font-body hover:underline"
                  >
                    {b.email}
                  </a>
                  {b.phone ? (
                    <span className="text-[13px] text-kr-muted font-body ml-3">
                      {b.phone}
                    </span>
                  ) : null}
                </div>
                <div className="text-right">
                  <div className="font-caps text-[9px] font-semibold tracking-[0.15em] uppercase text-kr-muted">
                    {b.number_of_attendees} attendee{b.number_of_attendees === 1 ? "" : "s"}
                  </div>
                  <div className="text-[11px] text-kr-muted/70 font-body italic mt-0.5">
                    {new Date(b.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              {b.dietary_requirements ? (
                <p className="text-[13px] text-kr-text font-body mt-2">
                  <span className="font-semibold">Dietary:</span> {b.dietary_requirements}
                </p>
              ) : null}
              {b.notes ? (
                <p className="text-[13px] text-kr-text font-body mt-1">
                  <span className="font-semibold">Notes:</span> {b.notes}
                </p>
              ) : null}
              {b.custom_fields
                ? Object.entries(b.custom_fields).map(([k, v]) => (
                    <p key={k} className="text-[13px] text-kr-text font-body mt-1">
                      <span className="font-semibold">{k}:</span> {v}
                    </p>
                  ))
                : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdminPage() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div className="min-h-screen bg-kr-parchment">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="font-script text-2xl text-kr-navy">
                Kol Rina
              </span>
              <span className="font-caps text-[10px] font-semibold tracking-[0.2em] uppercase text-kr-muted ml-3">
                Admin
              </span>
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          <SignedOut>
            <div className="text-center py-20">
              <h1 className="font-heading text-3xl font-semibold text-kr-navy mb-4">
                Admin Login
              </h1>
              <p className="text-kr-muted font-body mb-8">
                Sign in to manage events and bookings.
              </p>
              <SignInButton mode="modal">
                <button className="px-8 py-3 bg-kr-navy text-white font-caps text-[11px] font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-kr-navy-deep transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <AdminDashboard />
          </SignedIn>
        </div>
      </div>
    </ClerkProvider>
  );
}
