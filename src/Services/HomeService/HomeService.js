export const getFeaturedProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=5");
    const data = await response.json();
    const loadedItems = [];
    for (const key in data) {
      loadedItems.push({
        id: key,
        image: data[key].image,
        title: data[key].title,
        price: data[key].price,
        category: data[key].category,
        ratings: data[key].ratings,
      });
    }
    return loadedItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getFeaturedProductService = async (id, title) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${id}?title=${title}`
    );

    const data = await response.json();
    console.log("fetch API call", data);
    const product = {
      id: id,
      image: data.image,
      title: title,
      price: data.price,
      description: data.description,
      category: data.category,
    };
    console.log(product);
    return product;
  } catch (err) {
    return Promise.reject(err);
  }
};
