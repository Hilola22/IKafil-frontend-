import Link from "next/link";
import dynamic from "next/dynamic";
import { DeviceView } from "../../components/device-view/DeviceView";

const BackTo = dynamic(() => import("../../components/BackTo"), {
  loading: () => <p className="loader">Loading...</p>,
});

const Hero = dynamic(() => import("../../components/hero/Hero"), {
  loading: () => <p className="loader">Loading...</p>,
});

const CategoryView = dynamic(
  () => import("./components/categories/CategoryView"),
  {
    loading: () => <p className="loader">Loading...</p>,
  }
);

const Home = async () => {
  const response = await fetch("https://api.ikafil.uz/api/devices?limit=8", {
    cache: "no-cache",
  });
  const data = await response.json();
  return (
    <main className="bg-white text-gray-900">
      <Hero />
      <CategoryView />
      <div>
        <div className="container mx-auto flex justify-between items-center py-10  px-4">
          <h2 className="text-3xl font-bold">Top products</h2>
          <Link
            href={"/products"}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            View all products
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        <DeviceView data={data?.data} />
      </div>
      <BackTo />
    </main>
  );
};

export default Home;
