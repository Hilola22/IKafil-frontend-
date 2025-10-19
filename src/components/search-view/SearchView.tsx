"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { DeviceView } from "../device-view/DeviceView";

export default function Search() {
  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [results, setResults] = useState<any | any[]>([]);
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

    fetch(`http://3.76.183.255:3030/api/devices?search=${debouncedTitle}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        setResults(data || []), console.log(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [debouncedTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-red-500 text-center font-bold text-3xl mt-10">
        Search
      </h2>

      <div className="flex justify-center mb-8 p-10">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search"
          className="w-full max-w-md rounded-md shadow-md border-none text-gray-800"
        />
      </div>

      {isLoading && debouncedTitle && (
        <p className="text-center text-gray-400 mt-10">Loading...</p>
      )}

      {isError && debouncedTitle && (
        <p className="text-center text-red-400 mt-10">Error fetching results</p>
      )}

      <DeviceView data={results?.data} />

      {debouncedTitle && results.length === 0 && !isLoading && !isError && (
        <p className="text-center text-gray-400 mt-10">
          No results found for “{debouncedTitle}”
        </p>
      )}
    </div>
  );
}
