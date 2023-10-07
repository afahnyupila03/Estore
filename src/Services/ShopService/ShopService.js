// TODO: IMPLEMENT LOGIC TO NAVIGATE TO A SINGLE PRODUCT

export const getFashionProductsService = async (item) => {
  try {
    const response = await fetch(item);
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

export const getMenAccessoriesProductsService = async (item) => {
  try {
    const response = await fetch(item);
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
