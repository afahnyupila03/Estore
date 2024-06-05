import { faqQuestionBase } from "../Pages/Home/components/FAQQuestionBase";

export const getFeaturedProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=8");
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
        });
      }
    }
    return productItems;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
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
      quantity: data.quantity,
    };
    return product;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

export const getLatestProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=28&skip=9");
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
        });
      }
    }
    return productItems;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

export const getLatestProduct = async (id, title) => {
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
    };
    return product;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

export const FAQServices = async (t) => {
  // Simulating an async operation, as if fetching from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(faqQuestionBase(t));
    }, 500); // Delay to simulate network latency
  });
};
