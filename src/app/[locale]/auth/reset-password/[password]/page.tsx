"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params?.token as string;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post(
        "https://api.ikafil.uz/api/auth/reset-password",
        {
          token,
          password,
          confirmPassword,
        }
      );

      if (res.status === 201 || res.statusText === "Created") {
        setMessage(res.data.message || "Password successfully changed!");
        setMessageType("success");
        setTimeout(() => router.push("/auth/signin"), 2000);
      } else {
        setMessage(res.data?.message || "Invalid or expired token");
        setMessageType("error");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Server error");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Reset your password
        </h1>

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleReset} className="space-y-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showConfirmPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
