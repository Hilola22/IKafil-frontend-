import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, ShieldCheck, Wallet, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Trade-In Program | iKafil",
  description:
    "Exchange your used Apple device for cash or store credit at iKafil. Fast, transparent, and fair trade-in process for iPhones, MacBooks, and more.",
  openGraph: {
    title: "Trade-In Program | iKafil",
    description:
      "Upgrade easily with iKafil’s trade-in program — exchange your old Apple device for cash or credit towards your next purchase.",
    images: [
      {
        url: "/tradein-og.jpg",
        alt: "iKafil Trade-In",
      },
    ],
  },
};

export default function TradeInPage() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Trade-In Program</h1>
        <p className="text-gray-600 text-lg">
          Exchange your used Apple device for instant cash or credit towards
          your next upgrade.
        </p>
      </div>

      {/* INTRO */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Why Trade In with iKafil?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              iKafil makes upgrading your Apple devices easy and rewarding. We
              provide a transparent trade-in process that ensures you get the
              best value for your pre-owned iPhone, MacBook, iPad, or Apple
              Watch — all handled safely and professionally.
            </p>
          </section>

          <Separator />

          {/* ICON FEATURES */}
          <div className="grid md:grid-cols-3 gap-8 text-center pt-4">
            <div className="space-y-3">
              <Wallet className="mx-auto text-blue-600 w-10 h-10" />
              <h3 className="font-semibold text-lg">Instant Cash or Credit</h3>
              <p className="text-gray-600 text-sm">
                Get paid immediately or receive store credit towards your next
                Apple device.
              </p>
            </div>

            <div className="space-y-3">
              <ShieldCheck className="mx-auto text-blue-600 w-10 h-10" />
              <h3 className="font-semibold text-lg">Safe & Transparent</h3>
              <p className="text-gray-600 text-sm">
                Every trade-in is inspected in front of you. No hidden fees, no
                tricks — just fair value.
              </p>
            </div>

            <div className="space-y-3">
              <RefreshCw className="mx-auto text-blue-600 w-10 h-10" />
              <h3 className="font-semibold text-lg">Sustainable Upgrade</h3>
              <p className="text-gray-600 text-sm">
                Join us in reducing e-waste by giving your device a second life
                through reuse or recycling.
              </p>
            </div>
          </div>

          <Separator />

          {/* HOW IT WORKS */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">1. Get a Free Evaluation</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Bring your device to any iKafil location or fill out our
                    online form. Our experts will evaluate your device’s
                    condition in minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">2. Get an Offer Instantly</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We’ll make a competitive offer based on your device’s model,
                    condition, and market demand. You can choose cash or store
                    credit.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">3. Upgrade Smarter</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Apply your credit towards your next iPhone, MacBook, or any
                    Apple product in our store — or simply take your cash on the
                    spot.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Ready to trade in your Apple device?
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
          Start Trade-In
        </button>
      </div>
    </div>
  );
}
