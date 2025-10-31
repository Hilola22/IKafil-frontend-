import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeviceView } from "@/components/device-view/DeviceView";
import DeviceButton from "@/components/device-view/DeviceButton";
import ProductImages from "@/components/device-view/ProductImages";
import {
  Cpu,
  HardDrive,
  Monitor,
  Battery,
  Calendar,
  Palette,
  MemoryStick,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export type Product = {
  id: number;
  name: string;
  base_price: string;
  status: string;
  details?: {
    color?: string;
    year?: number;
    cpu?: string;
    ram?: string;
    storage?: string;
    display_size?: string;
    battery_health?: string;
    description?: string;
  };
  device_images?: { url: string; is_primary?: boolean }[];
};

export default async function ProductDetail({ data }: { data: Product }) {
  const baseUrl = process.env.BASE_URL!;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const images = data.device_images?.length
    ? data.device_images.map((img) =>
        img.url.startsWith("http") ? img.url : `${baseUrl}${img.url}`
      )
    : ["https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"];

  let relatedProducts: Product[] = [];
  try {
    const relatedRes = await fetch(`${apiUrl}/devices?limit=8&page=1`, {
      cache: "no-store",
    });

    if (relatedRes.ok) {
      const relatedJson = await relatedRes.json();
      relatedProducts =
        relatedJson.data
          ?.filter((p: Product) => p.id !== data.id)
          .slice(0, 4) || [];
    }
  } catch (err) {
    console.error("Related fetch error:", err);
  }

  const specs = [
    { icon: Palette, label: "Color", value: data.details?.color },
    { icon: Calendar, label: "Year", value: data.details?.year },
    { icon: Cpu, label: "Processor", value: data.details?.cpu },
    { icon: MemoryStick, label: "RAM", value: data.details?.ram },
    { icon: HardDrive, label: "Storage", value: data.details?.storage },
    { icon: Monitor, label: "Display", value: data.details?.display_size },
    { icon: Battery, label: "Battery", value: data.details?.battery_health },
  ];

  const isAvailable = data.status === "available";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="lg:sticky lg:top-8 self-start">
          <ProductImages images={images} name={data.name} />
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {data.name}
                  </h1>

                  {data.status && (
                    <Badge
                      variant={isAvailable ? "default" : "destructive"}
                      className={`text-xs font-semibold px-3 py-1 ${
                        isAvailable
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {isAvailable ? (
                        <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1 inline" />
                      )}
                      {data.status?.toUpperCase()}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${data.base_price}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specs.map((spec, index) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:shadow-md group"
                    >
                      <div className="p-2 rounded-lg bg-white shadow-sm group-hover:bg-gray-900 transition-colors">
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          {spec.label}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {spec.value || "—"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {data.details?.description ||
                  "No detailed description available for this device."}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <DeviceButton product={data as any} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          More Products You May Like
        </h2>
        <DeviceView data={relatedProducts} />
      </div>
    </div>
  );
}
