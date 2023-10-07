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
    data = [],
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery("shopHome", async () => {
    const arrivalItems = await getArrivalItemsService();
    const popularItems = await getPopularItemsService();
    return { arrivalItems, popularItems };
  });

  let content;
  if (isFetching) {
    content = (
      <div>
        <UseAnimations animation={loading} />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>refetch</button>
      </div>
    );
  } else {
    content = (
      <div>
        {data.map((shopHome) => (
          <div key={shopHome.id}>
            <p>{shopHome.name}</p>
            <p>{shopHome.price}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Fragment>
      <h1>Shop List Products</h1>
      {content} 
    </Fragment>
  );
}
