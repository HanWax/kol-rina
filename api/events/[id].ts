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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    if (req.method === "GET") {
      const rows = await sql`SELECT * FROM events WHERE id = ${id}`;
      if (rows.length === 0) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(rows[0]);
    }

    if (req.method === "PUT") {
      if (!(await verifyAuth(req))) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const e = req.body;
      await sql`
        UPDATE events SET
          title = ${e.title},
          date = ${e.date},
          end_date = ${e.endDate || null},
          time = ${e.time || null},
          location = ${e.location || null},
          type = ${e.type},
          summary = ${e.summary},
          description = ${e.description || [e.summary]},
          schedule = ${e.schedule ? JSON.stringify(e.schedule) : null}::jsonb,
          booking = ${e.booking ? JSON.stringify(e.booking) : null}::jsonb,
          payment = ${e.payment ? JSON.stringify(e.payment) : null}::jsonb,
          updated_at = now()
        WHERE id = ${id}
      `;

      return res.status(200).json({ id });
    }

    if (req.method === "DELETE") {
      if (!(await verifyAuth(req))) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await sql`DELETE FROM events WHERE id = ${id}`;
      return res.status(200).json({ deleted: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
