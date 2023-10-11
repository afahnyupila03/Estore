import React from "react";
import { useQuery } from "react-query";
import { getMenAccessoriesService } from "../../Services/ShopService/ShopService";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import ProductItemCard from "../../Components/ProductItemCard";

export default function ManAccessories() {
  const {
    data = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery("menProducts", () => getMenAccessoriesService());

  let menProductItems;

  if (isLoading) {
    menProductItems = <UseAnimations animation={loading} />;
  } else if (isError) {
    menProductItems = (
      <div>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>
          Something went wrong, please try again
        </button>
      </div>
    );
  } else {
    menProductItems = (
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((menProducts) => (
          <ProductItemCard productData={menProducts} key={menProducts.id} />
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="mx-auto mx-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {menProductItems}
        </div>
      </div>
    </React.Fragment>
  );
}
