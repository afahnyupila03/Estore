import React from "react";
import { IonIcon } from "@ionic/react";
import { shareOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { useAuth, useCart, useWishList } from "../../Store";
import WishListCardItems from "./Components/CardComponents/WishListCardItems";
import { useTranslation } from "react-i18next";

export default function WishlistPage() {
  const { t } = useTranslation();

  const {
    wishListProducts,
    wishListQuantity,
    wishListed,
    removeProductFromWishList,
    clearWishListHandler,
  } = useWishList();
  const { user } = useAuth();
  const { addProductHandler } = useCart();

  let wishlist;

  if (user === null) {
    wishlist = (
      <div className="mt-8">
        <p className="mb-10 font-mono text-xl">
          {t("wishlist.wishlistAuthMessage")}
        </p>
        <Link
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold font-mono"
          to="/sign-in-&-create-account"
        >
          {t("auth.signInCreate")}
        </Link>
      </div>
    );
  } else if (user !== null && wishListProducts.length === 0) {
    wishlist = (
      <div className="mt-8">
        <p className="mb-10 text-xl font-mono">{t("wishlist.emptyWishlist")}</p>
        <Link
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold font-mono"
          to="/home"
        >
          {t("wishlist.visitShop")}
        </Link>
      </div>
    );
  } else {
    wishlist = (
      <div className="mt-8 gap-y-2 mb-4">
        {wishListProducts.map((wishListProducts) => (
          <WishListCardItems
            key={wishListProducts.id}
            removeItemHandler={() =>
              removeProductFromWishList(wishListProducts.id)
            }
            addItemHandler={() => addProductHandler(wishListProducts)}
            wishListProducts={wishListProducts}
            wishListed={wishListed}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold font-mono">
          {t("auth.wishList")}
          <span>({wishListQuantity})</span>
        </h1>
        {user !== null && (
          <div className="flex items-center">
            <IonIcon icon={shareOutline} className="mr-2" />
            <p>{t("wishlist.share")}</p>
          </div>
        )}
      </div>
      {wishlist}
    </div>
  );
}
