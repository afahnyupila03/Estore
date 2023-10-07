import React from "react";

import Card from "../UI/Card";
import { useQuery } from "react-query";
import loading from "react-useanimations/lib/loading";
import { getMenAccessoriesProductsService } from "../../Services/ShopService/ShopService";
import UseAnimations from "react-useanimations";

const MenAccessories = () => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery("menAsseccories", () =>
    getMenAccessoriesProductsService(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/men.json"
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
      <React.StrictMode>
        <UseAnimations animation={loading} size={60} />
      </React.StrictMode>
    );
  } else {
    content = data.map((menAcc) => (
      <Card
        key={menAcc.id}
        image={menAcc.image}
        name={menAcc.name}
        price={menAcc.price}
      />
    ));
  }

  return (
    <React.StrictMode>
      <div
        className="container mx-auto px-4"
        style={{ marginTop: "5rem", marginBottom: "5rem" }}
      >
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
        <div className="grid grid-cols-4 gap-10">{content}</div>
      </div>
    </React.StrictMode>
  );
};

// TODO: USE TEMPLATE LITERALS TO RENDER
// STYLING FOR WHEN DATA IS TRUE AND WHEN ERROR/ISLOADING IS TRUE

export default MenAccessories;
