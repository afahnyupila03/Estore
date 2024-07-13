import * as Yup from "yup";
import { passwordRegex } from "./AuthSchemas";

export const EditNameSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("Please enter your first name"),
  lastName: Yup.string().trim().required("Please enter your last name"),
});

export const ReAuthSchema = Yup.object().shape({
  email: Yup.string()
    .email("please enter a valid email")
    .required("Please enter your email"),
  password: Yup.string().trim().required("Please enter your password"),
});

export const ChangeEmailSchema = Yup.object().shape({
  currentEmail: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  newEmail: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .test(
      "not-same-as-current",
      "New email can not be the same as current email",
      function (value) {
        return value !== this.parent.currentEmail;
      }
    )
    .required("Please enter your new email address"),
});

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .trim()
    .required("Please enter your current password"),
  newPassword: Yup.string()
    .trim()
    .matches(passwordRegex, { message: "Please a strong password" })
    .test(
      "not-same-as-current",
      "New password can not be the same as current password",
      function (value) {
        return value !== this.parent.currentPassword;
      }
    ),
});
