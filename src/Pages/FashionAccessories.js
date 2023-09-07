import React from "react";
import FashionItems from "../Components/Fashion/fashion-item";
import {useQuery} from 'react-query'
import { getFashionProductsService } from "../Services/ShopService/ShopService";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const FashionAccessories = () => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery("fashionItems", () =>
    getFashionProductsService(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/fashion.json"
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
        <div className="grid mb-20 overflow-hidden">
          <p className="text-2xl mb-4">{error}</p>
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
      <React.Fragment>
        <UseAnimations 
          animation={loading}
          size={60}
        />
      </React.Fragment>
    );
  } else {
    content = data.map((fashion, index) => (
      <FashionItems fashion={fashion} key={fashion.index} />
    ));
  }

  return (
    <React.Fragment>
      <div className="mt-40 container">
        <div className="font-bold text-red-500 flex justify-center">
          {content}
        </div>
        <div className="grid grid-cols-3">{content}</div>
      </div>
    </React.Fragment>
  );
};

export default FashionAccessories;
