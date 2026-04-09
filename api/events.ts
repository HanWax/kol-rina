import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { createClerkClient } from "@clerk/backend";

const sql = neon(process.env.DATABASE_URL!);
const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

async function verifyAuth(req: VercelRequest): Promise<boolean> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return false;
  try {
    const token = authHeader.slice(7);
    await clerk.verifyToken(token);
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const rows = await sql`SELECT * FROM events ORDER BY created_at ASC`;
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      if (!(await verifyAuth(req))) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const e = req.body;
      const id =
        e.id ||
        e.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      await sql`
        INSERT INTO events (id, title, date, end_date, time, location, type, summary, description, schedule, booking, payment)
        VALUES (${id}, ${e.title}, ${e.date}, ${e.endDate || null}, ${e.time || null}, ${e.location || null}, ${e.type}, ${e.summary}, ${e.description || [e.summary]}, ${e.schedule ? JSON.stringify(e.schedule) : null}::jsonb, ${e.booking ? JSON.stringify(e.booking) : null}::jsonb, ${e.payment ? JSON.stringify(e.payment) : null}::jsonb)
      `;

      return res.status(201).json({ id });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
