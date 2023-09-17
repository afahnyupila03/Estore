import React from "react";
import FashionItems from "../../Components/Fashion/fashion-item";
import { useQuery } from "react-query";
import { getFashionProductsService } from "../../Services/ShopService/ShopService";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const FashionAccessories = () => {
  const {
    data: fashionProducts = [],
    isFetching,
    error,
    isError,
    refetch,
  } = useQuery("fashionItems", () => getFashionProductsService());

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
        <p className='text-red-500'>{error.message}</p>
        <button onClick={() => refetch()}>refetch</button>
      </div>
    );
  } else {
    content = (
      <div>
        {fashionProducts.map((fashion) => (
          <FashionItems key={fashion.id} fashionData={fashion} />
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <h3>Fashion product list</h3>
      {content}
    </React.Fragment>
  );
};

export default FashionAccessories;
