import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiAction } from "../../Store/ui-slice";
// import Input from "../UI/Input";
import useInput from "../../Hooks/use-input";

// TODO: IMPORT AND USE FORMIK IN PLACE OF TRADITIONAL FIELD ELEMENTS.
// TODO: FIGURE OUT HOW TO USE THE MUTATE FUNCTION WHEN PASSED DOWN VIA PROP HERE.

const CheckoutForm = (props) => {
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(uiAction.toggle());
  };

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: false,
    postalCode: true,
    city: true,
    street: true,
  });

  const {
    value: nameRef,
    valueIsValid: nameIsValid,
    enteredValue: enteredName,
    reset: resetName,
    valueIsInvalid: nameIsInvalid,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value !== " ");
  const {
    value: cityRef,
    valueIsValid: cityIsValid,
    enteredValue: enteredCity,
    reset: resetCity,
    valueIsInvalid: cityIsInvalid,
    inputBlurHandler: cityBlurHandler,
  } = useInput((value) => value !== " ");
  const {
    value: streetAddressRef,
    valueIsValid: streetIsValid,
    enteredValue: enteredStreet,
    reset: resetStreet,
    valueIsInvalid: streetIsInvalid,
    inputBlurHandler: streetBlurHandler,
  } = useInput((value) => value.trim() !== " ");
  const {
    value: postalCodeRef,
    postalCodeIsValid,
    enteredValue: enteredPostalCode,
    reset: resetPostalCode,
    valueIsInvalid: postalCodeIsInvalid,
    inputBlurHandler: postalCodeBlurHandler,
  } = useInput((value) => value === "5");

  const orderConfirmHandler = (event) => {
    event.preventDefault();

    enteredName();
    enteredCity();
    enteredStreet();
    enteredPostalCode();

    setFormInputsValidity({
      name: nameIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
      street: streetIsValid,
    });

    const formIsValid = nameIsValid && postalCodeIsValid && streetIsValid;
    if (!formIsValid) {
      return;
    }

    // const userData = {
    //     name: enteredName,
    //     city: enteredCity,
    //     postalCode: enteredPostalCode,
    //     street: enteredStreet
    // }

    props.onPost({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    });

    resetName();
    resetCity();
    resetStreet();
    resetPostalCode();
  };

  return (
    <form className="grid gap-10" onSubmit={orderConfirmHandler}>
      {/* Name Input */}
      <div className="flex items-center">
        <label className="text-xl tracking-wilder font-bold text-red-500 items-center">
          Enter Name:
        </label>
        <div className="grid">
          <input
            className="
                bg-gray-300 ml-4 
                form-input px-4 
                py-3 rounded-full
                font-bold text-red-500'
            "
            ref={nameRef}
            type="text"
            onBlur={nameBlurHandler}
          />
          {nameIsInvalid && (
            <p className="ml-6 text-red-400">
              Please enter your name <span>*</span>
            </p>
          )}
        </div>
      </div>
      {/* City Input */}
      <div className="flex items-center">
        <label className="text-xl tracking-wilder font-bold text-red-500 items-center">
          City Address:
        </label>
        <div className="grid">
          <input
            className="
                bg-gray-300 ml-4 
                form-input px-4 
                py-3 rounded-full
                font-bold text-red-500'
            "
            ref={cityRef}
            type="text"
            onBlur={cityBlurHandler}
          />
          {cityIsInvalid && (
            <p className="ml-6 text-red-400">
              Please enter your city address <span>*</span>
            </p>
          )}
        </div>
      </div>
      {/* Street Input */}
      <div className="flex items-center">
        <label className="text-xl tracking-wilder font-bold text-red-500 items-center">
          Street Address:
        </label>
        <div className="grid">
          <input
            className="
                bg-gray-300 ml-4 
                form-input px-4 
                py-3 rounded-full
                font-bold text-red-500'
            "
            ref={streetAddressRef}
            type="text"
            onBlur={streetBlurHandler}
          />
          {streetIsInvalid && (
            <p className="ml-6 text-red-400">
              Please enter your street address <span>*</span>
            </p>
          )}
        </div>
      </div>
      {/* PostalCode Input */}
      <div className="flex items-center">
        <label className="text-xl tracking-wilder font-bold text-red-500 items-center">
          Postal Code:
        </label>
        <div className="grid">
          <input
            className="
                bg-gray-300 ml-4 
                form-input px-4 
                py-3 rounded-full
                font-bold text-red-500'
            "
            ref={postalCodeRef}
            type="number"
            onBlur={postalCodeBlurHandler}
          />
          {postalCodeIsInvalid && (
            <p className="ml-6 text-red-400">
              Please enter your postal-code <span>*</span>
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          disabled={!formInputsValidity}
          className="
                bg-red-500 font-bold p-2 
                w-40 mr-3 rounded-full 
                text-white"
        >
          Confirm
        </button>
        <button
          type="button"
          className="border-red-500 
                font-bold border-2 text-red-500 
                transition ease-in-out hover:bg-red-500 
                hover:text-white p-2 w-40 rounded-full"
          onClick={closeCart}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
