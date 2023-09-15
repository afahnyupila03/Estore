import React from "react";
import FashionItems from "../../Components/Fashion/fashion-item";
import { useQuery } from "react-query";
import { getFashionProductsService } from "../../Services/ShopService/ShopService";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const FashionAccessories = () => {
  const { data: fashionProducts = [] } = useQuery("fashionItems", () =>
    getFashionProductsService()
  );

  return (
    <React.Fragment>
    <h3>Fashion product list</h3>
      {fashionProducts.map((fashion) => (
        <FashionItems key={fashion.id} fashionData={fashion} />
      ))}
    </React.Fragment>
  );
};

export default FashionAccessories;
