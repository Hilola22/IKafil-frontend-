"use client";

import { useState } from "react";
import { api } from "@/api"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim()) {
      setMessage("⚠️ Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/forgot-password", { email });
      setMessage(res.data.message || "✅ Check your email for the reset link.");
    } catch (error: any) {
      const msg = error.response?.data?.message || "❌ Error occurred.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 border rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Forgot Password
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && (
          <p
            className={`text-center mb-4 ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
