import React from "react";
import FinePens from "../../Components/fine-pens/FinePens";
import { useQuery } from "react-query";
import { getFeaturedProducts } from "../../Services/HomeService";
import ProductItemCard from "../../Components/ProductItemCard";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import ProductCategoryCardItem from "../../Components/ProductCategoryCardItem";

import Jewelry from "../../Assets/jewelry.jpg";
import MenCloths from "../../Assets/men_clothing.jpg";
import WomenCloths from "../../Assets/women_clothing.jpg";
import Electronics from "../../Assets/electronics.jpg";
import { Link } from "react-router-dom";

const CATEGORY_FEATURES = [
  {
    categoryImage: Jewelry,
    categoryImageText: "jewelry",
    categoryRoute: "jewelry",
    categoryLink: "Jewelry",
  },
  {
    categoryImage: MenCloths,
    categoryImageText: "men_cloths",
    categoryRoute: "men-clothing",
    categoryLink: "Men Clothings",
  },
  {
    categoryImage: Electronics,
    categoryImageText: "electronic",
    categoryRoute: "electronics",
    categoryLink: "Electronics",
  },
  {
    categoryImage: WomenCloths,
    categoryImageText: "women_cloths",
    categoryRoute: "women-clothings",
    categoryLink: "Women Clothings",
  },
];

const dummyData = [
  {
    id: 0,
    title: "Item 1",
    image: Jewelry,
    price: 12.0,
    category: "Jewelry",
    description:
      "Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.",
  },
  {
    id: 1,
    title: "Item 2",
    image: MenCloths,
    price: 22.0,
    category: "Men's Clothing",
    description:
      "Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.",
  },
  {
    id: 2,
    title: "Item 3",
    image: WomenCloths,
    price: 12.0,
    category: "Women's Clothing",
    description:
      "Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.",
  },
  {
    id: 3,
    title: "Item 4",
    image: Electronics,
    price: 24.0,
    category: "Electronics",
    description:
      "Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.",
  },
  {
    id: 4,
    title: "Item 5",
    image: Jewelry,
    price: 12.0,
    category: "Jewelry",
    description:
      "Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.",
  },
  {
    id: 5,
    title: "Item 6",
    image: MenCloths,
    price: 22.0,
    category: "Men's Clothing",
    description:
      "Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.",
  },
  {
    id: 6,
    title: "Item 7",
    image: WomenCloths,
    price: 12.0,
    category: "Women's Clothing",
    description:
      "Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.",
  },
  {
    id: 7,
    title: "Item 8",
    image: Electronics,
    price: 24.0,
    category: "Electronics",
    description:
      "Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.",
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
    productItems = (
      <div className="flex justify-center">
        <UseAnimation animation={loading} className="text-red-5000" color="red" size={60} />
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

  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {/* Category Card */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {CATEGORY_FEATURES.map((catFeat) => (
              <ProductCategoryCardItem
                key={catFeat.id}
                categoryData={catFeat}
              />
            ))}
          </div>

          <h2 className="mt-40 text-lg font-semibold tracking-tight">
            Featured Products
          </h2>

          {productItems}

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {dummyData.map((products) => (
              <ProductItemCard productData={products} key={products.id} />
            ))}
          </div>

          <div className="flex justify-content-center">
            {!isLoading && <Link to="/home/shop">Load More</Link>}
          </div>
        </div>
      </div>
      <FinePens />
    </React.Fragment>
  );
}
