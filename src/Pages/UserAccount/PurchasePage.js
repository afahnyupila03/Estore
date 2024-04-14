import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store";
import { useQuery } from "react-query";
import { PurchaseServices } from "../../Services/AccountServices";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import PurchaseItemsCard from "./Components/CardComponents/PurchaseItemsCard";

export default function PurchasePage() {
  const { user } = useAuth();
  const userId = user?.uid;

  const {
    data = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery(["purchaseData", userId], () => PurchaseServices(userId));
  console.log("purchase-data: ", isLoading && "loading", data.productData);

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
  } else if (isLoading) {
    purchase = (
      <div className="flex justify-center mt-6">
        <UseAnimation animation={loading} size={80} />
      </div>
    );
  } else if (data === null && user !== null) {
    purchase = (
      <div className="mt-4">
        <p className="mb-4">0 Purchases made.</p>
        <Link to="/home" className="p-2 bg-black text-white">
          Shop now
        </Link>
      </div>
    );
  } else if (isError) {
    purchase = (
      <div>
        <p>
          {error}
          <button type="button" onClick={() => refetch()}>
            Try again
          </button>
        </p>
      </div>
    );
  } else {
    purchase = (
      <div>
        <h1>You have made purchases</h1>
        {data.map((purchase) => {
          const {
            id,
            productData,
            productQuantity,
            tax,
            checkoutTotal,
            shippingPrice,
            purchaseId,
            email,
            displayName,
            address,
            city,
            state,
            tel,
            cardNumber,
            timeStamp,
          } = purchase;
          console.log(
            "Product-data: NEW : ",
            productData.map((item, index) => (
              <div key={item.id}>
                <p>Title: {item.title}</p>
                <p>Brand: {item.brand}</p>
                <p>Category: {item.category}</p>
                <p>Price: {item.price}</p>
                {/* Add more properties as needed */}
              </div>
            ))
          );

          return (
            <div key={id}>
              <p>Purchase id : {purchaseId}</p>
              <p>Tax: {parseInt(tax)}</p>
              <p>Product-quantity: {productQuantity}</p>
              <p>Shipping price: {shippingPrice}</p>
              <p>Total {checkoutTotal}</p>
              <p>Email: {email}</p>
              <p>Name: {displayName}</p>
              <p>Address: {address}</p>
              <p>City: {city}</p>
              <p>State: {state}</p>
              <p>Tel: {tel}</p>
              <p>Card number: {cardNumber}</p>
              <h1>NEW TRY</h1>
              {productData.map((item, index) => (
                <div key={index}>
                  {Object.keys(item).map((key) => (
                    <div key={key}>
                      <p>Title: {item[key].title}</p>
                      <p>Brand: {item[key].brand}</p>
                      <p>Category: {item[key].category}</p>
                      <p>Price: {item[key].price}</p>
                      {/* Add more properties as needed */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
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
