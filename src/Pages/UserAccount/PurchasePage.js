import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function PurchasePage() {
  const purchaseItems = 0;
  let purchase;
  if (purchaseItems === 0) {
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
        <h1>Purchases</h1>
      </div>
      <div>{purchase}</div>
    </Fragment>
  );
}
