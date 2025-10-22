import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DeviceButton from "../../../../components/device-view/DeviceButton";
import Product from "../page";

type Product = {
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

export default function ProductDetail({ data }: { data: Product }) {
  const imgUrl =
    data.device_images?.length && data.device_images[0].url
      ? `http://3.76.183.255:3030${data.device_images[0].url}`
      : "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png";

  return (
    <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto p-6">
      {/* LEFT - Image (sticky on scroll) */}
      <div className="md:sticky md:top-20 self-start">
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-4">
            <Image
              src={imgUrl}
              alt={data.name}
              width={600}
              height={600}
              className="rounded-xl object-cover h-100 w-full"
            />
          </CardContent>
        </Card>
      </div>

      {/* RIGHT - Product Info */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
            <p className="text-xl font-semibold text-gray-800">
              ${data.base_price}
            </p>
            <p
              className={`text-sm ${
                data.status === "available" ? "text-green-600" : "text-red-500"
              }`}
            >
              {data.status.toUpperCase()}
            </p>
          </div>

          <Separator />

          {/* Specs */}
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <p>
              <span className="font-semibold">Color:</span>{" "}
              {data.details?.color ?? "—"}
            </p>
            <p>
              <span className="font-semibold">Year:</span>{" "}
              {data.details?.year ?? "—"}
            </p>
            <p>
              <span className="font-semibold">CPU:</span>{" "}
              {data.details?.cpu ?? "—"}
            </p>
            <p>
              <span className="font-semibold">RAM:</span>{" "}
              {data.details?.ram ?? "—"}
            </p>
            <p>
              <span className="font-semibold">Storage:</span>{" "}
              {data.details?.storage ?? "—"}
            </p>
            <p>
              <span className="font-semibold">Display:</span>{" "}
              {data.details?.display_size ?? "—"}
            </p>
            <p>
              <span className="font-semibold">Battery Health:</span>{" "}
              {data.details?.battery_health ?? "—"}
            </p>
          </div>

          <Separator />

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {data.details?.description ??
              "No detailed description for this device."}
          </p>

          <DeviceButton product={data as any}/>
        </CardContent>
      </Card>
    </div>
  );
}
