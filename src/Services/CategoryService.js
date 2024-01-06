// https://fakestoreapi.com/products/category/jewelery

export const JewelryCategory = async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/jewelery"
    );
    const data = await response.json();
    const jewelryItems = [];
    for (const jewelryKey in data) {
      jewelryItems.push({
        id: jewelryKey,
        title: data[jewelryKey].title,
        price: data[jewelryKey].price,
        image: data[jewelryKey].image,
        category: data[jewelryKey].category
      });
    }
    return jewelryItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const ElectronicCategory = async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/electronics"
    );
    const data = await response.json();
    const electronicItems = [];
    for (const electronicItemsKey in data) {
      electronicItems.push({
        id: electronicItemsKey,
        title: data[electronicItemsKey].title,
        image: data[electronicItemsKey].image,
        price: data[electronicItemsKey].price,
        category: data[electronicItemsKey].category
      });
    }
    return electronicItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const MenClothingCategory = async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/men's clothing"
    );
    const data = await response.json();
    const menItems = [];
    for (const mensItemKey in data) {
      menItems.push({
        id: mensItemKey,
        title: data[mensItemKey].title,
        image: data[mensItemKey].image,
        price: data[mensItemKey].price,
        category: data[mensItemKey].category
      });
    }
    return menItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const WomenClothingCategory = async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/women's clothing"
    );
    const data = await response.json();
    const womenItems = [];
    for (const womenItemsKey in data) {
      womenItems.push({
        id: womenItemsKey,
        title: data[womenItemsKey].title,
        image: data[womenItemsKey].image,
        price: data[womenItemsKey].price,
        category: data[womenItemsKey].category
      });
    }
    return womenItems;
  } catch (err) {
    return Promise.reject(err);
  }
};
