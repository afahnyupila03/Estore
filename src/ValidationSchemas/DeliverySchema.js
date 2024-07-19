import * as Yup from "yup";

export const DeliveryAddressSchema = (t) => Yup.object().shape({
  firstName: Yup.string().trim().required(t("validators.auth.firstName")),
  lastName: Yup.string().trim().required(t("validators.auth.lastName")),
  address: Yup.string().required(t("validators.checkoutForm.address")),
  aptSuite: Yup.string().trim().required(t("validators.checkoutForm.aptSuite")),
  zip: Yup.string().trim().required(t("validators.checkoutForm.postalCode")),
  city: Yup.string().trim().required(t("validators.checkoutForm.city")),
  state: Yup.string().trim().required(t("validators.checkoutForm.state")),
});
