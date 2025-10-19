import { DevicePagination } from "../../../components/device-pagination/DevicePagination";
import { DeviceView } from "../../../components/device-view/DeviceView";

interface Props {
  searchParams: { page?: string; limit?: string };
}

const Product = async ({ searchParams }: Props) => {
  const page = Number(searchParams.page) || 1;

  const response = await fetch(
    `http://localhost:3030/api/devices?limit=8&page=${page}`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();

  return (
    <div>
      {data.length === 0 ? (
        <div>No data sorry</div>
      ) : (
        <div>
          <DeviceView data={data.data} />
          <DevicePagination page={data.page} totalPages={data.totalPages} />
          <br />
        </div>
      )}
    </div>
  );
};

export default Product;
