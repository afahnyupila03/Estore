import React from "react";
import AmericanExpress from "../Assets/Cards/american-express.png";
import Mastercard from "../Assets/Cards/master.png";
import Discover from "../Assets/Cards/discover.png";
import Visa from "../Assets/Cards/visa.png";
import Mtn from "../Assets/Cards/MTN.jpg";
import Orange from "../Assets/Cards/orange.png";
import { Field } from "formik";
import { IonIcon } from "@ionic/react";
import { eyeOffOutline, eyeOutline, eyeSharp } from "ionicons/icons";

const getCardType = (cardNumber) => {
  const visaRegex = /^(?<VISA>4\d{3}[\s-]?(?:\d{4}[\s-]?){2}\d(?:\d{3})?)$/;
  const mastercardRegex =
    /^(?<MASTERCARD>5[1-5]\d{2}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4})$/;
  const amexRegex = /^(?<AMEX>3[47]\d{13,14})$/;
  const discoverRegex = /^(?<DISCOVER>6(?:011|22(?:[2-8]|9\d))\d{12})$/;
  const orangeCameroonRegex = /^(6[5-7]\d{7})$/;
  const mtnCameroonRegex = /^(6[8-9]\d{7})$/;

  if (visaRegex.test(cardNumber)) {
    return "visa";
  } else if (mastercardRegex.test(cardNumber)) {
    return "mastercard";
  } else if (amexRegex.test(cardNumber)) {
    return "amex";
  } else if (discoverRegex.test(cardNumber)) {
    return "discover";
  } else if (orangeCameroonRegex.test(cardNumber)) {
    return "orange";
  } else if (mtnCameroonRegex.test(cardNumber)) {
    return "mtn";
  } else {
    return "Invalid number";
  }
};

export default function CustomTextInput({
  field,
  form,
  renderCardImage,
  className,
  togglePassword,
  showPassword,
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

  const cardType = getCardType(value);

  return (
    <div className={className}>
      <label htmlFor={name} className="font-semibold font-mono ">
        {label}
      </label>
      <div>
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
                : cardType === "mtn"
                ? Mtn
                : cardType === "orange"
                ? Orange
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
  const { name, value, onChange, onBlur, checked } = field;
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
          checked={checked}
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

export function CustomSelect({ field, form, className, ...props }) {
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

  return (
    <div className={className}>
      <label htmlFor={name} className="font-semibold font-mono">
        {label}
      </label>
      <div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={errors[name] && touched[name] ? errorInput : inputField}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {errors[name] && touched[name] && (
        <div style={{ color: "red" }}>{errors[name]}</div>
      )}
    </div>
  );
}

export function CustomInput({
  id,
  className,
  name,
  label,
  type,
  onChange,
  onBlur,
  placeholder,
  value,
  as,
  children,
  row,
  togglePassword,
  showPassword,
  showConfirmPassword,
  toggleShowConfirmPassword,
  autoComplete,
  renderImage,
  errors,
  touched,
}) {
  const inputField = {
    backgroundColor: "#9ca3af",
    borderRadius: ".4rem",
    padding: ".5rem",
    width: "20rem",
    color: "#020617",
  };

  const errorStyle = {
    ...inputField,
    borderColor: "red",
    borderWidth: ".15rem",
  };

  const inputProps = {
    id,
    name,
    onChange,
    onBlur,
    value,
    className: className,
    autoComplete: autoComplete,
    placeholder,
    errors,
    touched,
  };

  const getCardType = (cardNumber) => {
    const visaRegex = /^(?<VISA>4\d{3}[\s-]?(?:\d{4}[\s-]?){2}\d(?:\d{3})?)$/;
    const mastercardRegex =
      /^(?<MASTERCARD>5[1-5]\d{2}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4})$/;
    const amexRegex = /^(?<AMEX>3[47]\d{13,14})$/;
    const discoverRegex = /^(?<DISCOVER>6(?:011|22(?:[2-8]|9\d))\d{12})$/;
    const orangeCameroonRegex = /^(6[5-7]\d{7})$/;
    const mtnCameroonRegex = /^(6[8-9]\d{7})$/;

    if (visaRegex.test(cardNumber)) {
      return "visa";
    } else if (mastercardRegex.test(cardNumber)) {
      return "mastercard";
    } else if (amexRegex.test(cardNumber)) {
      return "amex";
    } else if (discoverRegex.test(cardNumber)) {
      return "discover";
    } else if (orangeCameroonRegex.test(cardNumber)) {
      return "orange";
    } else if (mtnCameroonRegex.test(cardNumber)) {
      return "mtn";
    } else {
      return "Invalid number";
    }
  };

  const renderCardImage = () => {
    const cardType = getCardType(value);

    if (renderImage && cardType) {
      const cardTypeToImageMap = {
        amex: AmericanExpress,
        mastercard: Mastercard,
        discover: Discover,
        visa: Visa,
        mtn: Mtn,
        orange: Orange,
      };

      const imageSrc = cardTypeToImageMap[cardType];

      if (imageSrc) {
        return (
          <img
            src={imageSrc}
            alt={cardType}
            className="h-6 w-6 absolute 
            inset-y-0 right-0 pr-3 
            flex items-center text-sm 
            leading-3"
          />
        );
      }
    }
    return null;
  };

  const passwordToggle = () => {
    if ((name === "password" || name === "confirmPassword") && value) {
      return (
        <button
          type="button"
          onClick={
            name === "password" ? togglePassword : toggleShowConfirmPassword
          }
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {showPassword || showConfirmPassword ? (
            <IonIcon
              icon={eyeOffOutline}
              className="h-6 w-6"
              aria-hidden="true"
            />
          ) : (
            <IonIcon icon={eyeOutline} className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      );
    }
    return null;
  };

  return (
    <div className="sm:col-span-4 grid my-2 justify-center">
      <label htmlFor={id} className="block text-lg font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <div
          className="flex rounded-lg shadow-lg 
          ring-1 ring-inset ring-gray-900
          focus-within:ring-2 focus-within:ring-inset 
          focus-within:ring-gray-900 sm:max-w-md relative"
        >
          {as === "select" ? (
            <Field
              as="select"
              {...inputProps}
              style={errors[name] && touched[name] ? errorStyle : inputField}
            >
              {children}
            </Field>
          ) : as === "textarea" ? (
            <Field
              as="textarea"
              {...inputProps}
              rows={row || 3}
              style={errors[name] && touched[name] ? errorStyle : inputField}
            />
          ) : type === "checkbox" || type === "radio" ? (
            <Field
              type={type}
              {...inputProps}
              className={`form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ${className}`}
            />
          ) : (
            <Field
              type={type}
              {...inputProps}
              style={errors[name] && touched[name] ? errorStyle : inputField}
            />
          )}
          {passwordToggle()}
          {renderCardImage()}
        </div>
        {errors[name] && touched[name] && (
          <p className="text-red-500">{errors[name]}</p>
        )}
      </div>
    </div>
  );
}
