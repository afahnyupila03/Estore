import React from "react";
import { useQuery } from "react-query";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import Card from "../UI/Card";
import { getNewArrivals } from "../../Services/HomeService/HomeService";

const NewArrivals = () => {
  // TODO: FIX BUT FOR FETCHING PRODUCTS
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery("arrivalItems", () =>
    getNewArrivals(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/arrivals.json/"
    )
  );

  let content;

  if (error) {
    content = (
      <React.Fragment>
        <div className="grid overflow-hidden">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => refetch()}
            className="
            border-red-500 border-2 rounded-full
                p-2 text-lg font-bold hover:bg-red-500
                hover:text-white transition:ease-in-out
                duration-800
              "
          >
            Try again
          </button>
        </div>
      </React.Fragment>
    );
  } else if (isLoading) {
    content = (
      <UseAnimations animation={loading} size={60} style={{ color: "red" }} />
    );
  } else {
    content = (
      <React.Fragment>
        <div className="grid lg:grid-cols-4 gap-10">
          {data.map((itemA) => (
            <Card
              key={itemA.id}
              image={itemA.image}
              name={itemA.name}
              price={`$${itemA.price.toFixed(2)}`}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.StrictMode>
      <div
        className="container mx-auto px-4"
        style={{ marginTop: "5rem", marginBottom: "5rem" }}
      >
        <div className="flex md:justify-start sm:justify-center">
          <h2
            className=" 
                      border-red-500 border-b-2 overflow-hidden
                      text-red-500 font-bold uppercase
                      md:text-3xl sm:text-xl ml-10
                      "
          >
            new arrivals
          </h2>
        </div>
        <div
          className="font-bold text-red-500 flex justify-center"
          style={{
            marginTop: "5rem",
            marginBottom: "5rem",
            fontSize: "1.5rem",
          }}
        >
          {content}
        </div>
      </div>
    </React.StrictMode>
  );
};

export default NewArrivals;
