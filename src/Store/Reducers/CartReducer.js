import { Constants } from "../Constants";

export const DefaultCartState = {
  products: [],
  totalAmount: 0,
};

export const CartReducer = (state, action) => {
  if (action.type === Constants.ADD) {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingProductIndex = state.products.findIndex(
      (item) => item.id === action.item.id
    );
    const existingProduct = state.products[existingProductIndex];

    let updatedProducts;

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        amount: existingProduct.amount + action.item.amount,
      };
      updatedProducts = [...state.products];
      updatedProducts[existingProductIndex] = updatedProduct;
    } else {
      updatedProducts = state.products.concat(action.item);
    }

    return {
      products: updatedProducts,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === Constants.REMOVE) {
    const existingProductIndex = state.products.findIndex(
      (item) => item.id === action.id
    );
    const existingProduct = state.products[existingProductIndex];
    const updatedTotalAmount = state.totalAmount - existingProduct.price;

    let updatedProducts;

    if (existingProduct === 1) {
      updatedProducts = existingProduct.filter((item) => item.id !== action.id);
    } else {
      const updatedProduct = {
        ...existingProduct,
        amount: existingProduct.amount - 1,
      };
      updatedProducts = [...state.products];
      updatedProducts[existingProductIndex] = updatedProduct;
    }

    return {
      products: updatedProducts,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === Constants.CLEAR) {
    return DefaultCartState;
  }
};
