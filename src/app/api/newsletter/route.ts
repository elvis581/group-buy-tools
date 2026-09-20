import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    return NextResponse.json(
      {
        message:
          "Newsletter signup is not configured yet. Please check back soon.",
      },
      { status: 503 },
    );
  }
  try {
    const response = await fetch(
      `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: parsed.data.email, unsubscribed: false }),
      },
    );
    if (!response.ok)
      return NextResponse.json(
        { message: "We could not complete signup right now." },
        { status: 502 },
      );
    return NextResponse.json({ message: "You are on the list." });
  } catch {
    return NextResponse.json(
      { message: "We could not complete signup right now." },
      { status: 502 },
    );
  }
}
