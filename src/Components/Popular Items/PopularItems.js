import React from "react";
import Card from "../UI/Card";
import { useQuery } from "react-query";
import { getPopularItemsService } from "../../Services/HomeService/HomeService";
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading';

const PopularItemsCard = () => {
  const {
    error,
    isLoading,
    data = [],
    refetch,
  } = useQuery("popularItems", () =>
    getPopularItemsService(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/popular.json"
    ), 
    {
      retry: (failureCount, error) => {
        // Retry for a maximum of 3 times
        if (failureCount >= 3) return false;
  
        // Only retry for specific error types
        if (error.message === 'Network Error') return true;
  
        // Don't retry for other error types
        return false;
      },
      // Use exponential backoff for retry delay: 2^retryAttempt * 1000ms
      retryDelay: attempt => Math.pow(2, attempt) * 1000,
    }
  );

  let content;

  if (error) {
    content = (
      <React.Fragment>
        <div className="grid overflow-hidden">
          <div
            className="font-bold text-red-500 flex justify-center"
            style={{
              marginTop: "5rem",
              marginBottom: "5rem",
              fontSize: "1.5rem",
            }}
          >
            {error}
          </div>
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
      <div
        className="font-bold text-red-500 flex justify-center"
        style={{ marginTop: "5rem", marginBottom: "5rem", fontSize: "1.5rem" }}
      >
        <UseAnimations 
          animation={loading}
          size={60}
        />
      </div>
    );
  } else {
    content = (
      <React.Fragment>
        <div className="grid lg:grid-cols-4 gap-10">
          {data.map((popular) => (
            <Card
              key={popular.id}
              image={popular.image}
              name={popular.name}
              price={`$${popular.price.toFixed(2)}`}
            />
          ))}
          okay
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
            Popular Items
          </h2>
        </div>
        {content}
      </div>
    </React.StrictMode>
  );
};

export default PopularItemsCard;
