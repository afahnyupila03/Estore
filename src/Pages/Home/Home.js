import React from "react";
import FinePens from "../../Components/fine-pens/FinePens";
import { useQuery } from "react-query";
import { getFeaturedProducts } from "../../Services/HomeService/HomeService";
import ProductItemCard from "../../Components/ProductItemCard";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import ProductCategoryCardItem from "../../Components/ProductCategoryCardItem";

import Jewelery from "../../Assets/jewelery.jpg";
import MenCloths from "../../Assets/men_clothing.jpg";
import WomenCloths from "../../Assets/women_clothing.jpg";
import Electronics from "../../Assets/electronics.jpg";
import { Link } from "react-router-dom";

const CATEGORY_FEATURES = [
  {
    categoryImage: Jewelery,
    categoryImageText: "jewelery",
    categoryText: "Jewelery",
    categoryRoute: "jewelery",
    categoryLink: "Jewelery",
  },
  {
    categoryImage: MenCloths,
    categoryImageText: "men_cloths",
    categoryText: "Men's Clothings",
    categoryRoute: "men-clothing",
    categoryLink: "Men Clothings",
  },
  {
    categoryImage: Electronics,
    categoryImageText: "electronics",
    categoryText: "Electronics",
    categoryRoute: "electronics",
    categoryLink: "Electronics",
  },
  {
    categoryImage: WomenCloths,
    categoryImageText: "women_cloths",
    categoryText: "Women's Clothings",
    categoryRoute: "women-clothings",
    categoryLink: "Women Clothings",
  },
];

export default function Home() {
  const {
    data = [],
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery("products", () => getFeaturedProducts());
  console.log(data);
  let productItems;
  if (isLoading) {
    productItems = <UseAnimation animation={loading} size={60} />;
  } else if (isError) {
    productItems = (
      <div>
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

  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {/* Category Card */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {CATEGORY_FEATURES.map((catFeat, catIndexes) => (
              <ProductCategoryCardItem
                key={catIndexes}
                categoryData={catFeat}
              />
            ))}
          </div>

          <h2 className="mt-40 text-lg font-semibold tracking-tight">
            Featured Products
          </h2>

          {productItems}

          <div className="flex justify-content-center">
            <Link to="/home/shop">Load More</Link>
          </div>
        </div>
      </div>
      <FinePens />
    </React.Fragment>
  );
}
