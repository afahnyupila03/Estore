import React from "react";
import { IonIcon } from "@ionic/react";
import {
  heartCircleSharp,
  heartDislike,
  heartDislikeOutline,
} from "ionicons/icons";

export default function WishListCardItems({
  addItemHandler,
  removeItemHandler,
  wishListProducts,
  wishListed,
}) {
  const { title, price, discountPercentage, thumbnail } = wishListProducts;

  const CURRENCY = "XAF";
  const FORMAT_MONEY = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      style: "currency",
      currency: currency,
    });

    return formatter.format(amount);
  };

  const CURRENCY_CONVERTER = (priceInUsd) => {
    const exchangeRate = 608.58;
    const convertedPrice = priceInUsd * exchangeRate;
    return convertedPrice;
  };

  const DISCOUNT_PRICE = (discountPercentage, price) => {
    const discount = (discountPercentage / 100) * price;
    const discountedPrice = Math.round(price - discount);
    return discountedPrice;
  };

  const XAF_PRICE = CURRENCY_CONVERTER(price);

  const DISCOUNT = DISCOUNT_PRICE(discountPercentage, XAF_PRICE);

  return (
    <div className="flex font-mono text-xl justify-around">
      <div className="flex justify-evenly gap-x-10 items-center">
        <img src={thumbnail} alt={title} className="h-40 w-40 rounded" />
      </div>
      <div>
        <p>{title}</p>
      </div>
      <div className="grid justify-around">
        <div>
          <p>{FORMAT_MONEY(DISCOUNT, CURRENCY)}</p>
        </div>
        <div>
          <button
            onClick={addItemHandler}
            className=" bg-black text-white px-10 py-2 rounded font-mono text-xl"
            type="button"
          >
            Add to bag
          </button>
          <button
            onClick={removeItemHandler}
            className=" bg-black text-white flex items-center px-10 py-2 rounded font-mono text-xl"
            type="button"
          >
            <IonIcon
              className="mr-2"
              icon={heartDislikeOutline}
              style={{ fontSize: "1.5rem" }}
            />
            Dislike
          </button>
        </div>
      </div>
    </div>
  );
}
