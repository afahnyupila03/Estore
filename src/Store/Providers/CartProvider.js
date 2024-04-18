import { useReducer } from "react";
import { CartContext } from "../Context/CartContext";
import { DefaultCartState, CartReducer } from "../Reducers/CartReducer";
import { Constants } from "../Constants";
import { database } from "../../FirebaseConfigs/Firesbase";
import { addDoc, collection, Firestore } from "firebase/firestore";

export default function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(CartReducer, DefaultCartState);

  const addProductHandler = (product) =>
    cartDispatch({ type: Constants.ADD, payload: { product: product } });

  const removeProductHandler = (id) =>
    cartDispatch({ type: Constants.REMOVE, payload: { id: id } });

  const clearProductHandler = () => cartDispatch({ type: Constants.CLEAR });

  const cartValue = {
    products: cartState.products,
    totalAmount: cartState.totalAmount,
    productQuantity: cartState.productQuantity,
    addProductHandler,
    removeProductHandler,
    clearProductHandler,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
