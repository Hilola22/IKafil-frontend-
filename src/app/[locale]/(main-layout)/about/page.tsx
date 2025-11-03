import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  DollarSign,
  Info,
  CheckCircle,
  Users,
  Leaf,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About iKafil | Premium Pre-Owned Apple Devices",
  description:
    "Learn more about iKafil — your trusted destination for premium pre-owned Apple products, including MacBooks, iPhones, and accessories.",
  keywords: [
    "iKafil",
    "pre-owned Apple devices",
    "used MacBook",
    "used iPhone",
    "refurbished Apple",
    "MacBook Uzbekistan",
  ],
  openGraph: {
    title: "About iKafil | Premium Pre-Owned Apple Devices",
    description:
      "Discover who we are and why iKafil is the trusted source for premium pre-owned Apple products.",
    url: "https://ikafil.uz/about",
    siteName: "iKafil",
    images: [
      {
        url: "/images/ikafil-og.jpg",
        width: 1200,
        height: 630,
        alt: "iKafil - Premium Pre-Owned Apple Devices",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About iKafil | Premium Pre-Owned Apple Devices",
    description:
      "Learn more about iKafil and our mission to make Apple technology accessible and sustainable.",
    images: ["/images/ikafil-og.jpg"],
  },
};

export default function AboutPage() {
  const features = [
    {
      title: "Quality Assured",
      description:
        "Every device undergoes rigorous testing and inspection to ensure optimal performance and reliability.",
      icon: ShieldCheck,
    },
    {
      title: "Competitive Pricing",
      description:
        "Get premium Apple products at prices that won't break the bank. Quality technology should be accessible.",
      icon: DollarSign,
    },
    {
      title: "Detailed Specifications",
      description:
        "Complete transparency with detailed information about each device's condition, specs, and history.",
      icon: Info,
    },
    {
      title: "Authentic Products",
      description:
        "100% genuine Apple products. We never sell replicas or counterfeit devices.",
      icon: CheckCircle,
    },
    {
      title: "Expert Support",
      description:
        "Our team of Apple enthusiasts is here to help you find the perfect device for your needs.",
      icon: Users,
    },
    {
      title: "Sustainability",
      description:
        "By choosing pre-owned, you're making an environmentally conscious decision that reduces e-waste.",
      icon: Leaf,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <Image
          src="/images/about-hero.jpg"
          alt="iKafil Premium Apple Devices"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Welcome to iKafil
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto">
            Your trusted destination for premium pre-owned Mac and iPhone
            devices
          </p>
        </div>
      </div>

      <div className="container px-4 py-16 space-y-16">
        <section className="bg-white/80 backdrop-blur rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 sm:p-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  iKafil is a premier marketplace specializing in high-quality,
                  pre-owned Apple products. We believe that premium technology
                  should be accessible to everyone, providing carefully
                  inspected Mac computers and iPhones at competitive prices.
                </p>
                <p>
                  Our passion for Apple's ecosystem drives us to ensure that
                  every device meets the highest standards. Whether you're a
                  creative professional, a student, or someone upgrading their
                  device — iKafil is here to help.
                </p>
              </div>
            </div>
            <div className="relative h-64 md:h-auto rounded-2xl overflow-hidden">
              <Image
                src="/assets/teamwork.webp"
                alt="iKafil team working"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
            Why Choose iKafil?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ title, description, icon: Icon }, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-900 text-white p-2 rounded-lg">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 sm:p-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                We believe that everyone deserves access to premium technology.
                Our mission is to bridge the gap between quality and
                affordability with meticulously inspected pre-owned Apple
                devices that perform like new.
              </p>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                We're committed to sustainability, transparency, and customer
                satisfaction. Every device we sell represents our promise to
                deliver value, quality, and peace of mind.
              </p>
            </div>
            <div className="relative h-64 md:h-auto rounded-2xl overflow-hidden">
              <Image
                src="/images/about-mission.jpg"
                alt="iKafil mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="text-center py-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Device?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our collection of premium pre-owned Apple products and
            discover the iKafil difference today.
          </p>

          <Link
            href="/products"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
          >
            Browse Products
          </Link>
        </section>
      </div>
    </div>
  );
}
