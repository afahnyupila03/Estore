// https://dummyjson.com/products/category/smartphones
/* 
Category List
-Smartphones
-Laptops
-Fragrances
*/

export const SmartphonesService = async (category) => {
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
