"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./Hero.css";

const heroData = [
  {
    id: 1,
    key: "iphone",
    image: "/assets/apple-hero2.webp",
  },
  {
    id: 2,
    key: "macbook",
    image: "/assets/mac2.jpg",
  },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [loadingBuyId, setLoadingBuyId] = useState<number | null>(null);
  const [loadingLearnId, setLoadingLearnId] = useState<number | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Hero"); // 🔥 i18n kalitlar

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBuyClick = async (title: string, id: number) => {
    try {
      setLoadingBuyId(id);
      await new Promise((r) => setTimeout(r, 300));
      router.push(
        `https://ikafil.vercel.app/products?name=${title}&status=null&priceMin=1000&priceMax=20000`
      );
    } finally {
      setLoadingBuyId(null);
    }
  };

  const handleLearnMore = async (id: number) => {
    try {
      setLoadingLearnId(id);
      await new Promise((r) => setTimeout(r, 800));
      router.push(`/${locale}/products`);
    } finally {
      setLoadingLearnId(null);
    }
  };

  return (
    <section
      className={`relative w-full overflow-hidden bg-black text-white ${
        isMobile ? "h-[450px]" : "h-[810px]"
      }`}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        speed={600}
        className="w-full h-full"
      >
        {heroData.map((hero) => (
          <SwiperSlide key={hero.id}>
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
              <div className="absolute top-20 flex flex-col items-center gap-3 z-10">
                <h1
                  className={`font-semibold ${
                    isMobile ? "text-3xl" : "text-6xl"
                  }`}
                >
                  {t(`${hero.key}.title`)}
                </h1>
                <p
                  className={`text-gray-300 ${
                    isMobile ? "text-base" : "text-xl"
                  }`}
                >
                  {t(`${hero.key}.subtitle`)}
                </p>

                <div className="flex items-center justify-center gap-5 mt-4">
                  <button
                    onClick={() => handleLearnMore(hero.id)}
                    disabled={loadingLearnId === hero.id}
                    className={`px-6 py-2 bg-blue-600 rounded-full font-medium transition ${
                      loadingLearnId === hero.id
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    {loadingLearnId === hero.id ? t("loading") : t("learnMore")}
                  </button>

                  <button
                    onClick={() => handleBuyClick(hero.key, hero.id)}
                    disabled={loadingBuyId === hero.id}
                    className={`px-6 py-2 border border-blue-600 rounded-full font-medium transition ${
                      loadingBuyId === hero.id
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {loadingBuyId === hero.id ? t("loading") : t("buy")}
                  </button>
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
                <Image
                  src={hero.image}
                  alt={t(`${hero.key}.title`)}
                  width={isMobile ? 320 : 900}
                  height={isMobile ? 320 : 900}
                  priority
                  unoptimized
                  className={`object-contain ${
                    isMobile ? "w-[260px] sm:w-[320px]" : "w-[800px]"
                  }`}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
