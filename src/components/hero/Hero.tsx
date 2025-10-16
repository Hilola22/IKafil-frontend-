"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const heroImages = ["/assets/17pro.jpg"];

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
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
                  Apple products
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
  );
}
