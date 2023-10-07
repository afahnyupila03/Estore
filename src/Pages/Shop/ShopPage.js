import React from "react";
import { useQuery } from "react-query";

import ShopNavbarPage from "./ShopNavbarPage";
import { Outlet } from "react-router-dom";
import {
  getArrivalItemsService,
  getPopularItemsService,
} from "../../Services/HomeService/HomeService";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const ShopPage = () => {
  // const arrival&PopularService = () => {
  //   return (

  //   )
  // }

  const {
    data = [],
    isFetching,
    error,
    isError,
    refetch,
  } = useQuery("shopItems", async () => {
    const arrivalItems = await getArrivalItemsService();
    const popularItems = await getPopularItemsService();
    return { arrivalItems, popularItems };
  });

  let content;

  if (isFetching) {
    content = (
      <div className='mt-40'>
        <UseAnimations animation={loading} />
      </div>
    );
  } else if (isError) {
    return (
      <div className='mt-40'>
        {error.message}
        <button onClick={() => refetch()}>Refetch</button>
      </div>
    );
  } else {
    content = (
      <div>
        {data.map((shopProducts) => (
          <div key={shopProducts.id}>
            <p>{shopProducts.name}</p>
            <p>{shopProducts.price}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="mt-40">
        <ShopNavbarPage />
      </div>
      <Outlet />
    </React.Fragment>
  );
};

export default ShopPage;
