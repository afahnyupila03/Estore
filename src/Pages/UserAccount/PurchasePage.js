import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store";

export default function PurchasePage() {
  const purchaseItems = 0;

  const { user } = useAuth();

  let purchase;

  if (user === null) {
    purchase = (
      <div className="mt-8">
        <p className="mb-10 font-mono text-xl">
          No user found. Please sign in to user account / create user account to
          make purchases.{" "}
        </p>
        <Link
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold font-mono"
          to="/sign-in-&-create-account"
        >
          Sign in / Create Account
        </Link>
      </div>
    );
  } else if (purchaseItems === 0 && user !== null) {
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
