import CartContext from "./cart-context";
import cartReducer, {
  defaultState,
  purchaseReducer,
  purchaseState,
  wishlistReducer,
  wishlistState,
} from "./Reducers";
import { useReducer } from "react";

export default function ({ children }) {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultState);
  const [wishlist, dispatchWishlist] = useReducer(
    wishlistReducer,
    wishlistState
  );
  const [purchase, dispatchPurchase] = useReducer(
    purchaseReducer,
    purchaseState
  );

  const addItemHandler = (item) => {
    dispatchCart({
      type: "ADD",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchCart({
      type: "REMOVE",
      id: id,
    });
  };

  const clearCartHandler = () => {
    dispatchCart({
      type: "CLEAR",
    });
  };

  const cartValue = {
    products: cartState.products,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
