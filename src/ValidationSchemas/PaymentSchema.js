import * as Yup from "yup";

const phoneNumberRegex = /^(?:\+237|237)?(6[5789]\d{7})$/;
const cardNumberRegex =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;

export const BankPaymentSchema = (t) => Yup.object().shape({
  cardNumber: Yup.string()
    .matches(cardNumberRegex, t("validators.payment.invalidCardNumber"))
    .required(t("validators.payment.cardNumberRequired")),
  expiryDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
      t("validators.payment.expiryDateRequired")
    )
    .required(t("validators.payment.expiryDateRequired")),
  securityCode: Yup.string().when("cardNumber", {
    is: (val) => /^3[47]/.test(val),
    then: Yup.string()
      .matches(/^[0-9]{4}$/, t("validators.payment.securityCodeAmerican"))
      .required(t("validators.payment.securityCodeRequired")),
    otherwise: Yup.string()
      .matches(/^[0-9]{3}$/, t("validators.payment.securityCodeVisa"))
      .required(t("validators.payment.securityCodeRequired")),
  }),
  firstName: Yup.string().trim().required(t("validators.auth.firstName")),
  lastName: Yup.string().trim().required(t("validators.auth.lastName")),
});

export const MobilePaymentSchema = (t) => Yup.object().shape({
  accountNumber: Yup.string()
    .matches(phoneNumberRegex, t("validators.payment.accountNumber"))
    .required(t("validators.payment.accountNumberRequired")),
  accountName: Yup.string().required(t("validators.payment.accountName")),
});
