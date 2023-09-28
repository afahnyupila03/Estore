export const getArrivalItemsService = async () => {
  try {
    const response = await fetch(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/arrivals.json/"
    );
    const data = await response.json();
    const loadedItems = [];
    for (const arrivalItemsKey in data) {
      loadedItems.push({
        id: arrivalItemsKey,
        image: data[arrivalItemsKey].image,
        name: data[arrivalItemsKey].name,
        price: data[arrivalItemsKey].price,
      });
    }
    return loadedItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getPopularItemsService = async () => {
  try {
    const response = await fetch(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/popular.json"
    );
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

export const getPopularProductService = async (productId) => {
  try {
    const response = await fetch(
      `https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/popular/${productId}.json`
    );
    const data = await response.json();
    if (!data) {
      throw new Error("Product not found");
    }
    const product = {
      id: productId,
      image: data.image,
      name: data.name,
      price: data.price,
    };

    return product;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getArrivalProductService = async (productId) => {
  try {
    const response = await fetch(
      `https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/arrivals/${productId}.json`
    );
    const data = await response.json();
    if (!data) {
      throw new Error("Product not found");
    }
    const product = {
      id: productId,
      image: data.image,
      name: data.name,
      price: data.price,
    };

    return product;
  } catch (err) {
    return Promise.reject(err);
  }
};
