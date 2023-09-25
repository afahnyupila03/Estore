import React from "react";
import Banner from "../../Components/Banner/Banner";
import NewArrivals from "../../Components/New Arrivals/NewArrivals";
import FinePens from "../../Components/fine-pens/FinePens";
import PopularItemsCard from "../../Components/Popular Items/PopularItems";
import { useQuery } from "react-query";
import {
  getArrivalItemsService,
  getPopularItemsService,
} from "../../Services/HomeService/HomeService";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { useTranslation } from "react-i18next";

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
        <p className="text-red-500">{t('errorMessages.failed')}</p>
        <button onClick={() => refetchArrival()}>
        {t('errorMessages.reload')}
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
        <p className="text-red-500">{t('errorMessages.failed')}</p>
        <button onClick={() => refetchPopular()}>
        {t('errorMessages.reload')}
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
      <Banner />

      <h3>{t('products.arrivalList')}</h3>
      {arrivalContent}
      <FinePens />

      <h3>{t('products.popularList')}</h3>
      {popularContent}
    </React.Fragment>
  );
};

export default Home;
