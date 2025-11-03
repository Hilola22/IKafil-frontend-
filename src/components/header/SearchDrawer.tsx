"use client";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Input } from "../ui/input";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({ open, onClose }) => {
  const router = useRouter();
  const params = useParams();
  const locale = (params as any)?.locale as string;
  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [title]);

  useEffect(() => {
    if (!debouncedTitle) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    fetch(`https://api.ikafil.uz/api/devices?search=${debouncedTitle}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        const normalized = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.devices)
          ? data.devices
          : Array.isArray(data)
          ? data
          : [];
        setResults(normalized);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [debouncedTitle]);

  return (
    <div
      className={`fixed inset-0 z-[999] transition-all duration-500 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] md:w-[480px] lg:w-[520px] bg-white shadow-2xl transform transition-transform duration-500 rounded-l-2xl flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">Search</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-5 border-b bg-white sticky top-[64px] z-10">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search devices"
            className="w-full rounded-md shadow-sm border border-gray-300 text-gray-800"
          />
          {isLoading && debouncedTitle && (
            <p className="text-sm text-gray-400 mt-2">Loading...</p>
          )}
          {isError && debouncedTitle && (
            <p className="text-sm text-red-400 mt-2">Error fetching results</p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {results.map((device) => {
            const details = device.details || {};
            const imageUrl = device.device_images?.[0]?.url
              ? `https://api.ikafil.uz${device.device_images[0].url}`
              : "/no-image.jpg";

            return (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <Link href={`/${locale}/products/${device.id}`}>
                    <div className="w-16 h-16">
                      <img
                        src={imageUrl}
                        alt={device.name}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => (e.currentTarget.src = "/no-image.jpg")}
                      />
                    </div>
                  </Link>

                  <div className="text-[14px] leading-5">
                    <h4
                      onClick={() => {
                        onClose();
                        router.push(`/${locale}/products/${device.id}`);
                      }}
                      className="font-semibold text-[16px] text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {device.name}
                    </h4>

                    <div className="text-gray-600 mt-1 space-y-0.5">
                      <p>
                        Цвет:{" "}
                        <span className="text-gray-800">
                          {details.color || "-"}
                        </span>
                      </p>
                      <p>
                        Ёмкость:{" "}
                        <span className="text-gray-800">
                          {details.storage || "-"}
                        </span>
                      </p>
                      <p>
                        SIM:{" "}
                        <span className="text-gray-800">
                          {details.sim_type || "Single SIM"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[18px] font-semibold text-gray-900">
                    {Number(device.base_price).toLocaleString()}{" "}
                    <span className="text-sm text-gray-800">сум</span>
                  </p>
                </div>
              </div>
            );
          })}

          {debouncedTitle && !isLoading && !isError && results.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              No results found for “{debouncedTitle}”
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
