import { DevicePagination } from "../../../components/device-pagination/DevicePagination";
import { FilterCaller } from "../../../components/device-view/FilterCaller";

interface Props {
  searchParams: { page?: string; limit?: string };
}

const Product = async ({ searchParams }: Props) => {
  const page = Number(searchParams.page) || 1;

  const response = await fetch(
    `https://api.ikafil.uz/api/devices?limit=16&page=${page}`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();

  return (
    <div>
      {data.length === 0 ? (
        <div>
          <div>No data sorry</div>
          <br />
          <br />
        </div>
      ) : (
        <FilterCaller data={data.data} pagination={data} />
      )}
    </div>
  );
};

export default Product;
