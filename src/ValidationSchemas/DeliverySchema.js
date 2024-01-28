import * as Yup from "yup";

export const DeliveryAddressSchema = Yup.object().shape({
  userName: Yup.string().trim().required("Please enter user name"),
  address: Yup.string().required("Please enter a delivery address."),
});
