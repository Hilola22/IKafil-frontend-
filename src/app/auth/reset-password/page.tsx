"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/api"; 
import toast from "react-hot-toast";

export default function ResetPassword() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmNewPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(`/reset-password/${token}`, {
        newPassword,
        confirmNewPassword,
      });

      toast.success(res.data.message || "Password reset successfully!");
      setTimeout(() => router.push("/signin"), 2000);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error resetting password.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 border rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Reset Your Password
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="password"
            placeholder="New password"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm new password"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
