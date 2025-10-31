"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", { email });

      toast.success(
        res.data?.message || "Check your email for the reset link!"
      );
      setEmail("");

      setTimeout(() => router.push("/auth/reset-password"), 2000);
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white border rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Forgot Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email address"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Sending link..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4 text-center">
        We'll send a password reset link to your email if it exists in our
        system.
      </p>
    </div>
  );
}
