import React from "react";

export default function PurchaseItemsCard({ purchaseData }) {
  console.log("purchase-data compo: ", purchaseData);
  const { title, category, brand } = purchaseData;
  return (
    <div>
      <p>title: {title}</p>
      <p>category: {category}</p>
      <p>Brand: {brand}</p>
    </div>
  );
}
