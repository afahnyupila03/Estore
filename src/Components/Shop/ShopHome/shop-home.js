import React from "react";
import NewArrivals from "../../New Arrivals/NewArrivals";
import PopularItemsCard from "../../Popular Items/PopularItems";
import {
  getArrivalItemsService,
  getPopularItemsService,
} from "../../../Services/HomeService/HomeService";
import { useQuery } from "react-query";

export default function ShopHome() {
  const { data: arrivalProducts = [] } = useQuery(
    "arrivalQuery",
    () => getArrivalItemsService()
  );
  const { data: popularProducts = [] } = useQuery(
    "popularQuery",
    () => getPopularItemsService()
  );

  return (
    <React.Fragment>
      {arrivalProducts.map((arrival) => (
        <NewArrivals
          key={arrival.id}
          arrivalData={arrival}
          // refetchArrival={refetchArrival}
        />
      ))}
      {popularProducts.map((popular) => (
        <PopularItemsCard key={popular.id} popularData={popular} />
      ))}
    </React.Fragment>
  );
}
