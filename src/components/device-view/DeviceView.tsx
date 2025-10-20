import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const DeviceView = ({ data }: any) => {
  const image_url = "http://3.76.183.255:3030";

  console.log(data);

  return (
    <div className="container">
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
              {p.soldOut && (
                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
                  Нет в наличии
                </div>
              )}

              <Link href={`/products/${p.id}`}>
                <div className="relative w-full h-75 cursor-pointer">
                  {(() => {
                    const fallback =
                      "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png";
                    const validImages =
                      p.device_images?.filter(
                        (img: any) =>
                          typeof img?.url === "string" &&
                          img.url.startsWith("/")
                      ) || [];

                    const main = validImages[0]?.url
                      ? image_url + validImages[0].url
                      : fallback;
                    const hover = validImages[2]?.url
                      ? image_url + validImages[2].url
                      : null;

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
                            alt={p.name + "alt"}
                            fill
                            unoptimized
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          />
                        )}
                      </>
                    );
                  })()}
              <button
                type="button"
                className="px-1.5 py-1.5 absolute top-2 right-3 border text-white text-lg rounded-full flex items-center justify-center hover:text-red-500 transition justify-self-center gap-2"
              >
                <FaRegHeart/>
              </button>
                </div>
              </Link>

              <div className="ml-3 mt-4 space-y-2 mb-2">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <div className="flex gap-5 justify-between">
                  <p className="text-red-600 font-bold">{p.base_price}</p>
                  <button
                    type="button"
                    className="px-1.5 py-[-20px] border text-black text-lg rounded-xl flex items-center justify-center hover:text-slate-500 transition justify-self-center gap-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
