import ProductDetail from "./product-detail";

const API_BASE = "http://3.76.183.255:3030/api/devices";

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${API_BASE}/${params.id}`, { cache: "no-store" });
    const data = await res.json();

    return {
      title: `${data.name} | Macbro`,
      description: data.details?.description ?? "View detailed specifications.",
      openGraph: {
        title: data.name,
        description: data.details?.description,
        images:
          data.device_images?.length > 0
            ? [
                {
                  url: `http://3.76.183.255:3030${data.device_images[0].url}`,
                  alt: data.name,
                },
              ]
            : [],
      },
    };
  } catch {
    return {
      title: "Product Detail | Macbro",
      description: "View product specifications and details.",
    };
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`${API_BASE}/${params.id}`, { cache: "no-store" });
  const data = await res.json();
  return <ProductDetail data={data} />;
}
