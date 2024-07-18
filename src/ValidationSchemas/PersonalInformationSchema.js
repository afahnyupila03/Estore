import * as Yup from "yup";
import { passwordRegex } from "./AuthSchemas";

export const EditNameSchema = Yup.object().shape({
  firstName: Yup.string().trim().required(t("validators.auth.firstName")),
  lastName: Yup.string().trim().required(t("validators.auth.lastName")),
});

export const ReAuthSchema = Yup.object().shape({
  email: Yup.string()
    .email(t("validators.auth.validEmail"))
    .required(t("validators.auth.emailRequired")),
  password: Yup.string().trim().required(t("validators.auth.passwordRequired")),
});

export const ChangeEmailSchema = Yup.object().shape({
  currentEmail: Yup.string()
    .trim()
    .email(t("validators.auth.validEmail"))
    .required(t("validators.auth.emailRequired")),
  newEmail: Yup.string()
    .trim()
    .email(t("validators.auth.validEmail"))
    .test(
      "not-same-as-current",
      t("validators.personalInfor.newEmailCheck"),
      function (value) {
        return value !== this.parent.currentEmail;
      }
    )
    .required(t("validators.personalInfor.newEmail")),
});

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .trim()
    .required(t("validators.personalInfor.currentPassword")),
  newPassword: Yup.string()
    .trim()
    .matches(passwordRegex, {
      message: t("validators.personalInfor.strongPassword"),
    })
    .test(
      "not-same-as-current",
      t("validators.personalInfor.newPasswordCheck"),
      function (value) {
        return value !== this.parent.currentPassword;
      }
    ),
});
