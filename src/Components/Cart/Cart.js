import { Fragment, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import CheckoutForm from "./CheckoutForm";
import Modal from "../UI/Modal";
import CartCard from "../UI/CartCard";

import { cartAction } from "../../Store/cart-slice";
import { uiAction } from "../../Store/ui-slice";
import {
  getCartItemsService,
  postCartItemService,
} from "../../Services/CartService/CartService";

// TODO: IMPLEMENT, FETCH && DELETE CALLS FROM RTDB WITH REACT-QUERY.

const Cart = () => {
  const [isChecked, setIsChecked] = useState(false);
  const items = useSelector((state) => state.cart.products);
  const hasItems = items.length > 0;

  // Function
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(uiAction.toggle());
  };

  // TotalAmount Function
  const updatedTotalAmount = useSelector((state) => state.cart.totalAmount);

  // const totalAmount = `$${updatedTotalAmount.toFixed(2)}`
  // TotalAmount Function
  console.log(updatedTotalAmount);

  // Items Counter
  const itemsCounter = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = updatedTotalAmount * itemsCounter;
  const amount = +totalAmount;
  console.log(amount);

  const products = useSelector((state) => state.cart);

  //   NEW POST API CALL WITH useMutation
  const { mutate, isFetching, isError } = useMutation(
    (userData) =>
      postCartItemService(
        "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        userData,
        products
      ),
    {
      onSuccess: () => {
        dispatch(cartAction.clearCart());
      },
    }
  );

  // fetching function to fetch cart-items in db
  const {
    data,
    isLoading,
    isError: errorFetchingCartItems,
  } = useQuery(
    "cartItems",
    () =>
      getCartItemsService(
        "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      ),
    {
      refetchOnWindowFocus: true,
    }
  );

  return (
    <Modal className="mx-auto box-border p-20 max">
      <p>remodify the and turn to a cart page</p>
    </Modal>
  );
};

export default Cart;
