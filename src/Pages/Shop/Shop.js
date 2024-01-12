import React from "react";
import { useQuery } from "react-query";
import UseAnimation from "../../Components/Loader"
import loading from "react-useanimations/lib/loading"
import { ShopProductsService } from "../../Services/ShopService";
import { Link } from "react-router-dom";
import ProductItemCard from "../../Components/ProductItemCard";

const Shop = (props) => {
  const { data = {}, isLoading, isError, error, refetch } = useQuery("shopProducts", () =>
    ShopProductsService()
  );
  console.log(data)

  let shopProducts;

  if(isLoading) {
    shopProducts = (
      <UseAnimation animation={loading} size={60} />
    )
  } else if(isError) {
    shopProducts = (
      <div>
      <p>{error}</p>
      <button onClick={() => refetch()}>Try again</button>
    </div>
    )
  } else {
    shopProducts = (
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((shopItems) => (
          <ProductItemCard 
          productData= {shopItems} key={shopItems.id}/>
        ))}
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {shopProducts}
      </div>
    </React.Fragment>
  );
};

export default Shop;
