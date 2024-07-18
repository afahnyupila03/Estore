import * as Yup from "yup";
import { auth } from "../FirebaseConfigs/Firesbase";
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useTranslation } from "react-i18next";

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const isEmailTaken = async (email) => {
  const { t } = useTranslation();
  try {
    // Use the appropriate method to check if the email is already in use with Firebase Authentication
    const methods = await fetchSignInMethodsForEmail(auth, email);
    // If methods array is not empty, it means the email is already in use
    return methods.length > 0;
  } catch (error) {
    console.error("Error:", error);
    return false; // Return false to indicate that the email is not taken (or handle other errors accordingly)
  }
};

export const isWrongPassword = (error) => {
  return error.code === "auth/wrong-password";
};

export const SignUpAuthSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email(t("validators.auth.validEmail"))
    .test("email-is-taken", t("validators.auth.emailTaken"), async (value) => {
      // CHECK FOR IS EMAIL ALREADY EXIST
      const isTaken = await isEmailTaken(value);
      // RETURN THE OPPOSITE RESULT IF EMAIL DOESN'T EXIST.
      return !isTaken;
    })
    .required(t("validators.auth.emailRequired")),
  firstName: Yup.string()
    .trim()
    .min(4, t("validators.auth.minChar"))
    .required(t("validators.auth.firstName")),
  lastName: Yup.string()
    .trim()
    .min(4, t("validators.auth.minChar"))
    .required(t("validators.auth.lastName")),
  password: Yup.string()
    .trim()
    .matches(passwordRegex, {
      message: t("validators.personalInfor.strongPassword"),
    })
    .required(t("validators.auth.passwordRequired")),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], t("validators.auth.confirmPassword"))
    .required(t("validators.auth.confirmPasswordRequired")),
});

export const LoginAuthSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email(t("validators.auth.validEmail"))
    .required(t("validators.auth.emailRequired")),
  password: Yup.string()
    .trim()
    .required(t("validators.auth.passwordRequired"))
    .test(
      "check-wrong-credentials",
      t("validators.auth.invalidEmailPassword"),
      async function (value) {
        try {
          // Use the appropriate method to sign in with email and password
          await signInWithEmailAndPassword(auth, this.parent.email, value);
          return true; // No error, return true
        } catch (error) {
          if (
            error.code === "auth/user-not-found" ||
            error.code === "auth/wrong-password"
          ) {
            // If the error is "auth/user-not-found" or "auth/wrong-password", it means wrong credentials
            return false; // Return false to indicate validation failure
          } else {
            // Handle other errors if needed
            console.error("Error:", error);
            return true; // Return true to indicate validation success for other errors
          }
        }
      }
    ),
});
