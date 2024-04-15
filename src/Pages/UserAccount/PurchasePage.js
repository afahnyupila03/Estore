import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store";
import { useQuery } from "react-query";
import { PurchaseServices } from "../../Services/AccountServices";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import Divider from "../../Components/Divider";

const TABLE_STYLES = {
  table: {
    borderWidth: ".002rem",
    borderColor: "black",
    borderRadius: "20rem",
    marginTop: "1rem",
  },
  purchaseInfo: {
    paddingTop: "3rem",
    paddingBottom: "10px",
  },
};

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

  const CURRENCY = "XAF";
  const FORMAT_MONEY = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      currency: currency,
      style: "currency",
    });
    return formatter.format(amount);
  };

  function CONVERT_CURRENCY(priceInUSD) {
    const exchangeRate = 608.58;
    const convertedPrice = Math.round(priceInUSD * exchangeRate);
    const discount = convertedPrice;
    return discount;
  }

  function DISCOUNT_PRICE(discountPercentage, price) {
    const discount = (discountPercentage / 100) * price;
    const discountedPrice = Math.round(price - discount);
    return discountedPrice;
  }

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
        {data.length > 3
          ? data.slice(-2).map((purchase) => {
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
                timeOfOrder,
                dayOfOrder,
              } = purchase;

              return (
                // <div key={id}>
                <table
                  key={id}
                  // style={TABLE_STYLES.table}
                  className="rounded-lg text-center w-full border-2 border-black"
                >
                  <tr
                    style={TABLE_STYLES.purchaseInfo}
                    className="bg-gray-300 p-8 text-center"
                  >
                    <th>Date placed</th>
                    <th>Invoice N°</th>
                    <th>Tax</th>
                    <th>Shipping</th>
                    <th>Total amount</th>
                  </tr>
                  <tr>
                    <td>
                      {dayOfOrder} {timeOfOrder}
                    </td>
                    <td>{purchaseId}</td>
                    <td className="text-center">
                      {FORMAT_MONEY(parseInt(tax), CURRENCY)}
                    </td>
                    <td className="text-center">
                      {FORMAT_MONEY(parseInt(shippingPrice), CURRENCY)}
                    </td>
                    <td className="text-center">
                      {FORMAT_MONEY(parseInt(checkoutTotal), CURRENCY)}
                    </td>
                  </tr>
                  <tr className="bg-gray-300">
                    <th>Product</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Info</th>
                  </tr>
                  {productData.map((item) =>
                    Object.keys(item).map((key) => (
                      <tr key={key}>
                        <td>
                          {getName(item[key].title)} x {item[key].quantity}
                        </td>
                        <td className="text-center">{item[key].brand}</td>
                        <td className="text-center">
                          {FORMAT_MONEY(item[key].price, CURRENCY)}
                        </td>
                        <td className="text-center">En-route</td>
                        <td className="text-center">View</td>
                      </tr>
                    ))
                  )}
                  <tr className="bg-gray-300 text-center">
                    <th>User Infor</th>
                    <th>Delivery Info</th>
                    <th>Payment Info</th>
                    <th>Prod Quant </th>
                    <th>INVOICE</th>
                  </tr>
                  <tr>
                    <td>Email: {email}</td>
                    <td>
                      {city}, {state}
                    </td>
                    <td>ends with ({HIDE_CARD_NUMBER(cardNumber)})</td>
                    <td className="text-center">{productQuantity}</td>

                    <td className="text-center">VIEW INVOICE</td>
                  </tr>
                  <tr>
                    <td>Name: {displayName}</td>
                    <td>{address}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Tel: {tel}</td>
                  </tr>
                </table>
                // </div>
              );
            })
          : data.map((purchase) => {
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
                timeOfOrder,
                dayOfOrder,
              } = purchase;

              return (
                <div className="border-1 border-black rounded-lg" key={id}>
                  <table
                    key={id}
                    className="rounded-lg w-full border-2 border-black"
                  >
                    <tr
                      style={TABLE_STYLES.purchaseInfo}
                      className="bg-gray-300 p-8 text-center"
                    >
                      <th>Date placed</th>
                      <th>Invoice N°</th>
                      <th>Tax</th>
                      <th>Shipping</th>
                      <th>Total amount</th>
                    </tr>
                    <tr>
                      <td>
                        {dayOfOrder} {timeOfOrder}
                      </td>
                      <td>{purchaseId}</td>
                      <td className="text-center">
                        {FORMAT_MONEY(parseInt(tax), CURRENCY)}
                      </td>
                      <td className="text-center">
                        {FORMAT_MONEY(parseInt(shippingPrice), CURRENCY)}
                      </td>
                      <td className="text-center">
                        {FORMAT_MONEY(parseInt(checkoutTotal), CURRENCY)}
                      </td>
                    </tr>
                    <tr className="bg-gray-300">
                      <th>Product</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Info</th>
                    </tr>
                    {productData.map((item) =>
                      Object.keys(item).map((key) => (
                        <tr key={key}>
                          <td>
                            {getName(item[key].title)} x {item[key].quantity}
                          </td>
                          <td className="text-center">{item[key].brand}</td>
                          <td className="text-center">
                            {FORMAT_MONEY(
                              DISCOUNT_PRICE(
                                item[key].discountPercentage,
                                CONVERT_CURRENCY(item[key].price)
                              ),
                              CURRENCY
                            )}
                          </td>
                          <td className="text-center">En-route...</td>
                          <td className="text-center text-gray-800">View</td>
                        </tr>
                      ))
                    )}
                    <tr className="bg-gray-300 text-center">
                      <th>User Infor</th>
                      <th>Delivery Info</th>
                      <th>Payment Info</th>
                      <th>Prod Quant </th>
                      <th>INVOICE</th>
                    </tr>
                    <tr>
                      <td>{email}</td>
                      <td>
                        {city}, {state}
                      </td>
                      <td>ends with ({HIDE_CARD_NUMBER(cardNumber)})</td>
                      <td className="text-center">{productQuantity}</td>
                      <td className="text-center">
                        <Link
                          target="_blank"
                          className="text-gray-800"
                          to={`/purchase/${purchaseId}`}
                        >
                          View invoice
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>{displayName}</td>
                      <td>{address}</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td> {tel}</td>
                    </tr>
                  </table>
                </div>
              );
            })}
      </div>
    );
  }

  return (
    <Fragment>
      <div>
        <h1 className="text-2xl font-semibold font-mono">
          Purchases <span>({data.length})</span>
        </h1>
      </div>
      <div className="mt-2">{purchase}</div>
    </Fragment>
  );
}

function HIDE_CARD_NUMBER(cardNumber) {
  if (cardNumber.length === 16) {
    const hiddenDigits = cardNumber.substring(12);
    return hiddenDigits;
  } else {
    return "Invalid card number";
  }
}

const getName = (title) => {
  const MAX_TITLE_CHARS = 20;
  if (title.length > MAX_TITLE_CHARS) {
    return `${title.slice(0, MAX_TITLE_CHARS)}...`;
  }
  return title;
};
