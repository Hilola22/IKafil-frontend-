"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);

  const validateInputs = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("http://3.76.183.255:3030/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(`Login failed: ${errorData.message}`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      login(data.user, data.token);
      setSuccess("Successfully signed in!");
      setLoading(false);

      setTimeout(() => router.push("/profile"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong during login.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        <form onSubmit={handleSignIn} noValidate>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.trim()) setEmailError("");
              }}
              onBlur={() => {
                if (!email.trim()) setEmailError("Email is required");
              }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                emailError
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim()) setPasswordError("");
              }}
              onBlur={() => {
                if (!password.trim()) setPasswordError("Password is required");
              }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                passwordError
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {success && <p className="text-green-600 mb-4 text-sm">{success}</p>}
          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white transition-colors ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm sm:text-base">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="mt-2 text-center text-gray-500 text-sm sm:text-base">
          <Link href="/" className="hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
