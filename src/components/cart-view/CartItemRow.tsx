"use client";
import React from "react";
import Link from "next/link";
import { Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { Device } from "../../lib/useCart"; // Device interface import qilindi

const baseUrl = "https://api.ikafil.uz";

interface CartItemRowProps {
  item: Device;
  isRemoving: number | null;
  handleRemove: (id: number) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  isRemoving,
  handleRemove,
}) => {
  const imageUrl = item.device.device_images?.[0]?.url
    ? `${baseUrl}${item.device.device_images[0].url}`
    : "/assets/Image-not-found.png";

  const details = item.device.details || {};

  return (
    <tr key={item.id} className="border-b">
      <td className="py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={imageUrl}
            alt={item.device.name}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg"
          />
          <div className="text-sm leading-5">
            <Link
              href={`/products/${item.device.id}`}
              className="text-base font-medium hover:text-blue-500 transition-colors"
            >
              {item.device.name}
            </Link>

            {/* Agar is_active false bo‘lsa Sotib olingan belgisi */}
            {!item.device.is_active && (
              <div className="mt-1 flex items-center gap-1 text-red-500 font-semibold text-sm">
                <CheckCircle2 size={16} /> Sotib olingan
              </div>
            )}

            <div className="text-gray-600 mt-1 space-y-0.5">
              <p>
                Цвет: <span className="text-gray-800">{details.color || "-"}</span>
              </p>
              <p>
                Ёмкость: <span className="text-gray-800">{details.storage || "-"}</span>
              </p>
              <p>
                SIM: <span className="text-gray-800">{details.sim_type || "Single SIM"}</span>
              </p>
            </div>
          </div>
        </div>
      </td>

      <td className="py-4 align-top font-medium text-gray-800 text-sm sm:text-base">
        {Number(item.device.base_price).toLocaleString()} so'm
      </td>

      <td className="py-4 text-right align-top w-[60px]">
        <button
          onClick={() => handleRemove(item.id)}
          disabled={isRemoving === item.id || !item.device.is_active} // agar is_active false bo‘lsa o‘chiriladi
          className="text-red-500 hover:text-red-600 transition disabled:opacity-50"
        >
          {isRemoving === item.id ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Trash2 size={20} />
          )}
        </button>
      </td>
    </tr>
  );
};
