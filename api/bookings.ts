import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { createClerkClient } from "@clerk/backend";
import { verifyJwt } from "@clerk/backend/jwt";

const sql = neon(process.env.DATABASE_URL!);
const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

const KNOWN_FIELDS = new Set([
  "fullName",
  "email",
  "phone",
  "numberOfAttendees",
  "dietaryRequirements",
  "notes",
]);

async function verifyAuth(req: VercelRequest): Promise<boolean> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return false;
  try {
    await verifyJwt(authHeader.slice(7), {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      if (!(await verifyAuth(req))) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const eventId = req.query.eventId;
      if (typeof eventId !== "string") {
        return res.status(400).json({ error: "eventId required" });
      }
      const rows = await sql`
        SELECT * FROM bookings
        WHERE event_id = ${eventId}
        ORDER BY created_at DESC
      `;
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const body = req.body ?? {};
      const eventId = typeof body.eventId === "string" ? body.eventId : null;
      if (!eventId) {
        return res.status(400).json({ error: "eventId required" });
      }

      const fullName = (body.fullName ?? "").trim();
      const email = (body.email ?? "").trim();
      if (!fullName || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const attendees = Number.parseInt(body.numberOfAttendees, 10);
      const numberOfAttendees = Number.isFinite(attendees) && attendees > 0 ? attendees : 1;

      const customFields: Record<string, string> = {};
      for (const [key, value] of Object.entries(body)) {
        if (key === "eventId" || key.startsWith("_")) continue;
        if (KNOWN_FIELDS.has(key)) continue;
        if (typeof value === "string" && value.trim()) customFields[key] = value;
      }

      const eventRows = await sql`
        SELECT booking FROM events WHERE id = ${eventId}
      `;
      if (eventRows.length === 0) {
        return res.status(404).json({ error: "Event not found" });
      }
      const booking = eventRows[0].booking as
        | { closed?: boolean; capacity?: number; spotsRemaining?: number }
        | null;
      if (!booking) {
        return res.status(400).json({ error: "Booking not enabled for this event" });
      }
      if (booking.closed) {
        return res.status(400).json({ error: "Booking is closed" });
      }
      if (
        typeof booking.spotsRemaining === "number" &&
        booking.spotsRemaining < numberOfAttendees
      ) {
        return res.status(400).json({ error: "Not enough spots remaining" });
      }

      const inserted = await sql`
        INSERT INTO bookings (
          event_id, full_name, email, phone,
          number_of_attendees, dietary_requirements, notes, custom_fields
        ) VALUES (
          ${eventId}, ${fullName}, ${email}, ${body.phone || null},
          ${numberOfAttendees}, ${body.dietaryRequirements || null},
          ${body.notes || null},
          ${Object.keys(customFields).length ? JSON.stringify(customFields) : null}::jsonb
        )
        RETURNING id
      `;

      if (typeof booking.spotsRemaining === "number") {
        await sql`
          UPDATE events
          SET booking = jsonb_set(
            booking,
            '{spotsRemaining}',
            to_jsonb(GREATEST((booking->>'spotsRemaining')::int - ${numberOfAttendees}, 0))
          ),
          updated_at = now()
          WHERE id = ${eventId}
        `;
      }

      return res.status(201).json({ id: inserted[0].id });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
