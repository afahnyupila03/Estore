import React, { useEffect, useState } from "react";
import FashionItems from "../Components/Fashion/fashion-item";
import useHttp from "../Hooks/use-fetch";

const FashionAccessories = () => {
  const [fashionItem, setFashionItem] = useState([]);
  const { error, isLoading, requestHandler: fetchHandler } = useHttp();

  // useEffect Function to fetch from server
  useEffect(() => {
    const fashionLine = (fashionObj) => {
      const loadedItems = [];
      for (const key in fashionObj) {
        loadedItems.push({
          id: key,
          image: fashionObj[key].image,
          name: fashionObj[key].name,
          price: fashionObj[key].price,
        });
        setFashionItem(loadedItems);
      }
    };

    // Fetch Hoot
    fetchHandler(
      {
        url: "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/fashion.json",
      },
      fashionLine
    );
  }, [fetchHandler]);

  const fashionProducts = fashionItem.map((fashion, index) => (
    <FashionItems fashion={fashion} key={fashion.index} />
  ));

  let content;

  if (error) {
    content = (
      <React.Fragment>
        <div className="grid mb-20 overflow-hidden">
          <p className="text-2xl mb-4">{error}</p>
          <button
            onClick={fetchHandler}
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
  }

  if (isLoading) {
    content = (
      <React.Fragment>
        <p>Fetching Fashion Accessories</p>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="mt-40 container">
        <div className="font-bold text-red-500 flex justify-center">
          {error && content}
          {isLoading && content}
        </div>
        <div className="grid grid-cols-3">{fashionItem && fashionProducts}</div>
      </div>
    </React.Fragment>
  );
};

export default FashionAccessories;
