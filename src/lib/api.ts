import type { KolRinaEvent } from "../data/events";

const API_BASE = import.meta.env.PROD ? "/api" : "/api";

function mapRow(row: any): KolRinaEvent {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    endDate: row.end_date || undefined,
    time: row.time || undefined,
    location: row.location || undefined,
    type: row.type,
    summary: row.summary,
    description: row.description || [row.summary],
    schedule: row.schedule || undefined,
    booking: row.booking || undefined,
    payment: row.payment || undefined,
  };
}

export async function fetchEvents(): Promise<KolRinaEvent[]> {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  const rows = await res.json();
  return rows.map(mapRow);
}

export async function fetchEvent(id: string): Promise<KolRinaEvent | null> {
  const res = await fetch(`${API_BASE}/events/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch event");
  return mapRow(await res.json());
}

export async function createEvent(
  event: Partial<KolRinaEvent>,
  token: string,
): Promise<{ id: string }> {
  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to create event");
  }
  return res.json();
}

export async function updateEvent(
  id: string,
  event: Partial<KolRinaEvent>,
  token: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to update event");
  }
}

export async function deleteEvent(
  id: string,
  token: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to delete event");
  }
}

export interface Booking {
  id: string;
  event_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  number_of_attendees: number;
  dietary_requirements: string | null;
  notes: string | null;
  custom_fields: Record<string, string> | null;
  created_at: string;
}

export async function fetchBookings(
  eventId: string,
  token: string,
): Promise<Booking[]> {
  const res = await fetch(
    `${API_BASE}/bookings?eventId=${encodeURIComponent(eventId)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to fetch bookings");
  }
  return res.json();
}
