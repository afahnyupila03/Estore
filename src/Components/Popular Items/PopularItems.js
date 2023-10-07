import React from "react";
import { Link } from "react-router-dom";

const PopularItemsCard = ({ popularData }) => {
  const { name, price, id } = popularData || [];

  const getName = (name) => {
    const MAX_NAME_CHARS = 20;
    if (name.length > MAX_NAME_CHARS) {
      return `${name.slice(0, MAX_NAME_CHARS)}...`;
    }
    return name;
  };

  return (
    <React.StrictMode>
      <div>
        <p>{getName(name)}</p>
        <p>{price}</p>
        <Link to={`product-details/${name}`}>quick view</Link>
      </div>
    </React.StrictMode>
  );
};

export default PopularItemsCard;