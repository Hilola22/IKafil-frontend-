"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "../../store/auth/useAuthStore";

export default function UserProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getAccessToken = useAuthStore((state) => state.getAccessToken);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://3.76.183.255:3030/api/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err))
      .finally(() => setLoading(false));
  }, [getAccessToken]);

  if (loading)
    return (
      <div className="flex flex-col gap-8 p-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <Skeleton className="w-full h-64 rounded-xl" />
            <Skeleton className="w-full h-12 rounded-lg" />
            <Skeleton className="w-full h-12 rounded-lg" />
            <Skeleton className="w-full h-12 rounded-lg" />
            <Skeleton className="w-full h-12 rounded-lg" />
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-lg" />
            ))}
            <div className="col-span-2">
              <Skeleton className="h-28 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );

  // ✅ Handle no user found
  if (!user)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        No user data found.
      </div>
    );

  // ✅ User data UI
  return (
    <div className="max-w-[700px] mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
      <div className="space-y-3">
        <p>
          <strong>Full name:</strong> {user.full_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Region:</strong> {user.region_id?.name || "No region"}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}
