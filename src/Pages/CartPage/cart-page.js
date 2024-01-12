import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.products);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [cartCounter, setCartCounter] = React.useState(0);

  let content;

  const cartContent = (
    <div className="mx-auto container px-4">
      <div className="grid">
        <div className="cols-span-2">{content}</div>
        <div className="cols-span-1">{cartCounter}</div>
      </div>
    </div>
  );

  if (cartItems.length > 0) {
    content = <p>Has items</p>;
  } else if (cartItems.length === 0 && userLoggedIn) {
    content = (
      <div>
        <p>Bag is empty. Please sign in to start shopping</p>
        <Link to="/sign-in-&-create-account">Sign in</Link>
      </div>
    );
  } else {
    content = <p>Cart is Empty</p>;
  }

  return (
    <div>
      <div className="mx-auto container px-4">{content}</div>
      <h2 className="flex justify-start uppercase p-4 mt-40">
        you might also like
      </h2>
    </div>
  );
}
