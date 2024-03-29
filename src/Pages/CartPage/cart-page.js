import React from "react";
import { Link } from "react-router-dom";
import CartItemsCard from "./Components/CartItemsCard";
import Icon from "../../Components/Icon";
import { arrowForwardOutline } from "ionicons/icons";
import { useAuth, useCart, useWishList } from "../../Store";

export default function CartPage() {
  const { user } = useAuth();
  const {
    products,
    totalAmount,
    productQuantity,
    removeProductHandler,
    clearProductHandler,
  } = useCart();

  const { wishListQuantity } = useWishList();

  console.log("reducer total-amount: ", totalAmount);
  console.log("reducer product quantity :", productQuantity);

  const CURRENCY = "XAF";
  const FORMAT_MONEY = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      currency: currency,
      style: "currency",
    });
    return formatter.format(amount);
  };

  const cartTotal = FORMAT_MONEY(parseInt(totalAmount), CURRENCY);

  let content;

  if (user === null) {
    content = (
      <div className="mt-8">
        <p className="mb-10 font-mono text-xl">
          No user found. Please sign in / create account to see products in bag.
        </p>
        <Link
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold text-xl font-mono"
          to="/sign-in-&-create-account"
        >
          Sign in / Create Account
        </Link>
      </div>
    );
  } else if (products.length === 0 && user !== null) {
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
              <p className="font-semibold">Subtotal</p>
              <p>Delivery and taxes will be calculated at checkout</p>
            </div>
            <div>
              <p className="font-semibold">
                {cartTotal}
              </p>
              <button
                onClick={() => clearProductHandler()}
                className="bg-red-500 text-white px-10 py-2 rounded text-xl font-mono"
              >
                Empty Cart
              </button>
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
            Shopping Bag <span>({productQuantity})</span>
          </p>
        </div>
        <div className="border-2 border-black px-8 py-4">
          <p>
            Saved for later <span>({wishListQuantity})</span>
          </p>
        </div>
      </div>
      <div className="mx-auto container px-4">{content}</div>
    </div>
  );
}
