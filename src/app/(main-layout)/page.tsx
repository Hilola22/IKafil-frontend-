import Link from "next/link";
import { DeviceView } from "../../components/device-view/DeviceView";
import BackTo from "../../components/header/BackTo";
import Hero from "../../components/hero/Hero";
import CategoryView from "./components/categories/CategoryView";

const Home = async () => {
  const response = await fetch(
    "http://3.76.183.255:3030/api/devices?page=1&limit=8",
    {
      cache: "force-cache",
    }
  );
  const data = await response.json();
  return (
    <main className="bg-white text-gray-900">
      <Hero />
      <CategoryView />
      <div>
        <div className="container mx-auto flex justify-between items-center py-10 px-4">
          <h2 className="text-3xl font-bold">Top products</h2>
          <Link
            href={"/products"}
            className="hover:text-indigo-500 relative inline-block group transition-all duration-300"
          >
            View all products
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        <DeviceView data={data.data} />
      </div>
      <BackTo />
    </main>
  );
};

export default Home;
