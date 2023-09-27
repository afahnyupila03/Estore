import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import {
  getArrivalItemsService,
  getPopularItemsService,
} from "../../Services/HomeService/HomeService";

import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { useTranslation } from "react-i18next";

import NewArrivals from "../../Components/New Arrivals/NewArrivals";
import PopularItemsCard from "../../Components/Popular Items/PopularItems";
import watch from "../../Components/Banner/watch.png.webp";
import finePens from "../../Components/fine-pens/new-fine-pens-copy.jpg";

const Home = () => {
  const {
    data: arrivalProducts = [],
    isFetching: fetchingArrival,
    isError: arrivalIsError,
    error: arrivalError,
    refetch: refetchArrival,
  } = useQuery("arrivalQuery", () => getArrivalItemsService());
  const {
    data: popularProducts = [],
    isFetching: fetchingPopular,
    error: popularError,
    isError: popularIsError,
    refetch: refetchPopular,
  } = useQuery("popularQuery", () => getPopularItemsService());

  const { t } = useTranslation();

  let arrivalContent;
  let popularContent;

  if (fetchingArrival) {
    arrivalContent = <UseAnimations animation={loading} />;
  } else if (arrivalIsError) {
    arrivalContent = (
      <div>
        <p className="text-red-500">{t("errorMessages.failed")}</p>
        <button onClick={() => refetchArrival()}>
        {/* console.log({arrivalError}) */}
          {t("errorMessages.reload")}
        </button>
      </div>
    );
  } else {
    arrivalContent = (
      <div>
        {arrivalProducts.map((arrival) => (
          <NewArrivals key={arrival.id} arrivalData={arrival} />
        ))}
      </div>
    );
  }

  if (fetchingPopular) {
    popularContent = <UseAnimations animation={loading} />;
  } else if (popularIsError) {
    popularContent = (
      <div>
        <p className="text-red-500">{t("errorMessages.failed")}</p>
        <button onClick={() => refetchPopular()}>
          {/* console.log({popularError.message}) */}
          {t("errorMessages.reload")}
        </button>
      </div>
    );
  } else {
    popularContent = (
      <div>
        {popularProducts.map((popular) => (
          <PopularItemsCard key={popular.id} popularData={popular} />
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div>
        <div>
          <div className='mt-8'>
            <h3>{t("banner.selectNew")}</h3>
            <p>
              {t("banner.selectWithCode")}
              <span>{t("banner.march")}</span>
            </p>
            <div>
              <Link to="/shop" onClick={() => window.scrollTo(0, 0)}>
                {t("shop.shopNow")}
              </Link>
            </div>
          </div>

          <div>
            <img src={watch} alt="banner-img" loading="lazy" />
          </div>
        </div>
      </div>

      <h3>{t("products.arrivalList")}</h3>
      {arrivalContent}

      {/* TODO: RETHINK  THIS SECTION IF IT IS NECESSARY */}
      <div>
        <div>
          <img src={finePens} alt="" loading="lazy" />
        </div>
        <div>
          <Link to="/home/shop-corporate-gifts">{t("shop.shopCorporate")}</Link>
        </div>
      </div>

      <h3>{t("products.popularList")}</h3>
      {popularContent}
    </React.Fragment>
  );
};

export default Home;
