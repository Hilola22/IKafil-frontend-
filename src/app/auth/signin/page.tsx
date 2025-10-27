"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const SignIn = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else setEmailError("");

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else setPasswordError("");

    return valid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await login(email, password);
      setSuccess("Successfully signed in!");
      setLoading(false);
      setTimeout(() => router.push("/profile"), 1000);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong. Please try again.");
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

          <div className="mb-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim()) setPasswordError("");
              }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                passwordError
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div className="text-right mb-4">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {success && <p className="text-green-600 mb-4 text-sm">{success}</p>}
          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

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
        </form>

        <p className="mt-4 text-center text-sm sm:text-base">
          Don't have an account?{" "}
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
