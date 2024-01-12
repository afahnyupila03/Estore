// https://dummyjson.com/products/category/smartphones

export const CategoryService = async (category) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();
    const productData = data.products;
    console.log("Smartphones Service:", productData);
    const smartphoneItems = [];
    for (const smartphoneKey in productData) {
      if (productData.hasOwnProperty(smartphoneKey)) {
        smartphoneItems.push({
          id: smartphoneKey,
          title: productData[smartphoneKey].title,
          price: productData[smartphoneKey].price,
          thumbnail: productData[smartphoneKey].thumbnail,
          category: category,
          images: productData[smartphoneKey].images,
          brand: productData[smartphoneKey].brand,
          description: productData[smartphoneKey].description,
          discountPercentage: productData[smartphoneKey].discountPercentage,
          rating: productData[smartphoneKey].rating,
          stock: productData[smartphoneKey].stock,
        });
      }
    }
    return smartphoneItems;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const CategoryServiceItem = async (category, id, title) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/${category}/${id}?title=${title}`
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
      category: category,
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
