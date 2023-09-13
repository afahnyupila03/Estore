import React from "react";
import { useQuery } from "react-query";
import { getNewArrivals } from "../../Services/HomeService/HomeService";

const NewArrivals = () => {
  // TODO: FIX BUT FOR FETCHING PRODUCTS
  // TODO: MOVE FETCHING LOGIC TO PAGES DIRECTORY FOR RENDERING.
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
          <p>fix component, not meant to render data rather to pass</p>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default NewArrivals;
