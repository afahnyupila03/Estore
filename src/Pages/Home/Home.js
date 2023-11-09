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

const classNames = (...classes) => classes.filter(Boolean).join("");

const Home = () => {
  const {
    data = [],
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery(
    "products",
    () => getArrivalProductsService()
    // const arrivalProducts = getArrivalProductsService();
    // const popularProducts = getPopularProductsService();
    // return {arrivalProducts, popularProducts};
  );

  // Product Filtering Conditions.
  const [featuredProductItems, setFeaturedProductsItem] = useState(data);

  let productItems;
  if (isLoading) {
    productItems = <p>Loading items</p>;
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

  const handleShowAllProducts = () => {};

  const handleShowArrivalProducts = (id) => {};

  const handleShowPopularProducts = (id) => {};

  return (
    <React.Fragment>
      <Banner />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-lg font-semibold tracking-tight">
            Featured Products
          </h2>

          <div>
            <div className="flex px-4 py-4">
              {({ active }) => (
                <Link
                  onClick={handleShowAllProducts}
                  className={classNames(
                    active
                      ? "mr-4 border-b-black b-2 text-red-500"
                      : "mr-4 text-indigo-500-700"
                  )}
                >
                  All
                </Link>
              )}

              <Link onClick={handleShowArrivalProducts} className="mr-4">
                Arrival Products
              </Link>
              <Link onClick={handleShowPopularProducts} className="mr-4">
                Popular Products
              </Link>
            </div>
          </div>

          {productItems}
        </div>
      </div>
      <FinePens />
    </React.Fragment>
  );
};

export default Home;
