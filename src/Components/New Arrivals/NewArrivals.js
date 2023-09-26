import React from "react";
import { Link } from "react-router-dom";

const NewArrivals = ({ arrivalData }) => {
  const { name, price } = arrivalData || [];

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
        <Link>View Product</Link>
        <button>Like Product</button>
      </div>
    </React.StrictMode>
  );
};

export default NewArrivals;
