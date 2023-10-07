export const postCartItemService = async (userData, orderedItems) => {
  try {
    const response = await fetch(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userData,
          orderedItems: orderedItems,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getCartItemsService = async () => {
  try {
    const response = await fetch(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
    );
    const data = await response.json();
    const loadedItems = [];
    for (const cartItemsKey in data) {
      loadedItems.push({
        id: cartItemsKey,
        image: data[cartItemsKey].image,
        name: data[cartItemsKey].name,
        price: data[cartItemsKey].price,
      });
    }
    return loadedItems;
  } catch (error) {
    return Promise.reject(error);
  }
};
