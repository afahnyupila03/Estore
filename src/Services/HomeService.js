export const getFeaturedProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=8");
    const data = await response.json();
    const productData = data.products;
    const productItems = [];
    for (const key in productData) {
      if (productData.hasOwnProperty(key)) {
        productItems.push({
          id: key,
          title: productData[key].title,
          thumbnail: productData[key].thumbnail,
          price: productData[key].price,
          brand: productData[key].brand,
          description: productData[key].description,
          category: productData[key].category,
          discountPercentage: productData[key].discountPercentage,
          images: productData[key].images,
          rating: productData[key].rating,
          stock: productData[key].stock,
        });
      }
    }
    return productItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getFeaturedProductService = async (id, title) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/${id}?title=${title}`
    );

    const data = await response.json();
    const dataProduct = data.product;
    console.log("Data detail call: ", data);
    console.log("Product Detail Call:", dataProduct);
    const product = {
      id: id,
      title: title,
      thumbnail: data.thumbnail,
      price: data.price,
      brand: data.brand,
      description: data.description,
      category: data.category,
      discountPercentage: data.discountPercentage,
      images: data.images,
      rating: data.rating,
      stock: data.stock,
    };
    return product;
  } catch (err) {
    return Promise.reject(err);
  }
};
