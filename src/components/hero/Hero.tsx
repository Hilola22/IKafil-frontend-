"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const heroImages = ["/assets/17pro.jpg"];

export default function Hero() {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`relative w-full overflow-hidden transition-all duration-700 ease-in-out ${
        isShrunk ? "h-[70vh]" : "h-screen"
      }`}
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
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`hero-${index}`}
                fill
                priority
                unoptimized
                className="object-cover object-center transition-transform duration-[2500ms] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-md">
                  Apple Products
                </h1>
                <p className="text-lg md:text-2xl opacity-90 mb-6">
                  Discover the power of the next generation.
                </p>
                <button className="px-10 py-4 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
