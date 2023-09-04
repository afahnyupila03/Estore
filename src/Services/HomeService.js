export const getNewArrivals = async (items) => {
  try {
    const { data } = await fetch(items);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getPopularItemsService = async (items) => {
  try {
    const { data } = await fetch(items);
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
    return Promise.reject(err.message);
  }
};
