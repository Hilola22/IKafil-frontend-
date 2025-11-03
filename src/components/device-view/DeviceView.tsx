import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AddToCartButton } from "./AddToCartButton";
import { WishlistButton } from "./WishlistButton";
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
  id: number;
  name: string;
  base_price: string;
  status: string;
  details?: {
    color?: string;
    year?: number;
    cpu?: string;
    ram?: string;
    storage?: string;
    display_size?: string;
    battery_health?: string;
    description?: string;
  };
  device_images?: { url: string; is_primary?: boolean }[];
};

export const DeviceView = ({
  data,
  isLoading,
  locale,
}: {
  data: Product[] | any;
  isLoading?: boolean;
  locale?: string;
}) => {
  const image_url = "https://api.ikafil.uz";

  return (
    <div className="">
      <section className="max-w-7xl mx-auto mb-10 sm:px-4 px-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative p-2 sm:p-3 bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300"
                >
                  <Skeleton className="w-full h-[180px] sm:h-[230px] md:h-[280px] rounded-2xl" />
                  <div className="ml-2 sm:ml-3 mt-2 space-y-1 sm:space-y-2 mb-2">
                    <Skeleton className="h-4 w-[80%]" />
                    <div className="flex gap-3 sm:gap-5 justify-between items-center">
                      <Skeleton className="h-4 w-[60px]" />
                      <Skeleton className="h-6 w-8 rounded-md" />
                    </div>
                  </div>
                </div>
              ))
            : data?.map((p: any, i: any) => (
                <div
                  key={i}
                  className="group relative p-2 sm:p-3 bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  {p.discount && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full z-10">
                      Скидка {p.discount}
                    </div>
                  )}
                  {p.status !== "available" && (
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full z-10">
                      Нет в наличии
                    </div>
                  )}

                  <Link href={`${locale ? `/${locale}` : ""}/products/${p.id}`}>
                    <div className="relative w-full h-[180px] sm:h-[230px] md:h-[260px] cursor-pointer">
                      {(() => {
                        const fallback =
                          "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png";
                        const validImages = p.device_images?.filter(
                          (img: any) =>
                            typeof img?.url === "string" &&
                            img.url.startsWith("/")
                        ) || [fallback];

                        const main = validImages[0]?.url
                          ? image_url + validImages[0].url
                          : fallback;
                        const hover = validImages[1]?.url
                          ? image_url + validImages[1].url
                          : fallback;

                        return (
                          <>
                            <Image
                              src={main}
                              alt={p.name}
                              fill
                              unoptimized
                              className="absolute rounded-2xl inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                            />
                            {hover && (
                              <Image
                                src={hover}
                                alt={p.name}
                                fill
                                unoptimized
                                className="absolute inset-0 w-full h-full object-cover opacity-0 rounded-2xl transition-opacity duration-500 group-hover:opacity-100"
                              />
                            )}
                          </>
                        );
                      })()}
                      <WishlistButton data={p} />
                    </div>
                  </Link>

                  <div className="ml-2 sm:ml-3 mt-2 space-y-0">
                    <h3 className="font-semibold text-sm sm:text-lg line-clamp-1">
                      {p.name}
                    </h3>
                    <div className="flex gap-3 sm:gap-3 justify-between items-center">
                      <p className="text-sm sm:text-lg font-bold">
                        {p.base_price} $
                      </p>
                      <AddToCartButton data={p} />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};
