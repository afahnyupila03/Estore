import React from "react";
import {useQuery} from 'react-query'
import { getFashionProductsService } from "../../Services/ShopService/ShopService";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import ProductItemCard from "../../Components/ProductItemCard";

const FashionAccessories = () => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery("fashionItems", () =>
    getFashionProductsService()
  );

  let content;

  if (error) {
    content = (
      <React.Fragment>
        <div className="grid mb-20 overflow-hidden">
          <p className="text-2xl mb-4">{error}</p>
          <button
            onClick={() => refetch()}
            className="
                border-red-500 border-2 rounded-full
                p-2 text-lg font-bold hover:bg-red-500
                hover:text-white transition:ease-in-out
                duration-800
                "
          >
            Try again
          </button>
        </div>
      </React.Fragment>
    );
  } else if (isLoading) {
    content = (
      <React.Fragment>
        <UseAnimations 
          animation={loading}
          size={60}
        />
      </React.Fragment>
    );
  } else {
    content = data.map((fashion) => (
      <ProductItemCard 
        productData={fashion}
        key={fashion.id}
      />
    ));
  }

  return (
    <React.Fragment>
      <div className="mt-40 container">
        <div className="font-bold text-red-500 flex justify-center">
          {content}
        </div>
        <div className="grid grid-cols-3">{content}</div>
      </div>
    </React.Fragment>
  );
};

export default FashionAccessories;
