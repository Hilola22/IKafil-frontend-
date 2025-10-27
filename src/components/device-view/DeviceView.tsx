import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { AddToCartButton } from "./AddToCartButton";
import { useWishlistStore } from "../../lib/userWishlist";
import { WishlistButton } from "./WishlistButton";

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

export const DeviceView = ({ data }: { data: Product | any }) => {

  const image_url = "http://3.76.183.255:3030";
  return (
    <div className="">
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.map((p: any, i: any) => (
            <div
              key={i}
              className="group relative p-3 py-1 bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {p.discount && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  Скидка {p.discount}
                </div>
              )}
              {p.status !== "available" && (
                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
                  Нет в наличии
                </div>
              )}

              <Link href={`/products/${p.id}`}>
                <div className="relative w-full md:h-75 h-50 cursor-pointer">
                  {(() => {
                    const fallback =
                      "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png";
                    const validImages = p.device_images?.filter(
                      (img: any) =>
                        typeof img?.url === "string" && img.url.startsWith("/")
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
                          className="absolute rounded-2xl inset-0 w-full py-[-10px] h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                        {hover && (
                          <Image
                            src={hover}
                            alt={p.name}
                            fill
                            unoptimized
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          />
                        )}
                      </>
                    );
                  })()}
                 <WishlistButton data={p}/>
                </div>
              </Link>

              <div className="ml-3 mt-4 space-y-2 mb-2">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <div className="flex gap-5 justify-between">
                  <p className="text-red-600 font-bold">{p.base_price}</p>
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
