import NewArrivals from "../../Components/New Arrivals/NewArrivals";
import PopularItemsCard from "../../Components/Popular Items/PopularItems";
import {
  getArrivalItemsService,
  getPopularItemsService,
} from "../../Services/HomeService/HomeService";

import { useQuery } from "react-query";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { Fragment } from "react";

export default function () {
  const {
    data: arrivalProducts = [],
    isFetching: fetchingArrival,
    isError: isErrorArrival,
    error: errorArrival,
    refetch: refetchArrival,
  } = useQuery("arrivalQuery", () => getArrivalItemsService());

  const {
    data: popularProducts = [],
    isFetching: fetchingPopular,
    isError: isErrorPopular,
    error: errorPopular,
    refetch: refetchPopular,
  } = useQuery("popularQuery", () => getPopularItemsService());

  let content;
  if (fetchingArrival && fetchingPopular) {
    content = (
      <div>
        <UseAnimations animation={loading} />
      </div>
    );
  } else if (isErrorArrival && isErrorPopular) {
    content = (
      <div>
        <p>{errorArrival.message || errorPopular.message}</p>
        <button onClick={() => refetchArrival() && refetchPopular()}>
          refetch
        </button>
      </div>
    );
  } else {
    content = (
      <div>
        {popularProducts.map((popular) => (
          <PopularItemsCard key={popular.id} popularData={popular} />
        ))}
        {arrivalProducts.map((arrival) => (
          <NewArrivals key={arrival.id} arrivalData={arrival} />
        ))}
      </div>
    );
  }

  return <Fragment><h1>Shop List Products</h1>{content}</Fragment>;
}