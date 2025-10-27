"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [user, setUser] = useState<any>(null);

  const getAccessToken = useAuthStore((state) => state.getAccessToken);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    fetch("http://3.76.183.255:3030/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [getAccessToken]);

  if (!user)
    return (
      <div className="flex flex-col gap-10 w-full p-6 md:p-10 animate-in fade-in duration-500 bg-gray-50 dark:bg-neutral-900 min-h-[80vh]">
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 max-w-6xl mx-auto w-full">
          <div className="w-full md:w-1/3 flex flex-col gap-5">
            <Skeleton className="w-full h-60 rounded-2xl" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-lg" />
            ))}
            <div className="col-span-full">
              <Skeleton className="h-28 md:h-32 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-[700px] mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
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
        <strong>Region:</strong> {user.region_id.name}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}
