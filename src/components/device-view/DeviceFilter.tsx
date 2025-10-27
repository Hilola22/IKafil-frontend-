"use client";

import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ramOptions = ["8GB", "12GB", "16GB"];
const cpuOptions = ["Snapdragon 8 Gen 2", "A17 Pro", "Apple M2 Pro"];
const yearOptions = ["2022", "2024"];
const colorOptions = ["Midnight Blue", "Purple", "Black", "Space Gray"];

export const DeviceFilter = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 20000]);
  const [selectedRam, setSelectedRam] = useState<string | null>(null);
  const [selectedCpu, setSelectedCpu] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const applyFilter = (field: string, value: string | null) => {
    const filters: any = {
      priceRange,
      ram: selectedRam,
      cpu: selectedCpu,
      year: selectedYear,
      color: selectedColor,
    };
    filters[field] = value;
    onFilterChange(filters);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Фильтр устройств</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Цена ($)</label>
          <Slider
            range
            min={1000}
            max={20000}
            step={50}
            value={priceRange}
            onChange={(val) => {
              const range = val as [number, number];
              setPriceRange(range);
              onFilterChange({
                priceRange: range,
                ram: selectedRam,
                cpu: selectedCpu,
                year: selectedYear,
                color: selectedColor,
              });
            }}
          />
          <div className="mt-2 text-sm text-gray-600">
            ${priceRange[0].toLocaleString()} – $
            {priceRange[1].toLocaleString()}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">RAM</label>
          <div className="flex flex-wrap gap-2">
            {ramOptions.map((ram) => {
              const newValue = ram === selectedRam ? null : ram;
              return (
                <button
                  key={ram}
                  onClick={() => {
                    setSelectedRam(newValue);
                    applyFilter("ram", newValue);
                  }}
                  className={`px-3 py-1 rounded-full border ${
                    selectedRam === ram
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800"
                  } transition`}
                >
                  {ram}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">CPU</label>
          <div className="flex flex-wrap gap-2">
            {cpuOptions.map((cpu) => {
              const newValue = cpu === selectedCpu ? null : cpu;
              return (
                <button
                  key={cpu}
                  onClick={() => {
                    setSelectedCpu(newValue);
                    applyFilter("cpu", newValue);
                  }}
                  className={`px-3 py-1 rounded-full border ${
                    selectedCpu === cpu
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800"
                  } transition`}
                >
                  {cpu}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Год выпуска</label>
          <div className="flex flex-wrap gap-2">
            {yearOptions.map((year) => {
              const newValue = year === selectedYear ? null : year;
              return (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(newValue);
                    applyFilter("year", newValue);
                  }}
                  className={`px-3 py-1 rounded-full border ${
                    selectedYear === year
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800"
                  } transition`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Цвет</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => {
              const newValue = color === selectedColor ? null : color;
              return (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(newValue);
                    applyFilter("color", newValue);
                  }}
                  className={`px-3 py-1 rounded-full border ${
                    selectedColor === color
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800"
                  } transition`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
