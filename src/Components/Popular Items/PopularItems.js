import React from "react";
import { Link } from "react-router-dom";
import { getPopularProductService } from "../../Services/HomeService/HomeService";

const PopularItemsCard = ({ popularData }) => {
  const { name, price, id } = popularData || [];

  const getName = (name) => {
    const MAX_NAME_CHARS = 20;
    if (name.length > MAX_NAME_CHARS) {
      return `${name.slice(0, MAX_NAME_CHARS)}...`;
    }
    return name;
  };

  const handleViewProduct = async () => {
    try {
      const product = await getPopularProductService(id);
      console.log(name, price);
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
        <Link onClick={handleViewProduct}>View</Link>
        {/* <Link to={`/product-details/${id}`}>View Product</Link> */}
      </div>
    </React.StrictMode>
  );
};

export default PopularItemsCard;
