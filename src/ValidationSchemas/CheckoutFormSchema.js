import * as Yup from "yup";

export const CheckoutFormSchema = (t) => Yup.object()
  .shape({
    email: Yup.string()
      .trim()
      .email(t("validators.auth.validEmail"))
      .required(t("validators.auth.emailRequired")),
    firstName: Yup.string().trim().required(t("validators.auth.firstName")),
    lastName: Yup.string().trim().required(t("validators.auth.lastName")),
    address: Yup.string().trim().required(t("validators.checkoutForm.address")),
    aptSuite: Yup.string()
      .trim()
      .required(t("validators.checkoutForm.aptSuite")),
    city: Yup.string().trim().required(t("validators.checkoutForm.city")),
    state: Yup.string().trim().required(t("validators.checkoutForm.state")),
    tel: Yup.string().trim().required(t("validators.checkoutForm.phone")),
    postalCode: Yup.string()
      .trim()
      .required(t("validators.checkoutForm.postalCode")),
    cardHolder: Yup.string()
      .trim()
      .required(t("validators.checkoutForm.cardHolder")),
    cardNumber: Yup.string()
      .trim()
      .required(t("validators.checkoutForm.cardNumber"))
      .matches(/^\d+$/, t("validators.checkoutForm.cardNumberMatch"))
      .min(9, t("validators.checkoutForm.cardNumberMin")),
    standard: Yup.boolean(),
    express: Yup.boolean(),
  })
  .test(
    "delivery-method",
    t("validators.checkoutForm.deliveryMethod"),
    function (value) {
      const { standard, express } = value;
      if (!standard && !express) {
        return this.createError({
          path: "standard", // Path to the first radio button
          message: t("validators.checkoutForm.deliveryMethod"),
        });
      }
      return this.createError({
        path: "",
        message: "",
      }) || true;
    }
  );
  
