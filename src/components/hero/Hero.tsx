"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const heroImages = ["/assets/17pro.jpg"];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className={`relative w-full overflow-hidden bg-black text-white transition-all duration-700 ease-in-out ${
        isMobile ? "h-[90vh]" : "h-screen"
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
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
              <div
                className={`absolute top-20 flex flex-col items-center ${
                  isMobile ? "gap-1" : "gap-4"
                }`}
              >
                <h1
                  className={`font-bold ${
                    isMobile ? "text-3xl" : "text-6xl"
                  } drop-shadow-md`}
                >
                  iPhone 17 Pro
                </h1>
                <p
                  className={`text-gray-300 ${
                    isMobile ? "text-base" : "text-xl"
                  }`}
                >
                  All out. Pro.
                </p>

                <div
                  className={`flex items-center justify-center gap-3 mt-3 ${
                    isMobile ? "text-sm" : "text-base"
                  }`}
                >
                  <button className="px-6 py-2 bg-blue-600 rounded-full font-medium hover:bg-blue-500 transition">
                    Learn more
                  </button>
                  <button className="px-6 py-2 border border-blue-600 rounded-full font-medium hover:bg-blue-600 hover:text-white transition">
                    Buy
                  </button>
                </div>
              </div>

              <div
                className={`relative ${
                  isMobile
                    ? "w-[240px] sm:w-[300px] bottom-[-30px]"
                    : "w-[550px] md:w-[650px] lg:w-[750px] mt-40"
                } h-auto`}
              >
                <Image
                  src={src}
                  alt={`hero-${index}`}
                  width={800}
                  height={800}
                  priority
                  unoptimized
                  className="object-cover mx-auto"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
