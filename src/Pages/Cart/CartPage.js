import { cartAction } from "../../Store/cart-slice";
import { uiAction } from "../../Store/ui-slice";

import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import CartHeader from "./CartHeader";
import CartItems from "./CartItems";
import { useQuery } from "react-query";

export default function CartPage() {
  const { data = [] } = useQuery();
  const [isChecked, setIsChecked] = useState(false);
  const items = useSelector((state) => state.cart.products);

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

      {!hasItems ? (
        <div>
          <p>No items added to cart</p>
        </div>
      ) : (
        <div>
          <p>Wow, see you have items here</p>
          {data.map((cart) => (
            <CartItems key={cart.id} cartData={cart} />
          ))}
        </div>
      )}

<h1 className='mt-6 mb-6'>Wait for designs to see what could fill up this area</h1>

    </Fragment>
  );
}
