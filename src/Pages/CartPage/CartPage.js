import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItemsCard from "./Components/CartItemsCard";
import Icon from "../../Components/Icon";
import { arrowForwardOutline } from "ionicons/icons";
import { useAuth, useCart, useWishList } from "../../Store";
import { database } from "../../FirebaseConfigs/Firesbase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function CartPage() {
  const { t } = useTranslation();

  const { user } = useAuth();
  const { addProductHandler, removeProductHandler } = useCart();

  const [cartProducts, setCartProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  const getAllStorageData = () => {
    const allData = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key !== "i18nextLng") {
        const value = sessionStorage.getItem(key);
        allData[key] = JSON.parse(value);
      }
    }
    return allData;
  };

  useEffect(() => {
    const sessionStorageData = getAllStorageData();
    const {
      products = [],
      productQuantity = 0,
      totalAmount = 0,
    } = sessionStorageData["cartState"] || {};
    setCartProducts(products);
    setCartTotalAmount(totalAmount);
    setCartTotalQuantity(productQuantity);
    const wishlistProduct = sessionStorageData["wishListData"] || [];
    setWishlistProducts(wishlistProduct);
  }, []);

  const wishListQuantity = wishlistProducts.length;
  const userId = user?.uid;

  const CURRENCY = "XAF";
  const FORMAT_MONEY = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      currency: currency,
      style: "currency",
    });
    return formatter.format(amount);
  };

  const cartTotal = FORMAT_MONEY(parseInt(cartTotalAmount), CURRENCY);

  const handleRemoveProducts = (id) => {
    removeProductHandler(id);
    const updatedData = getAllStorageData();
    const { products, productQuantity, totalAmount } =
      updatedData["cartState"] || [];
    setCartProducts(products);
    setCartTotalAmount(totalAmount);
    setCartTotalQuantity(productQuantity);
  };

  const CheckoutHandler = async (userId) => {
    const db = database;
    const ref = collection(db, userId, "/checkout/", "products");

    try {
      await addDoc(ref, {
        totalProducts: cartTotalQuantity,
        totalAmount: cartTotalAmount,
        product: cartProducts,
        timestamp: serverTimestamp(),
      });
      const refId = ref.id;
      alert("Success adding checkout: ", refId);
      window.location.href = "/checkout-form";
    } catch (error) {
      alert("Error adding");
      console.error(error);
      return error;
    }
  };

  const renderCartContent = () => {
    if (user === null) {
      return (
        <div className="mt-8">
          <p className="mb-10  text-xl">{t("cart.noUser")}</p>
          <Link
            className="bg-black text-center text-white py-6 px-14 rounded font-medium text-xl "
            to="/sign-in-&-create-account"
          >
            {t("auth.signInCreate")}
          </Link>
        </div>
      );
    } else if (cartTotalQuantity === 0 && user !== null) {
      return (
        <div className="mt-8">
          <p className="mb-10 text-xl ">{t("cart.emptyBag")}</p>
          <Link
            to="/home"
            className="bg-black text-center text-white py-6 px-14 rounded font-medium text-xl "
          >
            {t("cart.continueShopping")}
          </Link>
        </div>
      );
    } else {
      return (
        <div className="mt-8 mb-16">
          <hr
            className="mx-60 border-gray-500 mb-4"
            style={{ width: "70%", borderWidth: "1" }}
          />
          {cartProducts.map((cart) => (
            <CartItemsCard
              productItems={cart}
              key={cart.id}
              removeItemHandler={() => handleRemoveProducts(cart.id)}
            />
          ))}
          <hr
            className="mx-60 border-gray-500 mt-4"
            style={{ width: "70%", borderWidth: "1" }}
          />

          <div className="mx-auto mt-10 container text-xl  px-10">
            <div className="flex justify-around">
              <div>
                <p className="font-medium">{t("cart.subTotal")}</p>
                <p>{t("cart.checkoutDelivery")}</p>
              </div>
              <div>
                <p className="font-medium">{cartTotal}</p>
              </div>
            </div>
            <div className="grid justify-center">
              <button
                onClick={() => CheckoutHandler(userId)}
                className="mt-10 bg-black text-white px-10 py-2 rounded text-xl "
              >
                {t("cart.checkout")}
              </button>
              <div className="flex mt-8 items-center">
                <span className="mr-10">{t("cart.or")}</span>
                <Link
                  to="/home"
                  className="flex items-center bg-black text-white px-10 py-2 rounded text-xl "
                >
                  <span className="mr-2">{t("cart.continueShopping")}</span>
                  <Icon icon={arrowForwardOutline} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="mx-auto container px-4">
      <div className="flex justify-center px-40 py-8 font-medium  text-lg">
        <div className="border-2 border-r-0 border-black px-8 py-4">
          <p>
            {t("cart.shoppingBag")} <span>({cartTotalQuantity})</span>
          </p>
        </div>
        <div className="border-2 border-black px-8 py-4">
          <p>
            {t("cart.saved")} <span>({wishListQuantity})</span>
          </p>
        </div>
      </div>
      <div className="mx-auto container px-4">{renderCartContent()}</div>
    </div>
  );
}
