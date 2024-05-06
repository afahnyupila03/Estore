import React from "react";
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
  const {
    products,
    totalAmount,
    productQuantity,
    removeProductHandler,
    clearProductHandler,
  } = useCart();

  const { wishListQuantity } = useWishList();
  const userId = user?.uid;

  const CURRENCY = "XAF";
  const FORMAT_MONEY = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      currency: currency,
      style: "currency",
    });
    return formatter.format(amount);
  };

  const cartTotal = FORMAT_MONEY(parseInt(totalAmount), CURRENCY);

  const CheckoutHandler = async (userId) => {
    const db = database;
    const ref = collection(db, userId, "/checkout/", "products");

    try {
      await addDoc(ref, {
        // quantity: product.quantity,
        totalProducts: productQuantity,
        totalAmount: totalAmount,
        product: products,
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

  let content;

  if (user === null) {
    content = (
      <div className="mt-8">
        <p className="mb-10 font-mono text-xl">{t("cart.noUser")}</p>
        <Link
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold text-xl font-mono"
          to="/sign-in-&-create-account"
        >
          {t("auth.signInCreate")}
        </Link>
      </div>
    );
  } else if (products.length === 0 && user !== null) {
    content = (
      <div className="mt-8">
        <p className="mb-10 text-xl font-mono">{t("cart.emptyBag")}</p>
        <Link
          to="/home"
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold text-xl font-mono"
        >
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="mt-8 mb-16">
        <hr
          className="mx-60 border-gray-500 mb-4"
          style={{ width: "70%", borderWidth: "1" }}
        />
        {products.map((cart) => (
          <CartItemsCard
            productItems={cart}
            key={cart.id}
            itemsQuantity={productQuantity}
            removeItemHandler={() => removeProductHandler(cart.id)}
          />
        ))}
        <hr
          className="mx-60 border-gray-500 mt-4"
          style={{ width: "70%", borderWidth: "1" }}
        />

        <div className="mx-auto mt-10 container text-xl font-mono px-10">
          <div className="flex justify-around">
            <div>
              <p className="font-semibold">{t("cart.subTotal")}</p>
              <p>{t("cart.checkoutDelivery")}</p>
            </div>
            <div>
              <p className="font-semibold">{cartTotal}</p>
            </div>
          </div>
          <div className="grid justify-center">
            <button
              onClick={() => CheckoutHandler(userId)}
              className="mt-10 bg-black text-white px-10 py-2 rounded text-xl font-mono"
            >
              {t("cart.checkout")}
            </button>
            <div className="flex mt-8 items-center">
              <span className="mr-10">{t("cart.or")}</span>
              <Link
                to="/home"
                className="flex items-center bg-black text-white px-10 py-2 rounded text-xl font-mono"
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

  return (
    <div className="mx-auto container px-4">
      <div className="flex justify-center px-40 py-8 font-semibold font-mono text-lg">
        <div className="border-2 border-r-0 border-black px-8 py-4">
          <p>
            {t("cart.shoppingBag")} <span>({productQuantity})</span>
          </p>
        </div>
        <div className="border-2 border-black px-8 py-4">
          <p>
            {t("cart.saved")} <span>({wishListQuantity})</span>
          </p>
        </div>
      </div>
      <div className="mx-auto container px-4">{content}</div>
    </div>
  );
}
