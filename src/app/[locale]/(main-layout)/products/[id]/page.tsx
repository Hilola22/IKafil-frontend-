import ProductDetail from "./product-detail";

const baseApi = process.env.BASE_URL + "/api/devices";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await fetch(`${baseApi}/${id}`, { cache: "no-store" });
    const data = await res.json();

    const baseStatic = process.env.BASE_URL?.replace("/api", "");

    return {
      title: `${data.name} | iKafil`,
      description: data.details?.description ?? "View detailed specifications.",
      openGraph: {
        title: data.name,
        description: data.details?.description,
        images:
          data.device_images?.length > 0
            ? [
                {
                  url: `${baseStatic}${data.device_images[0].url}`,
                  alt: data.name,
                },
              ]
            : [],
      },
    };
  } catch {
    return {
      title: "Product Detail | iKafil",
      description: "View product specifications and details.",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${baseApi}/${id}`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return <ProductDetail data={data} />;
}
