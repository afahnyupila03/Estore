import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfigs/Firesbase";

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItemsCard from "./Components/CartItemsCard";
import Icon from "../../Components/Icon";
import { arrowForwardOutline } from "ionicons/icons";
import { CartContext } from "../../Store/Context/CartContext";

export default function CartPage() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const cartCtx = useContext(CartContext);

  const CURRENCY = "XAF";
  const formatMoney = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      style: "currency",
      currency: currency,
    });

    return formatter.format(amount);
  };

  const totalAmount = formatMoney(cartCtx.totalAmount, CURRENCY);

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(user);
      } else {
        setUserLoggedIn(null);
      }
    });
    return () => {
      authState();
    };
  }, []);

  let content;

  if (cartCtx.products.length === 0 && userLoggedIn === null) {
    content = (
      <div className="mt-8">
        <p className="mb-10 font-mono text-xl">
          Bag is empty. Please sign in to start shopping
        </p>
        <Link
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold text-xl font-mono"
          to="/sign-in-&-create-account"
        >
          Sign in
        </Link>
      </div>
    );
  } else if (cartCtx.products.length === 0 && userLoggedIn !== null) {
    content = (
      <div className="mt-8">
        <p className="mb-10 text-xl font-mono">Your bag is empty</p>
        <Link
          to="/home"
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold text-xl font-mono"
        >
          Continue Shopping
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
        {cartCtx.products.map((cart) => (
          <CartItemsCard
            productItems={cart}
            key={cart.id}
            itemQuantity={1}
            removeItemHandler={cartCtx.removeProductHandler}
          />
        ))}
        <hr
          className="mx-60 border-gray-500 mt-4"
          style={{ width: "70%", borderWidth: "1" }}
        />

        <div className="mx-auto mt-10 container text-xl font-mono px-10">
          <div className="flex justify-around">
            <div>
              <p className="font-semibold">Subtotal</p>
              <p>Delivery and taxes will be calculated at checkout</p>
            </div>
            <div>
              <p className="font-semibold">{Number(totalAmount)}</p>
            </div>
          </div>
          <div className="grid justify-center">
            <button className="mt-10 bg-black text-white px-10 py-2 rounded text-xl font-mono">
              Checkout
            </button>
            <div className="flex mt-8 items-center">
              <span className="mr-10">or</span>
              <Link
                to="/home"
                className="flex items-center bg-black text-white px-10 py-2 rounded text-xl font-mono"
              >
                <span className="mr-2">Continue Shopping</span>
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
            Shopping Bag <span>({cartCtx.products.length})</span>
          </p>
        </div>
        <div className="border-2 border-black px-8 py-4">
          <p>
            Saved for later <span>(0)</span>
          </p>
        </div>
      </div>
      <div className="mx-auto container px-4">{content}</div>
    </div>
  );
}
