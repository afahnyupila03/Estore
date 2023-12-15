export const getFashionProductsService = async () => {
  try {
    const response = await fetch(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/fashion.json"
    );
    const data = await response.json();
    const loadedItems = [];
    for (const fashionProductsKey in data) {
      loadedItems.push({
        id: fashionProductsKey,
        image: data[fashionProductsKey].image,
        name: data[fashionProductsKey].name,
        price: data[fashionProductsKey].price,
      });
    }
    return loadedItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getFashionProductService = async (productId, productName) => {
  try {
    const response = await fetch(
      `https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/fashion/${productId}/${productName}.json`
    );
    const data = await response.json();
    const loadedItem = [];
    for (const fashionProductKey in data) {
      loadedItem.push({
        id: productId,
        name: productName,
        image: data[fashionProductKey].image,
        price: data[fashionProductKey].price,
      });
    }
    return loadedItem;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getMenAccessoriesService = async () => {
  try {
    const response = await fetch(
      "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/men.json"
    );
    const data = await response.json();
    const loadedItems = [];
    for (const menAccessoriesProductKey in data) {
      loadedItems.push({
        id: menAccessoriesProductKey,
        image: data[menAccessoriesProductKey].image,
        name: data[menAccessoriesProductKey].name,
        price: data[menAccessoriesProductKey].price,
      });
    }
    return loadedItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getMenAccessoryService = async (productId, productName) => {
  try {
    const response = await fetch(
      `https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/men/${productId}/${productName}.json`
    );
    const data = await response.json();
    const loadedItem = [];
    for (const menAccessoryKey in data) {
      loadedItem.push({
        id: productId,
        name: productName,
        image: data[menAccessoryKey].image,
        price: data[menAccessoryKey].price,
      });
    }
    return loadedItem;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const saleMenProductsService = async () => {};

export const saleMenProductService = async () => {};

export const saleWomenProductsService = async () => {};

export const saleWomenProductService = async () => {};
