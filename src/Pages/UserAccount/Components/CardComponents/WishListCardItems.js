import React from "react";
import { IonIcon } from "@ionic/react";
import Icon from "../../../../Components/Icon";
import {
  heartDislikeOutline,
  bagHandleOutline,
  star,
  starHalfOutline,
} from "ionicons/icons";

function PRODUCT_RATING(stars) {
  const fullStars = Math.floor(stars); // Get the integer part of the rating
  const halfStar = stars - fullStars >= 0.5; // Check if there is a half star

  let starsArray = [];

  for (let i = 0; i < fullStars; i++) {
    starsArray.push(<Icon icon={star} key={i} />);
  }

  if (halfStar) {
    starsArray.push(<Icon icon={starHalfOutline} key="half" />); // Assuming there's a half-star icon available
  }

  const remainingStars = 5 - starsArray.length; // Calculate the remaining empty stars

  for (let i = 0; i < remainingStars; i++) {
    starsArray.push(<Icon icon={star} key={`empty-${i}`} />);
  }

  return <div>{starsArray}</div>;
}

export default function WishListCardItems({
  addItemHandler,
  removeItemHandler,
  wishListProducts,
}) {
  const { title, price, discountPercentage, thumbnail, description, rating } =
    wishListProducts;

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
    <div className="flex gap-x-10 gap-y-2 items-center font-mono text-xl justify-between">
      <div className="aspect-h-1 aspect-w-1 w-40 overflow-hidden rounded-md bg-red-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
        <img
          src={thumbnail}
          alt={title}
          className="h-40 w-40 fixed object-cover object-center lg:h-40 lg:w-40"
        />
      </div>

      <div className="p-4">
        <>{PRODUCT_RATING(rating)}</>
        <p>{title}</p>
        <p>{description}</p>
        <p>{FORMAT_MONEY(DISCOUNT, CURRENCY)}</p>
      </div>

      <div>
        <button
          onClick={addItemHandler}
          style={{ paddingLeft: "1rem", paddingRight: "1rem", width: "11.8rem" }}
          className=" bg-black text-white text-center flex items-center w-58 py-2 rounded font-mono text-xl mb-2"
          type="button"
        >
          <IonIcon
            style={{ fontSize: "1.5rem" }}
            icon={bagHandleOutline}
            className="mr-2"
          />
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
  );
}
