"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useEffect, useState } from "react";

export default function ProfileEditPage() {
  const getAccessToken = useAuthStore((state) => state.getAccessToken);

  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const [formData, setFormData] = useState<any>({
    full_name: "",
    email: "",
    phone: "",
    region: "",
    username: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    setToken(accessToken);

    fetch("http://3.76.183.255:3030/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
        const data = await res.json();

        setUser(data);
        setFormData({
          full_name: data.full_name || "",
          email: data.email || "",
          phone: data.phone || "",
          region: data.region?.name || "",
          username: data.username || "",
        });
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [getAccessToken]);

  const handleSaveChanges = async () => {
    if (!token || !user) return;

    try {
      const res = await fetch(`http://3.76.183.255:3030/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Update failed: ${res.status}`);

      const updatedUser = await res.json();
      setUser(updatedUser);

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile");
    }
  };
  console.log(user);

  if (!user) {
    return (
      <div className="flex flex-col gap-10 w-full p-6 md:p-10 animate-in fade-in duration-500 bg-gray-50 dark:bg-neutral-900 min-h-[80vh]">
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 max-w-6xl mx-auto w-full">
          <div className="w-full md:w-1/3 flex flex-col gap-5">
            <Skeleton className="w-full h-60 rounded-2xl" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-10 rounded-lg" />
            ))}
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
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto md:p-10">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl md:p-12">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-5">
            <h2 className="md:text-2xl pt-6 md:pt-0 font-semibold italic text-gray-800 tracking-wide">
              Edit Your Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProfileSidebar
              photo={photo}
              onPhotoChange={handlePhotoChange}
              onRemovePhoto={() => setPhoto(null)}
            />

            <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-md p-8 md:p-10">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
                Profile Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <Input
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Input
                  label="Region"
                  name="region"
                  value={formData.region}
                  readOnly
                  className="cursor-not-allowed bg-gray-100"
                />
                <Input
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-medium">
                  About the User
                </label>
                <textarea
                  name="about"
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all"
                  placeholder="Write a short bio about yourself..."
                ></textarea>
              </div>

              <button
                onClick={handleSaveChanges}
                className="ml-auto mt-5 block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-[12px] shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------
// qisqa
// ---------------------
function Input({
  label,
  value,
  type = "text",
  name,
  onChange,
  readOnly = false,
  className = "",
}: {
  label: string;
  value?: string;
  type?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1 font-medium">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`border border-gray-200 rounded-xl p-3 text-sm focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all bg-gray-50 hover:bg-white ${className}`}
      />
    </div>
  );
}

function ProfileSidebar({
  photo,
  onPhotoChange,
  onRemovePhoto,
}: {
  photo: string | null;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
}) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col items-center p-6">
      <div className="relative w-full h-52 md:h-64 lg:h-72 rounded-2xl overflow-hidden mb-6">
        <img
          src={
            photo ||
            "https://static.vecteezy.com/ti/vecteur-libre/p1/26434409-vecteur-d-icone-de-profil-d-avatar-par-defaut-photo-d-utilisateur-de-medias-sociaux-vectoriel.jpg"
          }
          alt="Profile"
          className="w-full h-full object-cover transition-all hover:scale-105 duration-300"
        />
        {photo && (
          <button
            onClick={onRemovePhoto}
            className="absolute top-3 right-3 bg-white/90 text-gray-700 rounded-full p-1.5 shadow hover:bg-gray-100"
          >
            ✕
          </button>
        )}
      </div>

      <label className="w-full">
        <input
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          className="hidden"
        />
        <span className="block text-center border border-gray-300 py-2.5 rounded-lg cursor-pointer hover:bg-gray-100 transition-all font-medium text-gray-700">
          Upload New Photo
        </span>
      </label>

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
  );
}
