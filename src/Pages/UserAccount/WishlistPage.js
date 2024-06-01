import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { shareOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { useAuth, useCart, useWishList } from "../../Store";
import WishListCardItems from "./Components/CardComponents/WishListCardItems";
import { remove } from "firebase/database";
import { useTranslation } from "react-i18next";

export default function WishlistPage() {
  const { removeProductFromWishList } = useWishList();
  const { t } = useTranslation();

  const { user } = useAuth();
  const { addProductHandler } = useCart();

  const [wishListProducts, setWishListProducts] = useState([]);

  const handleDislikeWishListedProducts = (id) => {
    removeProductFromWishList(id);
    setWishListProducts((prevProducts) =>
      prevProducts.filter((products) => products.id !== id)
    );

    const storedWishListData =
      JSON.parse(sessionStorage.getItem("wishListData")) || [];
    const updatedWishListData = storedWishListData.filter(
      (product) => product.id !== id
    );
    sessionStorage.setItem("wishListData", JSON.stringify(updatedWishListData));
  };

  const getAllLocalStorageData = () => {
    const allData = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      // Exclude the language key from the retrieved data
      if (key !== "i18nextLng") {
        const value = sessionStorage.getItem(key);
        allData[key] = JSON.parse(value);
      }
    }
    return allData;
  };

  useEffect(() => {
    const sessionStorageData = getAllLocalStorageData();
    const products = sessionStorageData["wishListData"] || [];
    setWishListProducts(products);
    setWishListQuantity(products.length);
  }, []);

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
              handleDislikeWishListedProducts(wishListProducts.id)
            }
            addItemHandler={() => addProductHandler(wishListProducts)}
            wishListProducts={wishListProducts}
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
          <span>({wishListProducts.length})</span>
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
