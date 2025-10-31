"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useEffect, useState } from "react";
import PaymentList from "@/components/payments/PaymentList";

export default function UserProfilePage() {
  const [user, setUser] = useState<any>(null);
  const getAccessToken = useAuthStore((state) => state.getAccessToken);
  const [token, setToken] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhoto");
    if (savedPhoto) {
      setPhoto(savedPhoto);
    }
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    fetch("https://api.ikafil.uz/api/auth/me", {
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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="relative w-full h-60 md:h-72 lg:h-80 overflow-hidden">
        <img
          src={
            user.banner ||
            "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1400"
          }
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <img
            src={
              photo ||
              user.photo ||
              "https://static.vecteezy.com/ti/vecteur-libre/p1/26434409-vecteur-d-icone-de-profil-d-avatar-par-defaut-photo-d-utilisateur-de-medias-sociaux-vectoriel.jpg"
            }
            alt="User"
            className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-2xl border-4 border-white shadow-lg"
          />

          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
              {user.full_name}
            </h2>
            <p className="text-gray-200 text-sm italic">
              @{user.full_name.split(" ")[0].toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      <div className=" mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800  mb-4 border-b pb-2">
              Contact Details
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-600">Email:</span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-medium text-gray-600">Phone:</span>{" "}
                {user.phone}
              </p>
              <p>
                <span className="font-medium text-gray-600">Region:</span>{" "}
                {user.region.name}
              </p>
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              About
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {user.bio ||
                "This user hasn’t added a bio yet. Add something about yourself to let others know who you are!"}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
              <ProfileStat label="Full Name" value={user.full_name} />
              <ProfileStat label="Region" value={user.region.name} />
              <ProfileStat label="Account" value={user.role || "💎 Personal"} />
            </div>

            <div className="mt-8 text-sm text-gray-500">
              Joined on{" "}
              <span className="font-medium text-gray-700">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="mt-10">
            <PaymentList userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  );
}
