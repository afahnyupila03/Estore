// TODO: USE FORMIK INSTEAD OF THE TRADITIONAL FORM ELEMENTS
// TODO: IMPLEMENT THROTTLING OR DEBOUNCING TO STOP RE-RENDER LISTENING TO EVERY KEY STROKE.

import { useState } from "react";
import Modal from "../../Components/UI/Modal";
import { Field, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { closed, locked } from "react-icons-kit/iconic";

const Login = () => {
  const path = window.location.pathname;

  const [isSignup, setIsSignup] = useState(true);

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
        {/* <form onSubmit={submitHandler} className="items-center">
          <div>
            <label>email</label>
            <input
              className="rounded ml-2 "
              placeholder="Email"
              value={enteredEmail}
              onChange={emailChangeHandler}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className="rounded ml-2"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
          </div>
          <button
            className="bg-red-200 p-2 rounded text-white"
          >
          Login
          </button>
          <div>
            <p>Already have an account ?</p>
            <button>
            </button>
          </div>
        </form> */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={"still to apply"}
          onSubmit={isSignup ? handleUserSignup : handleUserLogin}
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

              <div></div>
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
