export const getFeaturedProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=8");
    const data = await response.json();
    const loadedItems = [];
    for (const key in data) {
      loadedItems.push({
        id: key,
        image: data[key].image,
        title: data[key].title,
        price: data[key].price,
        category: data[key].category,
      });
    }
    return loadedItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getArrivalProductService = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    const data = await response.json();
    const product = {
      id: id,
      image: data.image,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
    };

    return product;
  } catch (err) {
    return Promise.reject(err);
  }
};
