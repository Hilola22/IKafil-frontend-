import Image from "next/image";
import React from "react";

export const DeviceView = ({ data }: any) => {
  const image_url = "http://3.76.183.255:3030";
  console.log(data);
  return (
    <div className="container ">
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Top products</h2>
          <a
            href="/products"
            className=" py-2 px-3 hover:border-b-1 border-blue-500 cursor-pointer"
          >
            {"View all products ->"}
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.map((p: any, i: any) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {p.discount && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Скидка {p.discount}
                </div>
              )}
              {p.soldOut && (
                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Нет в наличии
                </div>
              )}
              <div className="relative w-full h-64">
                <Image
                  src={
                    p?.device_images[0]?.url
                      ? image_url + p.device_images[0].url
                      : "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                  }
                  alt={p.name}
                  fill
                  unoptimized
                  className="rounded-2xl p-6  hover:scale-105 absolute inset-0 w-full h-full object-cover transition-opacity duration-300 hover:opacity-0"
                />
                <Image
                  src={
                    p?.device_images[2]?.url
                      ? image_url + p.device_images[2].url
                      : "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                  }
                  alt={p.name}
                  fill
                  unoptimized
                  className="rounded-2xl p-6  hover:scale-105 absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <div className="mt-1">
                  {p.oldPrice && (
                    <p className="text-gray-400 text-sm line-through">
                      {p.oldPrice}
                    </p>
                  )}
                  <p className="text-red-600 font-bold">{p.price}</p>
                </div>
                <p className="text-gray-500 text-sm mt-2">{p.available}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
