import React from "react";
import { Link } from "react-router-dom";
import { getArrivalProductService } from "../../Services/HomeService/HomeService";

const NewArrivals = ({ arrivalData }) => {
  const { name, price, id } = arrivalData || [];

  const getName = (name) => {
    const MAX_NAME_CHARS = 20;
    if (name.length > MAX_NAME_CHARS) {
      return `${name.slice(0, MAX_NAME_CHARS)}...`;
    }
    return name;
  };

  const handleViewProduct = async () => {
    try {
      const product = await getArrivalProductService(id);
      console.log(
        "Product name:",
        product.name,
        "Product Price",
        product.price
      );
      window.location.href = `product-details/${id}`;
    } catch (err) {
      console.log("Failed to view product:", err);
    }
  };

  return (
    <React.StrictMode>
      <div>
        <p>{getName(name)}</p>
        <p>{price}</p>
        <Link onClick={handleViewProduct}>View Product</Link>
        <button>Like Product</button>
      </div>
    </React.StrictMode>
  );
};

export default NewArrivals;
