import * as Yup from "yup";

export const DeliveryAddressSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("Please enter your first name"),
  lastName: Yup.string().trim().required("Please enter your first name"),
  address: Yup.string().required("Please enter an address."),
  aptSuite: Yup.string()
    .trim()
    .required("Please enter your apartment name or number"),
  zip: Yup.string().trim().required("Please enter your zip or postal code"),
  city: Yup.string().trim().required("Please enter city name"),
  state: Yup.string().trim().required("Please enter your state name"),
});
