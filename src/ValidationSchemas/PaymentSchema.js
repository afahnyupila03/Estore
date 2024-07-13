import * as Yup from "yup";

const phoneNumberRegex = /^(?:\+237|237)?(6[5789]\d{7})$/;

export const BankPaymentSchema = Yup.object().shape({
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
  firstName: Yup.string().trim().required("Please enter your first name."),
  lastName: Yup.string().trim().required("Please enter your last name"),
  
});

export const MobilePaymentSchema = Yup.object().shape({
  accountNumber: Yup.string()
    .matches(
      phoneNumberRegex,
      "Phone number is not a valid MTN / ORANGE number"
    )
    .required("Please enter MTN / ORANGE number"),
  accountName: Yup.string().required("Please enter your name"),
});
