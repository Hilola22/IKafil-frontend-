"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DeviceFilter } from "./DeviceFilter";
import { DeviceView } from "./DeviceView";
import { DevicePagination } from "../device-pagination/DevicePagination";

export const FilterCaller = ({
  data,
  pagination,
}: {
  data: any[];
  pagination: { page: number; totalPages: number };
}) => {
  const searchParams = useSearchParams();
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (filters: any) => {
    setIsLoading(true);
    const filtered = data.filter((p: any) => {
      const price = parseFloat(p.base_price);
      return (
        price >= filters.priceRange[0] &&
        price <= filters.priceRange[1] &&
        (!filters.ram || p.details?.ram === filters.ram) &&
        (filters.status
          ? p.status === "available"
          : ["available", "sold"].includes(p.status)) &&
        (!filters.type || p.type === filters.type) &&
        (!filters.name ||
          p.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.cpu || p.details?.cpu === filters.cpu) &&
        (!filters.year || p.details?.year?.toString() === filters.year) &&
        (!filters.color || p.details?.color === filters.color)
      );
    });

    setTimeout(() => {
      setFilteredData(filtered);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const filters = {
      priceRange: [
        parseInt(searchParams.get("priceMin") || "1000"),
        parseInt(searchParams.get("priceMax") || "20000"),
      ],
      ram: searchParams.get("ram"),
      cpu: searchParams.get("cpu"),
      year: searchParams.get("year"),
      color: searchParams.get("color"),
      type: searchParams.get("type"),
      name: searchParams.get("name"),
      status:
        searchParams.get("status") === "null"
          ? null
          : searchParams.get("status"),
    };

    handleFilterChange(filters);
  }, [searchParams]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-10 max-w-7xl mx-auto">
      <div className="lg:w-1/4 w-full">
        <DeviceFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="lg:w-4/4 w-full">
        <DeviceView isLoading={isLoading} data={filteredData} />
        {filteredData.length !== 0 ? (
          <DevicePagination
            page={pagination.page}
            totalPages={pagination.totalPages}
          />
        ) : (
          <p className="text-2xl text-center text-slate-400 mt-10">
            No data so sorry
          </p>
        )}
      </div>
    </div>
  );
};
