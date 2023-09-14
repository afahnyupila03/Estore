import React from "react";

const PopularItemsCard = ({popularData}) => {

const {name, price} = popularData || []

  return (
    <React.StrictMode>
      <div>
      <p>{name}</p>
      <p>{price}</p>
      </div>
    </React.StrictMode>
  );
};

export default PopularItemsCard;
