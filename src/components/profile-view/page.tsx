"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("http://3.76.183.255:3030/api")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse w-full max-w-[700px] bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {/* Header skeleton */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200"></div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Body skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>

          {/* Button skeleton */}
          <div className="mt-8 flex justify-end">
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
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
