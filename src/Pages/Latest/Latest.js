import { getLatestProducts } from "../../Services/HomeService";
import React, { Fragment } from "react";
import { useQuery } from "react-query";
import ProductItemCard from "../../Components/ProductItemCard";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";

const Latest = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("latestProducts", () => getLatestProducts());

  let latestProducts;

  if (isLoading) {
    latestProducts = (
      <div className="flex justify-center">
        <p>{error}</p>
        <UseAnimation
          animation={loading}
          className="text-red-5000"
          color="red"
          size={100}
        />
      </div>
    );
  } else if (isError) {
    latestProducts = (
      <div className="flex justify-center">
        <p>{error}</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  } else {
    latestProducts = (
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((products) => (
          <ProductItemCard productData={products} key={products.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {latestProducts}
      </div>
    </div>
  );
};

export default Latest;
