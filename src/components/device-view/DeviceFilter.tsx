"use client";

import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const ramOptions = ["8GB", "12GB", "16GB"];
const cpuOptions = ["Snapdragon 8 Gen 2", "A17 Pro", "Apple M2 Pro"];
const yearOptions = ["2022", "2024"];
const colorOptions = ["Midnight Blue", "Purple", "Black", "Space Gray"];
const types = ["iphone", "mac", "ipad"];
const iphoneModels = ["iPhone 15", "iPhone 16", "iPhone 17"];
const ipadModels = ["Ipad", "Ipad Pro", "Ipad Air"];
const macModels = ["MacBook Air", "MacBook Pro", "iMac"];

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
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [showSwitch, setShowSwitch] = useState(true);
  const [status, setstatus] = useState<string | null>(null);

  const triggerFilterUpdate = () => {
    onFilterChange({
      priceRange,
      ram: selectedRam,
      cpu: selectedCpu,
      year: selectedYear,
      color: selectedColor,
      type: selectedType,
      name: selectedName,
      status,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4">Device Filter</h2>

      <div className="flex flex-col space-y-2">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowSwitch((prev) => !prev)}
        >
          <div className="flex justify-between">Доступность</div>
          {!showSwitch ? (
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition" />
          )}
        </div>

        {showSwitch && (
          <div className="mt-2 flex items-center gap-2">
            <Switch
              id="airplane-mode"
              checked={status === "available"}
              onCheckedChange={(val: any) => {
                setstatus(val ? "available" : null);
                triggerFilterUpdate();
              }}
            />

            <Label htmlFor="airplane-mode">В наличии</Label>
          </div>
        )}
      </div>

      <div className="space-y-10 mt-6">
        <div>
          <label className="block text-sm font-medium mb-2">Price ($)</label>
          <Slider
            range
            min={1000}
            max={20000}
            step={50}
            value={priceRange}
            onChange={(val) => {
              const range = val as [number, number];
              setPriceRange(range);
              triggerFilterUpdate();
            }}
          />
          <div className="mt-2 text-sm text-gray-600">
            ${priceRange[0].toLocaleString()} - $
            {priceRange[1].toLocaleString()}
          </div>
        </div>

        {[
          {
            label: "RAM",
            options: ramOptions,
            selected: selectedRam,
            set: setSelectedRam,
            key: "ram",
          },
          {
            label: "CPU",
            options: cpuOptions,
            selected: selectedCpu,
            set: setSelectedCpu,
            key: "cpu",
          },
          {
            label: "Release Year",
            options: yearOptions,
            selected: selectedYear,
            set: setSelectedYear,
            key: "year",
          },
          {
            label: "Color",
            options: colorOptions,
            selected: selectedColor,
            set: setSelectedColor,
            key: "color",
          },
          {
            label: "Type",
            options: types,
            selected: selectedType,
            set: setSelectedType,
            key: "type",
          },
        ].map(({ label, options, selected, set, key }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const newValue = option === selected ? null : option;
                return (
                  <button
                    key={option}
                    onClick={() => {
                      set(newValue);
                      if (key === "type") {
                        setSelectedName(null);
                      }
                      triggerFilterUpdate();
                    }}
                    className={`px-3 py-1 rounded-full border ${
                      selected === option
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    } transition`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {selectedType === "iphone" && (
          <div>
            <label className="block text-sm font-medium mb-2">
              iPhone Model
            </label>
            <div className="flex flex-wrap gap-2">
              {iphoneModels.map((model) => {
                const newValue = model === selectedName ? null : model;
                return (
                  <button
                    key={model}
                    onClick={() => {
                      setSelectedName(newValue);
                      triggerFilterUpdate();
                    }}
                    className={`px-3 py-1 rounded-full border ${
                      selectedName === model
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    } transition`}
                  >
                    {model}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedType === "mac" && (
          <div>
            <label className="block text-sm font-medium mb-2">Mac Model</label>
            <div className="flex flex-wrap gap-2">
              {macModels.map((model) => {
                const newValue = model === selectedName ? null : model;
                return (
                  <button
                    key={model}
                    onClick={() => {
                      setSelectedName(newValue);
                      triggerFilterUpdate();
                    }}
                    className={`px-3 py-1 rounded-full border ${
                      selectedName === model
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    } transition`}
                  >
                    {model}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedType === "ipad" && (
          <div>
            <label className="block text-sm font-medium mb-2">iPad Model</label>
            <div className="flex flex-wrap gap-2">
              {ipadModels.map((model) => {
                const newValue = model === selectedName ? null : model;
                return (
                  <button
                    key={model}
                    onClick={() => {
                      setSelectedName(newValue);
                      triggerFilterUpdate();
                    }}
                    className={`px-3 py-1 rounded-full border ${
                      selectedName === model
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    } transition`}
                  >
                    {model}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
