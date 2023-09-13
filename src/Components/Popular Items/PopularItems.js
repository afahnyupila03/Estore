import React from "react";
import { useQuery } from "react-query";
import { getPopularItemsService } from "../../Services/HomeService/HomeService";

const PopularItemsCard = () => {
  const {
    error,
    isLoading,
    data = [],
    refetch,
  } = useQuery("popularItems", () =>
    getPopularItemsService(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/popular.json"
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
            Popular Items
          </h2>
        </div>
        <p>fix component, not meant to render data rather to pass</p>
      </div>
    </React.StrictMode>
  );
};

export default PopularItemsCard;
