"use client";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    new_password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.ikafil.uz/api/auth/reset-password",
        form
      );
      setMessage(res.data.message || "Password successfully reset!");
      setForm({ email: "", new_password: "", confirm_password: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={form.new_password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
                  
          <input
            type="password"
            name="confirm_password"
            placeholder="Cofirm Password"
            value={form.confirm_password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p className="text-green-600 text-center mt-4">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
