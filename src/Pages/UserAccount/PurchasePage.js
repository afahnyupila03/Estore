import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PurchasePage() {
  const PURCHASED_ITEMS = useSelector((state) => state.cart.purchasedItems);

  let purchase;
  if (PURCHASED_ITEMS.length === 0) {
    purchase = (
      <div className="mt-4">
        <p className="mb-4">0 Purchases made.</p>
        <Link to="/home" className="p-2 bg-black text-white">
          Shop now
        </Link>
      </div>
    );
  } else {
    purchase = (
      <div>
        <h1>You have made purchases</h1>
      </div>
    );
  }

  return (
    <Fragment>
      <div>
        <h1 className="text-2xl font-semibold font-mono">Purchases</h1>
      </div>
      <div>{purchase}</div>
    </Fragment>
  );
}
