import { cartAction } from "../../Store/cart-slice";

import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import CartHeader from "./CartHeader";
import CartItems from "./CartItems";
import { useMutation, useQuery } from "react-query";
import CartFormModal from "./CartForm/CartFormModal";
import { getCartItemsService, postCartItemService } from "../../Services/CartService/CartService";

export default function CartPage() {
  const [showFormModal, setShowFormModal] = useState(true);
  const items = useSelector((state) => state.cart.products);

//   Fetch Products added to cart.
  const {
    data = [],
    isLoading: loadingCartItems,
    isError: cartItemsError,
    error: errorCartItems,
  } = useQuery("cartItems", () => getCartItemsService(), {
    refetchOnWindowFocus: true,
  });

//   Post userProducts and userData to database
const {mutate} = useMutation(
    () => postCartItemService(), 
    {
        onSuccess: () => {
            dispatch(cartAction.clearCart())
        }
    }
)

  const hasItems = items.length > 0;

  // Function
  const dispatch = useDispatch();

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

  return (
    <Fragment>
      <h1 style={{ marginTop: "5rem" }}>Cart Page</h1>
      <CartHeader itemsCounter={itemsCounter} amount={amount} />
      <hr
        style={{ marginTop: "1rem", marginBottom: "1rem", borderColor: "red" }}
      />

      {hasItems ? (
        <div>
          <p>No items added to cart</p>
        </div>
      ) : (
        <div>
          <p>Wow, see you have items here</p>
          {data.map((cart) => (
            <CartItems key={cart.id} cartData={cart} />
          ))}
          <div>
            <button onClick={() => setShowFormModal(!showFormModal)}>
              Place Orders
            </button>
          </div>
        </div>
      )}

      {!showFormModal && (
        <CartFormModal showFormModal={() => setShowFormModal(!showFormModal)} />
      )}

      <h1 className="mt-6 mb-6">
        Wait for designs to see what could fill up this area
      </h1>
    </Fragment>
  );
}
