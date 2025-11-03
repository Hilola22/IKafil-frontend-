import { useState } from "react";

type CheckoutItem = {
  id?: number;
  name?: string;
  price?: number;
  color?: string;
  storage?: string;
  device?: {
    id: number;
    name: string;
    base_price: string;
    details?: { color?: string; storage?: string };
  };
};

export default function CheckoutButton({
  items,
  total,
  locale,
  user,
}: {
  items: CheckoutItem[];
  total: number;
  locale: string;
  user?: { full_name?: string; phone?: string; email?: string } | null;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; message: string }>(
    null
  );

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setResult(null);
      const res = await fetch("/api/telegram/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total, locale, user }),
      });
      const ct = res.headers.get("content-type") || "";
      let data: any = null;
      try {
        data = ct.includes("application/json")
          ? await res.json()
          : await res.text();
      } catch (_) {
        // ignore JSON parse errors, handle below
      }
      if (!res.ok || (typeof data === "object" && data && data.ok === false)) {
        const msg =
          typeof data === "string"
            ? data
            : data?.error || `Failed to send order (${res.status})`;
        setResult({ ok: false, message: msg });
      } else {
        setResult({
          ok: true,
          message: "Your order has been sent to the admin via Telegram.",
        });
      }
    } catch (e: any) {
      setResult({ ok: false, message: e?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? "Sending…" : "Checkout"}
      </button>

      {result && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <h2
              className={`text-2xl font-bold mb-4 ${
                result.ok ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.ok ? "Success" : "Failed"}
            </h2>
            <p className="text-gray-700 mb-6">{result.message}</p>
            <button
              onClick={() => setResult(null)}
              className="mt-2 text-gray-600 hover:text-gray-800 underline text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
