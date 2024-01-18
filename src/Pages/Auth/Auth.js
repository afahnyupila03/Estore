import { Field, Form, Formik } from "formik";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import CustomTextInput from "../../Components/TextInput";
import {
  SignUpAuthSchema,
  LoginAuthSchema,
} from "../../ValidationSchemas/AuthSchemas";
import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../FirebaseConfigs/Firesbase";

export default function () {
  const [isSignUp, setIsSignUp] = useState(true);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  console.log("Ui-state:", isSignUp);

  const handleExistingUserAuth = () => {
    setIsSignUp(!isSignUp);
  };

  const handleCreateUser = (values, actions) => {
    setTimeout(() => {
      console.log(values);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          console.log("User credentials:", userCredential);
          // Signed in
          const user = userCredential.user;
          // Update user profile with display name
          updateProfile(user, {
            displayName: `${values.firstName} ${values.lastName}`,
          })
            .then(() => {
              // Profile updated
              console.log("Firebase Console:", userCredential);
            })
            .catch((error) => {
              // An error occurred
              console.error(error);
              actions.setFieldError("password", error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          actions.setFieldError("email", errorMessage);
        });
      actions.resetForm({
        values: {
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        },
      });
    }, 1000);
  };

  const handleUserLogin = (values, actions) => {
    setTimeout(() => {
      console.log("Formik values:", values);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          console.log("User is Logged in: ", userCredential);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          actions.setFieldError("password", errorMessage);
        });
      actions.resetForm({
        values: {
          email: "",
          password: "",
        },
      });
    }, 1000);
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
