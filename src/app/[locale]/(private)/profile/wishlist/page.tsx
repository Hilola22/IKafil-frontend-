import { memo } from "react";
import WishlistView from "../../../../../components/wishlist-view/WishlistView";

const ProfileWishlist = () => {
  return (
    <div>
      <WishlistView />
    </div>
  );
};

export default memo(ProfileWishlist);
