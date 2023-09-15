// TODO: IMPLEMENT LOGIC TO NAVIGATE TO A SINGLE PRODUCT

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

export const getMenAccessoriesProductsService = async () => {
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
