export const CATEGORY_FEATURES = [
  {
    categoryRoute: "laptops",
    categoryLink: "laptops",
  },
  {
    categoryRoute: "smartphones",
    categoryLink: "smartphones",
  },
  {
    categoryRoute: "fragrances",
    categoryLink: "fragrances",
  },
  {
    categoryRoute: "skincare",
    categoryLink: "skin care",
  },
  {
    categoryRoute: "groceries",
    categoryLink: "groceries",
  },
  {
    categoryRoute: "home-decoration",
    categoryLink: "home decoration",
  },
  {
    categoryRoute: "furniture",
    categoryLink: "furniture",
  },
  {
    categoryRoute: "tops",
    categoryLink: "tops",
  },
  {
    categoryRoute: "womens-dresses",
    categoryLink: "Women Cloths",
  },
  {
    categoryRoute: "womens-shoes",
    categoryLink: "Women Footwear",
  },
  {
    categoryRoute: "mens-shirts",
    categoryLink: "Men Shirts",
  },
  {
    categoryRoute: "mens-shoes",
    categoryLink: "Men Footwear",
  },
  {
    categoryRoute: "mens-watches",
    categoryLink: "Men Watches",
  },
  {
    categoryRoute: "womens-watches",
    categoryLink: "Women Watches",
  },
  {
    categoryRoute: "womens-bags",
    categoryLink: "Women Bags",
  },
  {
    categoryRoute: "womens-jewellery",
    categoryLink: "Women Jewelry",
  },
  {
    categoryRoute: "sunglasses",
    categoryLink: "Sun Shades",
  },
  {
    categoryRoute: "automotive",
    categoryLink: "Automotive",
  },
  {
    categoryRoute: "motorcycle",
    categoryLink: "Motorcycle",
  },
  {
    categoryRoute: "lighting",
    categoryLink: "lighting",
  },
];





function convertCurrency(priceInUSD) {
  const exchangeRate = 608.58; // Assuming 1 USD = 608.58 XCAF
  const priceInXCAF = Math.round(priceInUSD * exchangeRate); // Convert the price to XCAF
  const formattedPrice = priceInXCAF.toLocaleString('en-US', { style: 'currency', currency: 'XAF' }); // Format the price as XAF currency
  return formattedPrice; // Return the formatted price in XAF
}

const price = 100; // Example price in USD
const xafPrice = convertCurrency(price);
console.log("Price in XAF: ", xafPrice); // Output: XAF 60,858
