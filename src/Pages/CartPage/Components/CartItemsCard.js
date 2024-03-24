import React from "react";

export default function CartItemsCard({
  itemsQuantity,
  removeItemHandler,
  productItems,
}) {
  const { thumbnail, title, discountPercentage, price, quantity } =
    productItems;

  const CURRENCY = "XAF";
  const formatMoney = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      style: "currency",
      currency: currency,
    });

    return formatter.format(amount);
  };

  const CURRENCY_CONVERTER = (priceInUSD) => {
    const exchangeRate = 608.58;
    const convertedPrice = Math.round(priceInUSD * exchangeRate);
    return convertedPrice;
  };

  const XAF_PRICE = CURRENCY_CONVERTER(price);

  const DISCOUNT_PRICE = (discountPercentage, price) => {
    const discount = (discountPercentage / 100) * price;
    const discountedPrice = Math.round(price - discount);
    return discountedPrice;
  };

  const originalPrice = XAF_PRICE;
  const percentage = discountPercentage;
  const FINAL_PRICE = DISCOUNT_PRICE(percentage, originalPrice);

  const SELLING_PRICE = formatMoney(FINAL_PRICE, CURRENCY);

  const productQuantity = quantity === 1 ? quantity : quantity - 1;
  const totalPriceByQuantity = FINAL_PRICE * parseInt(productQuantity);

  return (
    <div className="flex font-mono text-xl justify-around">
      <div className="flex justify-evenly gap-x-10 items-center">
        <div>
          <img src={thumbnail} alt={title} className="h-40 w-40 rounded" />
        </div>
        <div>
          <p>{title}</p>
          <p>Quantity: {quantity === 1 ? quantity : quantity - 1}</p>
        </div>
      </div>

      <div className="grid justify-around">
        <div>
          <p>Product price: {price}</p>
          <p>{SELLING_PRICE}</p>

          <p>Sum of product and quantity = {totalPriceByQuantity}</p>
        </div>
        <div>
          <button
            onClick={removeItemHandler}
            className=" bg-black text-white px-10 py-2 rounded font-mono text-xl"
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
