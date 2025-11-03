import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "7835723357:AAE6B5HGpmIj-rE4X5Vb7WvxB5NGpJUB6GI";
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "6381463618";

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json(
        { ok: false, error: "Missing Telegram credentials" },
        { status: 500 }
      );
    }

    const items = Array.isArray(body?.items) ? body.items : [];
    const total = typeof body?.total === "number" ? body.total : 0;
    const user = body?.user || {};
    const locale = body?.locale || "";

    const lines: string[] = [];
    lines.push("🛒 New Checkout");
    if (user?.full_name || user?.phone) {
      lines.push(`👤 ${user.full_name || ""}`.trim());
      if (user.phone) lines.push(`📞 ${user.phone}`);
      if (user.email) lines.push(`✉️ ${user.email}`);
      lines.push("— — —");
    }

    if (items.length === 0) {
      lines.push("(No items provided)");
    } else {
      items.forEach((it: any, idx: number) => {
        const name = it?.name || it?.device?.name || `Item #${idx + 1}`;
        const price = Number(it?.price ?? it?.device?.base_price ?? 0);
        const color = it?.color ?? it?.device?.details?.color;
        const storage = it?.storage ?? it?.device?.details?.storage;
        lines.push(`• ${name}${color ? `, ${color}` : ""}${storage ? `, ${storage}` : ""} — ${price.toLocaleString()} so'm`);
      });
    }

    lines.push("— — —");
    lines.push(`Total: ${Number(total).toLocaleString()} so'm`);
    if (locale) lines.push(`Locale: ${locale}`);

    const text = lines.join("\n");

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    if (!tgRes.ok) {
      const err = await tgRes.text();
      return NextResponse.json({ ok: false, error: err }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
