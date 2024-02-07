import * as Yup from "yup";

export const PaymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/,
      "Invalid Card Number"
    )
    .required("Card number is required"),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Invalid expiry date")
    .required("Expiry date is required"),
  securityCode: Yup.string()
    .matches(/^[0-9]{3}$/, "Invalid security code")
    .required("Security code is required"),
  cardHolder: Yup.string().trim().required("Please enter your name."),
});
