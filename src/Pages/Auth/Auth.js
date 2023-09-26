// TODO: USE FORMIK INSTEAD OF THE TRADITIONAL FORM ELEMENTS
// TODO: IMPLEMENT THROTTLING OR DEBOUNCING TO STOP RE-RENDER LISTENING TO EVERY KEY STROKE.

import { useState } from "react";
import Modal from "../../Components/UI/Modal";
import { Field, Formik } from "formik";
import { useQuery } from "react-query";
import CustomTextInput from "../../Components/TextInput";
import { closed } from "react-icons-kit/iconic/closed";
import { useTranslation } from "react-i18next";
import { locked } from "react-icons-kit/iconic/locked";

const Login = ({ onHideAuthModal, userName, handleUserName }) => {
  const path = window.location.pathname;

  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
                label={t("auth.email")}
                iconName={closed}
                value={values.email}
                placeholder={t("auth.email")}
                autoCapitalize="none"
                type="emailAddress"
                autoCorrect="false"
                autoCompleteType="email"
              />
              <Field
                component={CustomTextInput}
                iconName={locked}
                label={t("auth.password")}
                onChange={(e) => {
                  setFieldValue("password", e);
                }}
                name="password"
                placeholder={t("auth.password")}
                secureTextEntry
              />
              {error?.message && <p>{error.message}</p>}

              <button
                disabled={
                  !isValid || !values?.email || !values.email.trim() || loading
                }
                onClick={handleSubmit}
              >
                <p>{isSignUp ? `${t("auth.signup")}` : `${t("auth.login")}`}</p>
              </button>
            </>
          )}
        </Formik>
        <div>
          <p>
            {isSignUp ? `${t('auth.alreadyHave')}` : `${t('auth.newUser')}`}
          </p>
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? `${t("auth.login")}` : `${t("auth.signup")}`}
          </button>
        </div>
        <button onClick={onHideAuthModal}>{t("auth.cancel")}</button>
      </Modal>
    </div>
  );
};

export default Login;
