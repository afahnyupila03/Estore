import React from "react";
import { Link } from "react-router-dom";

const NewArrivals = ({ arrivalData }) => {
  const { name, price, id } = arrivalData || [];

  const getName = (name) => {
    const MAX_NAME_CHARS = 20;
    if (name.length > MAX_NAME_CHARS) {
      return `${name.slice(0, MAX_NAME_CHARS)}...`;
    }
    return name;
  };

  return (
    <div>
      <p>{getName(name)}</p>
      <p>{price}</p>
      <Link to={`product-details/${name}`}>quick view</Link>
      <button>Like Product</button>
    </div>
  );
};

export default NewArrivals;