import React from "react";

const FashionItems = ({ fashionData }) => {
  const { name, price } = fashionData || [];

  return (
    <React.Fragment>
      <p>{name}</p>
      <p>{price}</p>
    </React.Fragment>
  );
};

export default FashionItems;
