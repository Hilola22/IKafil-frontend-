"use client";

import React, { useEffect, useState } from "react";
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
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setFilteredData(data);
      setIsLoading(false);
    }, 1000);
  }, [data]);

  const handleFilterChange = (filters: any) => {
    setIsLoading(true);
    const filtered = data.filter((p: any) => {
      const price = parseFloat(p.base_price);
      return (
        price >= filters.priceRange[0] &&
        price <= filters.priceRange[1] &&
        (!filters.ram || p.details?.ram === filters.ram) &&
        (!filters.status || p.status === filters.status) &&
        (!filters.type || p.type === filters.type) &&
        (!filters.name ||
          p.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.cpu || p.details?.cpu === filters.cpu) &&
        (!filters.year || p.details?.year?.toString() === filters.year) &&
        (!filters.color || p.details?.color === filters.color)
      );
    });

    console.log(filters);
    console.log(filtered);

    setTimeout(() => {
      setFilteredData(filtered);
      setIsLoading(false);
    }, 1000);
  };

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
