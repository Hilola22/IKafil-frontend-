"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { api } from "../../../../api";

const SignUp = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
    region_id: "",
  });

  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await api.get("/regions");
        const data = res.data;
        console.log(data);

        if (Array.isArray(data)) {
          setRegions(data);
        } else if (Array.isArray(data.data)) {
          setRegions(data.data);
        } else {
          setRegions([]);
        }
      } catch (err) {
        console.error("Failed to load regions:", err);
      }
    };
    fetchRegions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(`/${locale}/auth/register`, form);
      const data = res.data;

      if (data && data.user && data.token) {
        login(data.user, data.token);
        setSuccess("Successfully signed up!");
        setTimeout(() => `${router}.${<Link href = {`/${locale}/auth/signin`}> Sign in</Link>}`, 1200);
      } else {
        setError("Unexpected server response.");
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.errors?.[0] ||
        "Something went wrong during sign up.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-[450px] transition-all">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <select
            name="region_id"
            value={form.region_id}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
          >
            <option value="">Select your region</option>
            {regions?.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>

          {success && (
            <p className="text-green-600 text-sm sm:text-base">{success}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm sm:text-base">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`py-2 rounded-md text-white text-sm sm:text-base transition-colors ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm sm:text-base">
          Already have an account?{" "}
          <Link href={`/${locale}/auth/signin`} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>

        <p className="mt-2 text-center text-gray-500 text-sm sm:text-base">
          <Link href={`/${locale}`} className="hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
