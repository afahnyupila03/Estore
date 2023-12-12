import React, { useState } from "react";
import Banner from "../../Components/Banner/Banner";
import { Link } from "react-router-dom";
import FinePens from "../../Components/fine-pens/FinePens";
import { useQuery } from "react-query";
import {
  getArrivalProductsService,
  getPopularProductsService,
} from "../../Services/HomeService/HomeService";
import ProductItemCard from "../../Components/ProductItemCard";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading"

const classNames = (...classes) => classes.filter(Boolean).join("");

export default function Home  () {
  const {
    data = [],
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery(
    "products", () => getArrivalProductsService()
  );

  // Product Filtering Conditions.
  const [featuredProductItems, setFeaturedProductsItem] = useState(data);

  let productItems;
  if (isLoading) {
    productItems = (
      <React.Fragment>
        <UseAnimations animation={loading }size={60} />
      </React.Fragment>
      )
  } else if (isError) {
    productItems = (
      <div>
        <p>{error.message}</p>
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


  return (
    <React.Fragment>
      <Banner />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-lg font-semibold tracking-tight">
            Featured Products
          </h2>

          {productItems}
        </div>
      </div>
      <FinePens />
    </React.Fragment>
  );
};
