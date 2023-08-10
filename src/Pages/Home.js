import React from "react";
import Banner from "../Components/Banner/Banner";
import NewArrivals from "../Components/New Arrivals/NewArrivals";
import FinePens from "../Components/fine-pens/FinePens";
import PopularItemsCard from "./../Components/Popular Items/PopularItems";

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <NewArrivals />
      <FinePens />
      <PopularItemsCard />
    </React.Fragment>
  );
};

export default Home;
