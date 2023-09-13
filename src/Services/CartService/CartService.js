export const postCartItemService = async (items, userData, orderedItems) => {
  try {
    const response = await fetch(items, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        orderedItems: orderedItems,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getCartItemsService = async (items) => {
  try {
    const response = await fetch(items);
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
