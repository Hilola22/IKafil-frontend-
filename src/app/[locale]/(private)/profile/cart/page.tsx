import { memo } from "react";
import Carts from "../../../../../components/cart-view/Carts";

const ProfileCart = () => {
  return (
    <div>
      <Carts />
    </div>
  );
};

export default memo(ProfileCart);
