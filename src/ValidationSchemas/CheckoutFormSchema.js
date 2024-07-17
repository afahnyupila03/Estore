import * as Yup from "yup";

export const CheckoutFormSchema = Yup.object()
  .shape({
    email: Yup.string()
      .trim()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    firstName: Yup.string().trim().required("Please enter first name"),
    lastName: Yup.string().trim().required("Please enter your last name"),
    address: Yup.string().trim().required("Please enter your address"),
    aptSuite: Yup.string()
      .trim()
      .required("Please enter your apartment / suite etc"),
    city: Yup.string().trim().required("Please enter your city name"),
    state: Yup.string().trim().required("Please enter your state name"),
    tel: Yup.string().trim().required("Please enter your phone number"),
    postalCode: Yup.string().trim().required("Please enter your postal code"),
    cardHolder: Yup.string()
      .trim()
      .required("Please enter name on bank card / mobile number name"),
    cardNumber: Yup.string()
      .trim()
      .required("Please enter bank number / mobile number")
      .matches(/^\d+$/, "The card number must contain only digits")
      .min(9, "The card number must be at least 9 digits long"),
    standard: Yup.boolean(),
    express: Yup.boolean(),
  })
  .test(
    "delivery-method",
    "Please select either standard or express delivery",
    function (value) {
      const { standard, express } = value;
      if (!standard && !express) {
        return this.createError({
          path: "standard", // Path to the first radio button
          message: "Please select either standard or express delivery",
        });
      }
      return true;
    }
  );
