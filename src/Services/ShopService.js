export const ShopProductsService = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const shopProducts = [];
    for (const shopItemKeys in data) {
      shopProducts.push({
        id: shopItemKeys,
        title: data[shopItemKeys].title,
        price: data[shopItemKeys].price,
        image: data[shopItemKeys].image,
        category: data[shopItemKeys].category,
      });
    }
    return shopProducts;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

export const shopProductService = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    const products = {
      id: id,
      title: data.title,
      category: data.category,
      image: data.image,
      description: data.description,
      price: data.price,
    };
    return products;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};
