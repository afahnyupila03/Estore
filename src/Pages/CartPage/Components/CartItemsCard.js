import React from "react";

export default function CartItemsCard({
  itemQuantity,
  removeItemHandler,
  productItems,
}) {
  const { image, title, discountPrice, price } = productItems;

  const CURRENCY = "XAF";
  const formatMoney = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      style: "currency",
      currency: currency,
    });

    return formatter.format(amount);
  };

  const amount = formatMoney(price, CURRENCY);

  return (
    <div className="flex font-mono text-xl justify-around">
      <div className="flex justify-evenly gap-x-10 items-center">
        <div>
          <img src={image} alt={title} className="h-40 w-40" />
        </div>
        <div>
          <p>{title}</p>

          <input
            className="w-10 font-mono text-center"
            value={1}
            type="number"
          />
        </div>
      </div>

      <div className="grid justify-around">
        <div>
          <p>{Number(amount)}</p>
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
