export const ShopProductsServices = async () => {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?limit=12&skip=32&sortBy=title&order=asc"
    );
    const data = await response.json();
    const productData = data.products;
    const productItems = [];
    for (const key in productData) {
      if (productData.hasOwnProperty(key)) {
        productItems.push({
          id: productData[key].id,
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
          quantity: productData[key].quantity,
          availabilityStatus: productData[key].availabilityStatus,
          dimensions: productData[key].dimensions,
          meta: productData[key].meta,
          minimumOrderQuantity: productData[key].minimumOrderQuantity,
          returnPolicy: productData[key].returnPolicy,
          reviews: productData[key].reviews,
          shippingInformation: productData[key].shippingInformation,
          sku: productData[key].sku,
          tags: productData[key].tags,
          warrantyInformation: productData[key].warrantyInformation,
          weight: productData[key].weight,
        });
      }
    }
    return productItems;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

export const shopProductService = async (id, title) => {
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
