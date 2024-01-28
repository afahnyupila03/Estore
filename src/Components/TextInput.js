import React from "react";
import AmericanExpress from "../Assets/Cards/american-express.png";
import Mastercard from "../Assets/Cards/master.png";
import Discover from "../Assets/Cards/discover.png";
import Visa from "../Assets/Cards/visa.png";

export default function CustomTextInput({
  field,
  form,
  renderCardImage,
  ...props
}) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const { label, type, placeholder } = props;

  const inputField = {
    backgroundColor: "#9ca3af",
    borderRadius: ".4rem",
    padding: ".5rem",
    textAlign: "left",
    margin: ".5rem",
    width: "20rem",
    color: "#020617",
  };
  const errorInput = {
    backgroundColor: "#9ca3af",
    borderRadius: ".4rem",
    padding: ".5rem",
    textAlign: "left",
    margin: ".5rem",
    width: "20rem",
    borderColor: "red",
    borderWidth: ".15rem",
    color: "#020617",
  };

  // Function to detect the card type based on the card number
  const getCardType = (cardNumber) => {
    // Visa
    var visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;

    // Mastercard
    var mastercardRegex = /^5[1-5][0-9]{14}$/;

    // American Express
    var amexRegex = /^3[47][0-9]{13}$/;

    // Discover
    var discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    if (visaRegex.test(cardNumber)) {
      return "visa";
    } else if (mastercardRegex.test(cardNumber)) {
      return "mastercard";
    } else if (amexRegex.test(cardNumber)) {
      return "amex";
    } else if (discoverRegex.test(cardNumber)) {
      return "discover";
    }
  };

  const cardType = getCardType(value);

  return (
    <div className="grid justify-center">
      <label htmlFor={name} className="font-semibold font-mono ">
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          placeholder={placeholder}
          style={errors[name] && touched[name] ? errorInput : inputField}
          {...props}
        />
        {/* Display the detected card type image if renderCardImage is true */}
        {renderCardImage && cardType && (
          <img
            src={
              cardType === "amex"
                ? AmericanExpress
                : cardType === "mastercard"
                ? Mastercard
                : cardType === "discover"
                ? Discover
                : cardType === "visa"
                ? Visa
                : null
            }
            alt={cardType}
            className="w-10 h-10 mr-4"
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
      {/* style error message */}
      {errors[name] && touched[name] && (
        <p style={{ color: "red" }}>{errors[name]}</p>
      )}
    </div>
  );
}

export function CustomCheckbox({ field, form, ...props }) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const { label, type } = props;

  return (
    <div>
      <div className="flex justify-center">
        <input
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...props}
        />

        <span className="mx-4">{label}</span>
      </div>
      <div className="flex justify-center">
        {errors[name] && touched[name] && (
          <p style={{ color: "red" }}>{errors[name]}</p>
        )}
      </div>
    </div>
  );
}
