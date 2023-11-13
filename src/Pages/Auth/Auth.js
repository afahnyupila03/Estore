// TODO: USE FORMIK INSTEAD OF THE TRADITIONAL FORM ELEMENTS
// TODO: IMPLEMENT THROTTLING OR DEBOUNCING TO STOP RE-RENDER LISTENING TO EVERY KEY STROKE.
// TODO: IMPLEMENT FIREBASE ANONYMOUS SIGN-IN METHOD

import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useQuery } from "react-query";
import CustomTextInput from "../../Components/TextInput";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const { isLoading } = useQuery();

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.firstName) {
      errors.firstName = "First name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!values.password > 4) {
      errors.password = "Password must be more than 4 characters";
    }
    if (values.confirmPassword != values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // API call to validate submission
    setTimeout(() => {
      alert("Account created" + JSON.stringify(values, null, 4));
      setSubmitting(false);
      resetForm();
    }, 400);
  };

  const handleLogin = async (email, password) => {};
  const handleSignUp = async ({ email = "", password = "" }) => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Field
            component={CustomTextInput}
            name="email"
            label="Email"
            value={values.email}
            placeholder="Email"
            autoCapitalize="none"
            type="email"
            autoCorrect="false"
            autoCompleteType="email"
          />
          <Field
            component={CustomTextInput}
            name="firstName"
            label="First Name"
            value={values.firstName}
            placeholder="First Name"
            autoCapitalize="true"
            type="text"
            autoCorrect="false"
            autoCompleteType="text"
          />
          <Field
            component={CustomTextInput}
            name="lastName"
            label="Last Name"
            value={values.lastName}
            placeholder="Last Name"
            autoCapitalize="true"
            type="text"
            autoCorrect="false"
            autoCompleteType="text"
          />
          <Field
            component={CustomTextInput}
            label="Password"
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <Field
            component={CustomTextInput}
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry
          />
          {error?.message && <p>{error.message}</p>}

          <button
            disabled={isSubmitting}
            // onClick={handleSubmit}
          >
            {/* Relace submit with a condition, if email exist, show LOGIN, else NEXT */}
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
