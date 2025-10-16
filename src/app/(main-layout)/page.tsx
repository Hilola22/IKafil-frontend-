"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import BackTo from "../../components/header/BackTo";

const heroImages = ["/assets/17pro.jpg"];

const products = [
  {
    name: "iPhone 17",
    price: "17 220 000 сум",
    available: "Доступно в 5 цветах",
    image: "/assets/17pro.jpg",
    soldOut: true,
  },
  {
    name: "iPhone Air",
    price: "17 220 000 сум",
    available: "Доступно в 4 цветах",
    image: "/assets/17pro.jpg",
  },
  {
    name: "iPhone 17 Pro",
    price: "21 175 000 сум",
    discount: "9%",
    available: "Доступно в 3 цветах",
    image: "/assets/17pro.jpg",
  },
  {
    name: "iPhone 17 Pro Max",
    price: "23 620 000 сум",
    oldPrice: "25 830 000 сум",
    discount: "9%",
    available: "Доступно в 3 цветах",
    image: "/assets/17pro.jpg",
  },
  {
    name: "iPhone 16e",
    price: "10 390 000 сум",
    available: "Доступно в 2 цветах",
    image: "/assets/17pro.jpg",
  },
  {
    name: "iPhone 16",
    price: "11 299 000 сум",
    oldPrice: "12 399 000 сум",
    discount: "9%",
    available: "Доступно в 5 цветах",
    image: "/assets/17pro.jpg",
  },
  {
    name: "iPhone 16",
    price: "11 299 000 сум",
    oldPrice: "12 399 000 сум",
    discount: "9%",
    available: "Доступно в 5 цветах",
    image: "/assets/17pro.jpg",
  },
  {
    name: "iPhone 16",
    price: "11 299 000 сум",
    oldPrice: "12 399 000 сум",
    discount: "9%",
    available: "Доступно в 5 цветах",
    image: "/assets/17pro.jpg",
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 90);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white text-gray-900">
      <div
        className={`transition-all duration-600 ease-in-out ${
          isScrolled
            ? "h-[60vh] max-w-6xl mx-auto rounded-3xl shadow-lg"
            : "h-screen w-full"
        } overflow-hidden`}
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={1200}
          loop
          className="w-full h-full"
        >
          {heroImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full pt-5">
                <Image
                  src={src}
                  alt={`hero-${index}`}
                  fill
                  priority
                  unoptimized
                  className="object-cover scale-105 hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
                    Galaxy Innovation
                  </h1>
                  <p className="text-lg md:text-2xl opacity-90 mb-6">
                    Discover the power of the next generation.
                  </p>
                  <button className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

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
          {products.map((p, i) => (
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
                  src={p.image}
                  alt={p.name}
                  fill
                  unoptimized
                  className="object-contain rounded-2xl p-6 transition-transform duration-500 hover:scale-105"
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
        {/* o'chirib yubormang , i did this here */}
        <BackTo />
      </section>
    </main>
  );
}
