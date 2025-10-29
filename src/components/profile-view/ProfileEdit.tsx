"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useEffect, useState } from "react";

export default function ProfileEditPage() {
  const [user, setUser] = useState<any>(null);

  const getAccessToken = useAuthStore((state) => state.getAccessToken);
  const [token, setToken] = useState<string | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

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

  console.log(user);
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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto md:p-10">
        <div className="bg-white/90 backdrop-blur-xl  shadow-2xl border-gray- md:p-12">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-5">
            <h2 className=" md:text-2xl font-semibold italic text-gray-800 tracking-wide">
              Edit Your Profile
            </h2>
            {/* <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
              Save Changes
            </button> */}
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col items-center p-6">
              {/* Large Image */}
              <div className="relative w-full h-52 md:h-64 lg:h-72 rounded-2xl overflow-hidden mb-6">
                <img
                  src={
                    photo ||
                    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=1200"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover transition-all hover:scale-105 duration-300"
                />
                {photo && (
                  <button
                    onClick={() => setPhoto(null)}
                    className="absolute top-3 right-3 bg-white/90 text-gray-700 rounded-full p-1.5 shadow hover:bg-gray-100"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Upload Button */}
              <label className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <span className="block text-center border border-gray-300 py-2.5 rounded-lg cursor-pointer hover:bg-gray-100 transition-all font-medium text-gray-700">
                  Upload New Photo
                </span>
              </label>

              {/* Password Section */}
              <div className="w-full mt-8">
                <h3 className="text-md font-semibold text-gray-800 mb-3 border-b pb-1">
                  Change Password
                </h3>
                <Input label="Old Password" type="password" />
                <Input label="New Password" type="password" />
                <button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium hover:shadow-md transition-all">
                  Update Password
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-md p-8 md:p-10">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
                Profile Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <Input label="Full Name" value={user.full_name} />
                <Input label="Email" type="email" value={user.email} />
                <Input label="Phone" value={user.phone} />
                <Input label="Region" value={user.region.name} />
                <Input
                  label="Display Name"
                  value={user.full_name.split(" ")[0]}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-medium">
                  About the User
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all"
                  placeholder="Write a short bio about yourself..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  type = "text",
}: {
  label: string;
  value?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1 font-medium">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="border border-gray-200 rounded-xl p-3 text-sm focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all bg-gray-50 hover:bg-white"
      />
    </div>
  );
}
