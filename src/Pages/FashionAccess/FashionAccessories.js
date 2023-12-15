import React from "react";
import { useQuery } from "react-query";
import { getFashionProductsService } from "../../Services/ShopService/ShopService";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import ProductItemCard from "../../Components/ProductItemCard";

const FashionAccessories = () => {
  const {
    data = [],
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery("fashionItems", () => getFashionProductsService());

  let content;

  if (isError) {
    content = (
      <div className="grid mb-20 overflow-hidden">
          <p className="text-2xl mb-4">{error.message}</p>
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
    );
  } else if (isLoading) {
    content = (
      <UseAnimations animation={loading} size={60} />
    );
  } else {
    content = (
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((fashion) => (
          <ProductItemCard productData={fashion} key={fashion.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-lg font-semibold tracking-tight">
            Featured Products
          </h2>

          {content}
        </div>
      </div>
  );
};

export default FashionAccessories;
