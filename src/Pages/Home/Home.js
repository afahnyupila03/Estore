import React from "react";
import FinePens from "./Layout/FinePens";
import { useQuery } from "react-query";
import { getFeaturedProducts } from "../../Services/HomeService";
import ProductItemCard from "../../Components/ProductItemCard";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import ProductCategoryCardItem from "../../Components/ProductCategoryCardItem";
import { CATEGORY_FEATURES } from "./Layout/CategoryNavigation";

export default function Home() {
  const {
    data = [],
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery("products", () => getFeaturedProducts());
  let productItems;
  if (isLoading) {
    productItems = (
      <div className="flex justify-center">
        <UseAnimation
          animation={loading}
          className="text-red-5000"
          color="red"
          size={100}
        />
      </div>
    );
  } else if (isError) {
    productItems = (
      <div className="flex justify-center">
        <p>{error}</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  } else {
    productItems = (
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((products) => (
          <ProductItemCard productData={products} key={products.id} />
        ))}
      </div>
    );
  }

  let fakeContent;

  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {/* Category Card */}
          <p className="mb-10 font-semibold text-xl font-mono">
            Shop By Category
          </p>
          <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-4">
            {CATEGORY_FEATURES.map((catFeat) => (
              <ProductCategoryCardItem
                key={catFeat.categoryLink}
                categoryData={catFeat}
              />
            ))}
          </div>

          <h2 className="mt-40 text-lg font-semibold tracking-tight">
            Featured Products
          </h2>

          {productItems}
        </div>
      </div>
      <FinePens />
    </React.Fragment>
  );
}
