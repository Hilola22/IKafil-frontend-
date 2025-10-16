import { DeviceView } from "../../components/device-view/DeviceView";
import BackTo from "../../components/header/BackTo";
import Hero from "../../components/hero/Hero";

const Home = async() =>{

  const response = await fetch(
    "http://3.76.183.255:3030/api/devices?page=1&limit=10",
    {
      cache: "force-cache",
    }
  );
  const data = await response.json();
    return (
      <main className="bg-white text-gray-900">
        <Hero />
        <DeviceView data={data.data} />
        <BackTo />
      </main>
    );
}

export default Home


