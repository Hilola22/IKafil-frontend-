"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useSearch } from "../../context/useSearch";

interface DeviceResponse {
  data: any[];
}

export default function Search() {
  const { searchTitle } = useSearch();
  const [title, setTitle] = useState(searchTitle || "");
  const [debouncedTitle, setDebouncedTitle] = useState(searchTitle || "");
  const [results, setResults] = useState<DeviceResponse | null>(null);
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
      setResults(null);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    fetch(`https://api.ikafil.uz/api/devices?search=${debouncedTitle}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => setResults(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [debouncedTitle]);

  return (
    <div className="container mx-auto px-3 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-3 text-sm sm:text-base mt-3">
        <p className="hover:text-blue-500 underline underline-offset-4">
          Search
        </p>
      </div>

      <h3 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-medium">
        Search Results
      </h3>

      <div className="mt-6 flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">
          <div className="flex-1 overflow-x-auto w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b text-sm sm:text-base">
                  <th className="py-3">Product</th>
                  <th className="py-3">Price</th>
                  <th className="py-3 w-[60px] text-right"></th>
                </tr>
              </thead>
              <tbody>
                {results?.data.map((device) => {
                  const details = device.details || {};
                  const imageUrl = device.device_images?.[0]?.url
                    ? `https://api.ikafil.uz${device.device_images[0].url}`
                    : "/no-image.jpg";

                  return (
                    <tr
                      key={device.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16">
                            <img
                              src={imageUrl}
                              alt={device.name}
                              className="w-full h-full object-cover rounded-md border"
                              onError={(e) =>
                                (e.currentTarget.src = "/no-image.jpg")
                              }
                            />
                          </div>
                          <div className="text-sm leading-5">
                            <p className="font-semibold text-gray-800">
                              {device.name}
                            </p>
                            <p className="text-gray-600 mt-1">
                              Цвет:{" "}
                              <span className="text-gray-800">
                                {details.color || "-"}
                              </span>
                            </p>
                            <p className="text-gray-600">
                              Ёмкость:{" "}
                              <span className="text-gray-800">
                                {details.storage || "-"}
                              </span>
                            </p>
                            <p className="text-gray-600">
                              SIM:{" "}
                              <span className="text-gray-800">
                                {details.sim_type || "Single SIM"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-[15px] font-semibold text-gray-900">
                        {Number(device.base_price).toLocaleString()}{" "}
                        <span className="text-sm text-gray-700">сум</span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() =>
                            (window.location.href = `/products/${device.id}`)
                          }
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {debouncedTitle &&
            !isLoading &&
            !isError &&
            results?.data?.length === 0 && (
              <p className="text-center text-gray-400 mt-10">
                No results found for “{debouncedTitle}”
              </p>
            )}
        </div>

        <div className="w-full sm:max-w-md lg:w-[320px] border rounded-2xl p-5 sm:p-6 shadow-md bg-white sticky top-20">
          <h4 className="text-lg sm:text-xl font-semibold mb-3">
            Search Devices
          </h4>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search"
            className="w-full rounded-md shadow-sm border border-gray-300 text-gray-800"
          />
          {isLoading && debouncedTitle && (
            <p className="text-sm text-gray-400 mt-4">Loading...</p>
          )}
          {isError && debouncedTitle && (
            <p className="text-sm text-red-400 mt-4">Error fetching results</p>
          )}
        </div>
      </div>
    </div>
  );
}
