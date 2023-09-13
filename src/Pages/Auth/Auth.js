// TODO: USE FORMIK INSTEAD OF THE TRADITIONAL FORM ELEMENTS
// TODO: IMPLEMENT THROTTLING OR DEBOUNCING TO STOP RE-RENDER LISTENING TO EVERY KEY STROKE.

import { useState } from "react";
import Modal from "../../Components/UI/Modal";
import { Field, Formik } from "formik";
import { useQuery } from "react-query";
import CustomTextInput from "../../Components/TextInput";
import { closed } from "react-icons-kit/iconic/closed";
import { locked } from "react-icons-kit/iconic/locked";

const Login = ({ onHideAuthModal, userName, handleUserName }) => {
  const path = window.location.pathname;

  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const { isLoading } = useQuery();

  const handleUserSignup = async (email, password) => {};
  const handleUserLogin = async ({ email = "", password = "" }) => {};

  const submitHandler = (e) => {
    e.preventDefault();
    // userName(userName)
  };

  return (
    <div
      style={{
        backgroundImage:
          path === "/login" || path === "/signup"
            ? 'url("./auth-bgImage.jpeg")'
            : null,
      }}
    >
      <Modal>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={"still to apply"}
          onSubmit={isSignUp ? handleUserSignup : handleUserLogin}
        >
          {({ handleSubmit, isValid, values, setFieldValue }) => (
            <>
              <Field
                component={CustomTextInput}
                name="email"
                label="Email"
                iconName={closed}
                value={values.email}
                placeholder="Email"
                autoCapitalize="none"
                type="emailAddress"
                autoCorrect="false"
                autoCompleteType="email"
              />
              <Field
                component={CustomTextInput}
                iconName={locked}
                label="Password"
                onChange={(e) => {
                  setFieldValue("password", e);
                }}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              {error?.message && <p>{error.message}</p>}

              <button
                disabled={
                  !isValid || !values?.email || !values.email.trim() || loading
                }
                onClick={handleSubmit}
              >
                <p>{isSignUp ? "signup" : "login"}</p>
              </button>
            </>
          )}
        </Formik>
        <p>
          <p>
            {isSignUp ? "Already have an account " : "Don't have account ?"}
          </p>
          <p onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Signup"}
          </p>
        </p>
        <button onClick={onHideAuthModal}>Cancel</button>

        <form onSubmit={submitHandler}>
          <label>Input username</label>
          <input
            placeholder="Enter user name"
            value={userName}
            onChange={handleUserName}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
