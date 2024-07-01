import React from "react";
import FinePens from "./Layout/FinePens";
import { useQuery } from "react-query";
import { getFeaturedProducts } from "../../Services/HomeService";
import ProductItemCard from "../../Components/ProductItemCard";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import ProductCategoryCardItem from "../../Components/ProductCategoryCardItem";
import { CATEGORY_FEATURES } from "./components/CategoryNavigation";
import { useTranslation } from "react-i18next";

import channel from "../../Assets/channel.webp";
import watches from "../../Assets/watches.webp";
import jewellery from "../../Assets/jewellery.webp";

import Slider from "react-slick";

export default function Home() {
  const { t } = useTranslation();

  const cateFeatures = CATEGORY_FEATURES(t);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  };

  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="mx-auto lg:block hidden mb-10" style={{width: "82rem", marginLeft: "0", marginRight: "-4rem"}}>
          <Slider {...settings}>
            <div>
              <img src={channel} alt="channel_img" />
            </div>
            <div>
              <img src={watches} alt="watch_img" />
            </div>
            <div>
              <img src={jewellery} alt="jewellery_img" />
            </div>
          </Slider>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="mb-10 font-semibold tracking-widest text-2xl font-mono">
            {t("home.featuredProducts")}
          </h2>

          {productItems}
        </div>
      </div>
      <FinePens />
    </React.Fragment>
  );
}
