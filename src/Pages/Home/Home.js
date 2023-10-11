import React from "react";
import Banner from "../../Components/Banner/Banner";
// import NewArrivals from "../../Components/New Arrivals/NewArrivals";
import FinePens from "../../Components/fine-pens/FinePens";
import PopularItemsCard from "../../Components/Popular Items/PopularItems";
import {useQuery} from 'react-query'
import { getArrivalProducts } from "../../Services/HomeService/HomeService";
import ProductItemCard from "../../Components/ProductItemCard";

const Home = () => {

  const {data, isError, isLoading, error} = useQuery('products', () => getArrivalProducts())

  let productItems;
  if (isLoading) {
     productItems = <p>Loading items</p>
  } else if (isError) {
     productItems = <p>{error.message}</p>
  } else {
     productItems = (
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((arrivalProducts) => (
            <ProductItemCard 
              productData={arrivalProducts}
              key={arrivalProducts.id}
            />
          ))}
        </div>
      </div>
    </div>
    )
  }

  return (
    <React.Fragment>
      <Banner />
      {/* <NewArrivals /> */}
      {productItems}
      <FinePens />
      <PopularItemsCard />
    </React.Fragment>
  );
};

export default Home;
