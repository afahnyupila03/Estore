import * as Yup from "yup";
import { isEmailTaken } from "./NewsSubscriptionSchema";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Please enter valid email!")
    .test("email-is-taken", "Email already exist!", async (value) => {
      // CHECK FOR IS EMAIL ALREADY EXIST
      const isTaken = await isEmailTaken(value);
      // RETURN THE OPPOSITE RESULT IF EMAIL DOESN'T EXIST.
      return !isTaken;
    })
    .required("* Email is required"),
  firstName: Yup.string()
    .trim()
    .min(5, "Must be a min of 4 characters!")
    .required("* First name is required!"),
  lastName: Yup.string()
    .trim()
    .min(5, "Must be a min of 4 characters!")
    .required("* Last name is required!"),
  password: Yup.string()
    .trim()
    .matches(passwordRegex, { message: "Please create a strong password" })
    .required("* Password is required!"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords do not match!")
    .required("* Confirm password is required!"),
  checkbox: Yup.string().required("* Your must accept terms and condition to create account!"),
});
