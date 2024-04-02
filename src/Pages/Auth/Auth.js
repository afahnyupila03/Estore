import { Field, Form, Formik } from "formik";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import CustomTextInput from "../../Components/TextInput";
import {
  SignUpAuthSchema,
  LoginAuthSchema,
} from "../../ValidationSchemas/AuthSchemas";
import { useState } from "react";
import { useAuth } from "../../Store";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const { signUpHandler, signInHandler } = useAuth();

  const handleExistingUserAuth = () => {
    setIsSignUp(!isSignUp);
  };

  const handleCreateUser = async (values, actions) => {
    try {
      await signUpHandler(
        values.email,
        values.password,
        values.firstName,
        values.lastName,
        values.confirmPassword
      );
      actions.resetForm({
        values: {
          email: " ",
          firstName: " ",
          lastName: " ",
          password: " ",
          confirmPassword: "",
        },
      });
    } catch (error) {
      console.error(`Sign up error: ${error}`);
    }
  };
  const handleUserLogin = async (values, actions) => {
    try {
      await signInHandler(values.email, values.password);
      actions.resetForm({
        values: {
          email: " ",
          password: " ",
        },
      });
    } catch (error) {
      console.error(`sign in error: ${error}`);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={isSignUp ? SignUpAuthSchema : LoginAuthSchema}
        onSubmit={isSignUp ? handleCreateUser : handleUserLogin}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form className="column">
            <Field
              component={CustomTextInput}
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Email Address"
              placeholder="Enter Email"
              autoComplete="false"
              className="grid justify-center"
            />
            {isSignUp ? (
              <Field
                component={CustomTextInput}
                id="firstName"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                label="First Name"
                placeholder="First Name"
                autoComplete="false"
                className="grid justify-center"
              />
            ) : (
              ""
            )}
            {isSignUp ? (
              <Field
                component={CustomTextInput}
                id="lastName"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Last Name"
                placeholder="Last Name"
                autoComplete="false"
                className="grid justify-center"
              />
            ) : (
              ""
            )}
            <Field
              component={CustomTextInput}
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Password"
              placeholder="Enter Password"
              autoComplete="false"
              className="grid justify-center"
            />
            {isSignUp ? (
              <Field
                component={CustomTextInput}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Confirm Password"
                placeholder="Confirm Password"
                autoComplete="false"
                className="grid justify-center"
              />
            ) : (
              ""
            )}

            <div className="my-4 flex justify-center">
              <button
                className="font-semibold font-mono"
                type="button"
                onClick={handleExistingUserAuth}
              >
                {isSignUp
                  ? "Already a user ? Login."
                  : "New user ? Create an account."}
              </button>
            </div>

            <div className="my-4 w-full flex justify-center text-white">
              <button
                disabled={isSubmitting}
                className="bg-gray-500 font-semibold text-lg font-mono text-black px-6 py-2 rounded"
                type="submit"
              >
                {isSubmitting ? (
                  <UseAnimation animation={loading} />
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
