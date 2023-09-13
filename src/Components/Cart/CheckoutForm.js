import { useDispatch } from "react-redux";
import { uiAction } from "../../Store/ui-slice";
import { Formik } from "formik";

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(uiAction.toggle());
  };

  return (
    <div>
      <p>Await form designs to implement checkout form.</p>
    </div>
  );
};

export default CheckoutForm;
