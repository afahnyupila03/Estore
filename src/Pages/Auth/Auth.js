// TODO: USE FORMIK INSTEAD OF THE TRADITIONAL FORM ELEMENTS
// TODO: IMPLEMENT THROTTLING OR DEBOUNCING TO STOP RE-RENDER LISTENING TO EVERY KEY STROKE.

import { useState } from "react";
import Modal from "../../Components/UI/Modal";
import { Field, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { closed, locked } from "react-icons-kit/iconic";

const Login = () => {
  const path = window.location.pathname;

  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)

  const handleUserSignup = async (email, password) => {};
  const handleUserLogin = async ({ email = "", password = "" }) => {};

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
                iconName={closed}
                placeholder={values.email}
                autoCapitalize="none"
                type="emailAddress"
                autoCorrect={false}
                autoCompleteType="email"
                editable
              />
              <Field
                component={CustomTextInput}
                iconName={locked}
                onChange={(e) => { setFieldValue('password', e)}}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              {error?.message && (<p>{error.message}</p>)}

              <button
              disabled={!isValid || !values?.email || !values.email.trim() || loading}
              onClick={handleSubmit}
              >
                <p>{isSignUp ? "signup" : "login"}</p>
              </button>
            </>
          )}
        </Formik>

        <input type="emil" placeholder="enter email" />
        <input type="password" placeholder="enter password" />
      </Modal>
    </div>
  );
};

export default Login;
