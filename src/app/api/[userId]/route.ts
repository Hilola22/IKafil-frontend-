import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;
    if (!userId) {
      return NextResponse.json({ ok: false, error: "Missing userId" }, { status: 400 });
    }

    const auth = req.headers.get("authorization");

    const upstreamUrl = `http://3.76.183.255:3030/api/payment-schedule/buyer/${encodeURIComponent(userId)}`;

    const res = await fetch(upstreamUrl, {
      headers: {
        ...(auth ? { Authorization: auth } : {}),
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const contentType = res.headers.get("content-type") ?? "";

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json({ ok: false, error: text || `Upstream error ${res.status}` }, { status: res.status });
    }

    if (contentType.includes("application/json")) {
      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
    }

    const text = await res.text();
    return NextResponse.json({ ok: true, data: text }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
