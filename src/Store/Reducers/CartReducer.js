import { Constants } from "../Constants";

export const DefaultCartState = {
  products: [],
  totalAmount: 0,
  productQuantity: 0,
};

export const CartReducer = (state, action) => {
  const CALC_DISCOUNT = (discountPercent, price) => {
    const discount = (discountPercent / 100) * price;
    const discountPrice = Math.round(price - discount);
    return discountPrice;
  };

  const CURRENCY_CONVERTER = (priceInUSD) => {
    const exchangeRate = 608.58;
    const convertedPrice = Math.round(priceInUSD * exchangeRate);
    return convertedPrice;
  };

  switch (action.type) {
    case Constants.ADD:
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.product.id
      );
      const productPrice = action.payload.product.price;
      const discountPercentage = action.payload.product.discountPercentage;

      const XAF_PRICE = CURRENCY_CONVERTER(productPrice);
      const SELLING_PRICE = CALC_DISCOUNT(discountPercentage, XAF_PRICE);

      if (existingProductIndex !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[existingProductIndex].quantity +=
          action.payload.product.quantity;

        return {
          ...state,
          products: updatedProducts,
          totalAmount: state.totalAmount + SELLING_PRICE,
          // productQuantity: quantity,
        };
      } else {
        const newProduct = {
          ...action.payload.product,
          quantity: 1,
        };
        return {
          ...state,
          products: [...state.products, newProduct],
          totalAmount: state.totalAmount + SELLING_PRICE,
          // productQuantity: quantity,
        };
      }

    default:
      return state;
  }
};
