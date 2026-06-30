import { NextResponse } from "next/server";
import { getRoom } from "@/lib/rooms";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roomSlug, checkIn, checkOut, guests, name, email, phone, notes } = body ?? {};

    const room = getRoom(String(roomSlug));
    if (!room) {
      return NextResponse.json({ ok: false, error: "Unknown room." }, { status: 400 });
    }
    if (!checkIn || !checkOut) {
      return NextResponse.json({ ok: false, error: "Please choose your dates." }, { status: 400 });
    }
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const nights = Math.round((outDate.getTime() - inDate.getTime()) / 86_400_000);
    if (!(nights > 0)) {
      return NextResponse.json({ ok: false, error: "Check-out must be after check-in." }, { status: 400 });
    }
    if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) {
      return NextResponse.json({ ok: false, error: "Please provide valid contact details." }, { status: 400 });
    }

    const total = nights * room.rate;
    const reference = "GB-" + Math.abs(hash(`${roomSlug}${checkIn}${email}`)).toString(36).toUpperCase().slice(0, 6);

    // Request received. Connect this to your booking system / channel manager /
    // email provider to confirm availability and take payment. Logged for now.
    console.log("[booking] new request", {
      reference, room: room.name, checkIn, checkOut, nights, guests, total, name, email, phone, notes,
    });

    return NextResponse.json({
      ok: true,
      reference,
      summary: { room: room.name, nights, rate: room.rate, total },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}
