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

const Home = () => {
  const { data: arrivalProducts = [] } = useQuery("arrivalQuery", () =>
    getArrivalItemsService()
  );
  const { data: popularProducts = [] } = useQuery("popularQuery", () =>
    getPopularItemsService()
  );

  return (
    <React.Fragment>
      <Banner />

      <h3>Arrival product list</h3>
      {arrivalProducts.map((arrival) => (
        <NewArrivals
          key={arrival.id}
          arrivalData={arrival}
          // refetchArrival={refetchArrival}
        />
      ))}
      <FinePens />

      <h3>Popular product list</h3>
      {popularProducts.map((popular) => (
        <PopularItemsCard key={popular.id} popularData={popular} />
      ))}
    </React.Fragment>
  );
};

export default Home;
