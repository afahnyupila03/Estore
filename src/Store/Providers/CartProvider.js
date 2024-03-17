import { useReducer } from "react";
import { CartContext } from "../Context/CartContext";
import { DefaultCartState, CartReducer } from "../Reducers/CartReducer";
import { Constants } from "../Constants";

export default function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(CartReducer, DefaultCartState);

  const addProductHandler = (item) =>
    cartDispatch({ type: Constants.ADD, item: item });

  const removeProductHandler = (id) =>
    cartDispatch({ type: Constants.REMOVE, id: id });

  const clearProductHandler = () => cartDispatch({ type: Constants.CLEAR });

  const cartValue = {
    products: cartState.products,
    totalAmount: cartState.totalAmount,
    addProductHandler: addProductHandler,
    removeProductHandler: removeProductHandler,
    clearProductHandler: clearProductHandler,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
