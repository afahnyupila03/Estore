import React from "react";
import { useQuery } from "react-query";
import { ShopProductsService } from "../../Services/ShopService/ShopService";
import { Link } from "react-router-dom";

const Shop = (props) => {
  const { data, isLoading } = useQuery("shopProducts", () =>
    ShopProductsService()
  );

  return (
    <div>
      <p>This is the shopping page</p>
      {data.map((shopItems, shopIndex) => (
          <div key={shopIndex}>
            <img src={shopItems.image} />
            <p>{shopItems.title}</p>
            <p>{shopItems.price}</p>
            <Link to={`/product-details/${data.id}/${data.title}`}>View</Link>
          </div>
        ))}
    </div>
  );
};

export default Shop;
