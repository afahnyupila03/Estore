import React, { useReducer } from "react";
import {
  defaultWishListState,
  WishListReducer,
} from "../Reducers/WishListReducer";
import { WishListContext } from "../Context/WishListContext";
import { Constants } from "../Constants";

export default function WishListProvider({ children }) {
  const [wishListState, dispatchWishList] = useReducer(
    WishListReducer,
    defaultWishListState
  );

  const addProductToWishList = (product, wishListed) =>
    dispatchWishList({
      type: Constants.ADD,
      payload: { product: product, wishListed: wishListed },
    });

  const removeProductFromWishList = (id) =>
    dispatchWishList({
      type: Constants.REMOVE,
      payload: { id: id },
    });

  const clearWishListHandler = () =>
    dispatchWishList({ type: Constants.CLEAR });

  const setWishListState = () =>
    dispatchWishList({
      type: Constants.SET,
      payload: wishListState,
    });

  const wishListValue = {
    wishListProducts: wishListState.wishListProducts,
    wishListQuantity: wishListState.wishListQuantity,
    wishListed: wishListState.wishListed,
    addProductToWishList,
    removeProductFromWishList,
    clearWishListHandler,
    setWishListState,
  };

  return (
    <WishListContext.Provider value={wishListValue}>
      {children}
    </WishListContext.Provider>
  );
}
