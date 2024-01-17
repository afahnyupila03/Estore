import * as Yup from "yup";
import { auth } from "../FirebaseConfigs/Firesbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const isEmailTaken = async (email) => {
  try {
    // Use the appropriate method to check if the email is already in use
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      "tempPassword"
    );
    // If the above operation succeeds, it means the email is not taken
    // You can handle this according to your specific use case
    // For example, you can log the userCredential and return false
    console.log("User credential:", userCredential);
    return false;
  } catch (error) {
    // If an error occurs, check if it's "auth/email-already-in-use"
    if (error.code === "auth/email-already-in-use") {
      // If the error is "auth/email-already-in-use", it means the email is already taken
      return true;
    } else {
      // Handle other errors if needed
      console.error("Error:", error);
      return false; // or handle other errors accordingly
    }
  }
};

export const isWrongPassword = (error) => {
  return error.code === "auth/wrong-password";
};

export const SignUpAuthSchema = Yup.object().shape({
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
    .min(4, "Must be a min of 4 characters!")
    .required("* First name is required!"),
  lastName: Yup.string()
    .trim()
    .min(4, "Must be a min of 4 characters!")
    .required("* Last name is required!"),
  password: Yup.string()
    .trim()
    .matches(passwordRegex, { message: "Please create a strong password" })
    .required("* Password is required!"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords do not match!")
    .required("* Confirm password is required!"),
});

export const LoginAuthSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("*Please enter a valid email")
    .required("*Email is required to sign into account"),
  password: Yup.string()
    .trim()
    .required("* Password is required!")
    .test(
      "check-wrong-credentials",
      "Invalid email or password",
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
