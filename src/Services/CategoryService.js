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
          id: productData[smartphoneKey].id,
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
          availabilityStatus: productData[smartphoneKey].availabilityStatus,
          dimensions: productData[smartphoneKey].dimensions,
          meta: productData[smartphoneKey].meta,
          minimumOrderQuantity: productData[smartphoneKey].minimumOrderQuantity,
          returnPolicy: productData[smartphoneKey].returnPolicy,
          reviews: productData[smartphoneKey].reviews,
          shippingInformation: productData[smartphoneKey].shippingInformation,
          sku: productData[smartphoneKey].sku,
          tags: productData[smartphoneKey].tags,
          warrantyInformation: productData[smartphoneKey].warrantyInformation,
          weight: productData[smartphoneKey].weight,
        });
      }
    }
    return smartphoneItems;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
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
      quantity: data.quantity,
      availabilityStatus: data.availabilityStatus,
      dimensions: data.dimensions,
      meta: data.meta,
      minimumOrderQuantity: data.minimumOrderQuantity,
      returnPolicy: data.returnPolicy,
      reviews: data.reviews,
      shippingInformation: data.shippingInformation,
      sku: data.sku,
      tags: data.tags,
      warrantyInformation: data.warrantyInformation,
      weight: data.weight,
    };
    return product;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};
