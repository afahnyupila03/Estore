import { uiAction } from "../../Store/ui-slice";
import CartIcon from "./../UI/CartIcon";
import { useSelector, useDispatch } from "react-redux";

const HeaderCartButton = (props) => {
  const cartCounter = useSelector((state) => state.cart.totalQuantity);
  // const showCart = useSelector(
  //     state => state.ui.cartIsVisible
  // )
  const dispatch = useDispatch();

  const openCartHandler = () => {
    dispatch(uiAction.toggle());
  };

  return (
    <button
      className="bg-red-500 items-center flex"
      onClick={openCartHandler}
    >
      <span className="ml-2 mr-3 text-white">
        <CartIcon />
      </span>
      <span className="mr-4 bg-red-400 text-xl text-white p-2 font-bold rounded-full">
        {cartCounter}
      </span>
    </button>
  );
};

export default HeaderCartButton;
