"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params?.token as string;
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      setValidToken(false);
      return;
    }
    const check = async () => {
      try {
        const res = await axios.post(
          "https://api.ikafil.uz/api/auth/verify-reset-token",
          { token }
        );
        setValidToken(res.data?.valid === true);
      } catch (err) {
        setValidToken(false);
      } finally {
        setChecking(false);
      }
    };
    check();
  }, [token]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) return toast.error("Fill all fields");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.ikafil.uz/api/auth/reset-password",
        { token, password, confirmPassword }
      );
      if (res.data?.success) {
        toast.success(res.data.message || "Password changed");
        setTimeout(() => router.push("/auth/signin"), 2000);
      } else {
        toast.error(res.data?.message || "Invalid or expired token");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  if (checking)
    return <div className="mt-20 text-center">Checking token...</div>;
  if (!validToken)
    return (
      <div className="mt-20 text-center text-red-600">
        Invalid or expired token
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-24 p-6">
      <h1 className="text-xl mb-4">Reset password</h1>
      <form onSubmit={handleReset}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="New password"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm password"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
