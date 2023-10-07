export const getNewArrivals = async (items) => {
  try {
    const response = await fetch(items)
    const data = await response.json()
    const loadedItems = []
    for (const arrivalItemsKey in data) {
      loadedItems.push({
        id: arrivalItemsKey,
        image: data[arrivalItemsKey].image,
        name: data[arrivalItemsKey].name,
        price: data[arrivalItemsKey].price
      })
    }
    return loadedItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getPopularItemsService = async (items) => {
  try {
    const response = await fetch(items);
    const data = await response.json();
    const loadedItems = [];
    for (const popularKey in data) {
      loadedItems.push({
        id: popularKey,
        image: data[popularKey].image,
        name: data[popularKey].name,
        price: data[popularKey].price,
      });
    }
    return loadedItems;
  } catch (err) {
    return Promise.reject(err);
  }
};
