import React, { useReducer } from "react";
import {
  defaultWishListState,
  WishListReducer,
} from "../Reducers/WishListReducer";
import { WishListContext } from "../Context/WishListContext";
import { Constants } from "../Constants";
import { realTimeDatabase } from "../../FirebaseConfigs/Firesbase";
import { ref, set } from "firebase/database";

export default function WishListProvider({ children }) {
  const [wishListState, dispatchWishList] = useReducer(
    WishListReducer,
    defaultWishListState
  );

  const addProductToWishList = async (product) => {
    try {
      dispatchWishList({
        type: Constants.ADD,
        payload: { product: product },
      });
    } catch (error) {
      dispatchWishList({
        type: Constants.ERROR,
        payload: { error },
      });
    }
  };

  const removeProductFromWishList = (id) =>
    dispatchWishList({
      type: Constants.REMOVE,
      payload: { id: id },
    });

  const clearWishListHandler = () =>
    dispatchWishList({ type: Constants.CLEAR });

  const wishListValue = {
    wishListProducts: wishListState.wishListProducts,
    wishListQuantity: wishListState.wishListQuantity,
    wishListed: wishListState.wishListed,
    addProductToWishList,
    removeProductFromWishList,
    clearWishListHandler,
  };

  return (
    <WishListContext.Provider value={wishListValue}>
      {children}
    </WishListContext.Provider>
  );
}
