import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
    }

    // Enquiry received. Wire this to your email provider (Resend, Postmark,
    // Nodemailer) or a database to deliver it. For now it is logged server-side.
    console.log("[contact] new enquiry", { name, email, subject: body.subject ?? "", message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
}
