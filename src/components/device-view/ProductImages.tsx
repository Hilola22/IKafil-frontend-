"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type ProductImagesProps = {
  images: string[];
  name: string;
};

export default function ProductImages({ images, name }: ProductImagesProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  const hasImages = images.length > 1;

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur">
      <CardContent className="p-6">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4 group">
          <Image
            src={mainImage}
            alt={name || "Product image"}
            width={800}
            height={800}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {hasImages && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  img === mainImage
                    ? "border-gray-900 shadow-lg ring-2 ring-gray-300"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image
                  src={img}
                  alt={`View ${index + 1}` || "Product image"}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
