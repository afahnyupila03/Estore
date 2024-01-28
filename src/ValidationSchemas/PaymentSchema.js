import * as Yup from "yup";

export const PaymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, "Invalid Card Number")
    .required("Card number is required"),
    expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Invalid expiry date")
    .required("Expiry date is required"),
  securityCode: Yup.string()
    .matches(/^[0-9]{3}$/, "Invalid security code")
    .required("Security code is required"),
});
