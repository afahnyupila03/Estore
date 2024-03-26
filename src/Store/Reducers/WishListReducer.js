import { Constants } from "../Constants";

export const defaultWishListState = {
  wishListProducts: [],
  whishListTotalAmount: 0,
  wishListQuantity: 0,
  wishListed: false,
};

export const WishListReducer = (state, action) => {
  const CURRENCY_CONVERTER = (USD_PRICE) => {
    const exchangeRate = 608.58;
    const convertedPrice = USD_PRICE * exchangeRate;
    return convertedPrice;
  };

  const CALC_DISCOUNT = (price, discountPercentage) => {
    const discount = (discountPercentage / 100) * price;
    const discountPrice = Math.round(price - discount);
    return discountPrice;
  };

  switch (action.type) {
    case Constants.ADD:
      const existingProductIndex = state.wishListProducts.findIndex(
        (product) => product.id === action.payload.product.id
      );
      const productPrice = action.payload.product.price;
      const discountPercentage = action.payload.product.discountPercentage;
      const XAF_PRICE = CURRENCY_CONVERTER(productPrice);
      const discountedPrice = CALC_DISCOUNT(XAF_PRICE, discountPercentage);

      if (existingProductIndex !== -1) {
        return state;
      } else {
        const newProduct = {
          ...action.payload.product,
          quantity: 1,
        };
        return {
          ...state,
          wishListProducts: [...state.wishListProducts, newProduct],
          whishListTotalAmount: state.whishListTotalAmount + discountedPrice,
          wishListQuantity: state.wishListQuantity + 1,
          wishListed: true,
        };
      }

    case Constants.REMOVE:
      const productId = action.payload.id;
      const productIndex = state.wishListProducts.findIndex(
        (product) => product.id === productId
      );

      const updatedProducts = [...state.wishListProducts];
      const removedProduct = updatedProducts[productIndex];
      const priceInUSD = removedProduct.price;
      const discountPercent = removedProduct.discountPercentage;

      const priceInXAF = CURRENCY_CONVERTER(priceInUSD);
      const removedPrice = CALC_DISCOUNT(priceInXAF, discountPercent);

      updatedProducts.splice(productIndex, 1);

      return {
        ...state,
        wishListProducts: updatedProducts,
        whishListTotalAmount: state.whishListTotalAmount - removedPrice,
        wishListQuantity: state.wishListQuantity - 1,
        wishListed: false,
      };

    case Constants.CLEAR:
      return defaultWishListState;

    default:
      return state;
  }
};
