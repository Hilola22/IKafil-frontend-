import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Truck, Clock, ShieldCheck, MapPin, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery Information | iKafil",
  description:
    "Learn about iKafil delivery options for your Apple products. Fast, secure, and transparent delivery service across Uzbekistan.",
  openGraph: {
    title: "Delivery Information | iKafil",
    description:
      "Fast and reliable delivery for all iKafil Apple devices. Get your MacBook or iPhone delivered safely and on time.",
    images: [
      {
        url: "/assets/delivery-og.jpeg",
        alt: "iKafil Delivery",
      },
    ],
  },
};

export default function DeliveryPage() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Delivery Information</h1>
        <p className="text-gray-600 text-lg">
          Fast, secure, and transparent delivery for every iKafil order — no
          matter where you are.
        </p>
      </div>

      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-2">How Delivery Works</h2>
            <p className="text-gray-600 leading-relaxed">
              Once your order is confirmed, our logistics team ensures that your
              Apple device is safely packaged, verified, and shipped with full
              tracking support. Whether you’re in Tashkent or another region,
              you’ll receive updates every step of the way.
            </p>
          </section>

          <Separator />

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <Truck className="mx-auto text-blue-600 w-10 h-10" />
              <h3 className="font-semibold text-lg">Nationwide Coverage</h3>
              <p className="text-gray-600 text-sm">
                We deliver to all regions of Uzbekistan — from Tashkent to Nukus
                — using trusted courier partners.
              </p>
            </div>

            <div className="space-y-3">
              <Clock className="mx-auto text-blue-600 w-10 h-10" />
              <h3 className="font-semibold text-lg">Fast Processing</h3>
              <p className="text-gray-600 text-sm">
                Orders are processed within 24 hours and typically delivered
                within 1–3 business days.
              </p>
            </div>

            <div className="space-y-3">
              <ShieldCheck className="mx-auto text-blue-600 w-10 h-10" />
              <h3 className="font-semibold text-lg">Safe & Insured</h3>
              <p className="text-gray-600 text-sm">
                All shipments are insured and packed securely to prevent damage
                during transit.
              </p>
            </div>
          </div>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Options</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium">Standard Delivery</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Available nationwide. Expect delivery within 1–3 business
                    days depending on your region. Tracking information is
                    provided once the package is shipped.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Truck className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium">Express Delivery (Tashkent)</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Same-day delivery is available for Tashkent orders placed
                    before 2 PM. Your device will arrive securely, right to your
                    door.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Package className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium">Pickup Option</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You can choose to pick up your order directly from our
                    iKafil collection point. This option is free of charge and
                    allows same-day pickup after confirmation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Have questions about delivery or tracking?
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
}
