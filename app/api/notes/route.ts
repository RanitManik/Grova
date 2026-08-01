import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { toDateString } from "@/lib/utils";

const noteSchema = z.object({
  content: z.string().max(2000),
  date: z.string().optional(),
});

// GET /api/notes?date=YYYY-MM-DD
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date") ?? toDateString();
  const date = new Date(dateStr);

  const note = await db.quickNote.findUnique({
    where: { userId_date: { userId: session.user.id, date } },
  });

  return NextResponse.json(note ?? { content: "" });
}

// POST /api/notes — upsert note for a date
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = noteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const dateStr = parsed.data.date ?? toDateString();
  const date = new Date(dateStr);

  const note = await db.quickNote.upsert({
    where: { userId_date: { userId: session.user.id, date } },
    create: {
      userId: session.user.id,
      date,
      content: parsed.data.content,
    },
    update: { content: parsed.data.content },
  });

  return NextResponse.json(note);
}
