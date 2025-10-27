"use client";

import React, { useState } from "react";
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

  const handleFilterChange = (filters: any) => {
    const filtered = data.filter((p: any) => {
      const price = parseFloat(p.base_price);
      return (
        price >= filters.priceRange[0] &&
        price <= filters.priceRange[1] &&
        (!filters.ram || p.details?.ram === filters.ram) &&
        (!filters.status || p.status === filters.status) &&
        (!filters.cpu || p.details?.cpu === filters.cpu) &&
        (!filters.year || p.details?.year?.toString() === filters.year) &&
        (!filters.color || p.details?.color === filters.color)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="mt-19">
      <DeviceFilter onFilterChange={handleFilterChange} />
      <DeviceView data={filteredData} />
      {filteredData.length !== 0 ? (
        <DevicePagination
          page={pagination.page}
          totalPages={pagination.totalPages}
        />
      ) : (
        <p className="text-2xl text-center text-slate-400">No data so sorry</p>
      )}
    </div>
  );
};
