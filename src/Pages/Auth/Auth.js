// TODO: USE FORMIK INSTEAD OF THE TRADITIONAL FORM ELEMENTS
// TODO: IMPLEMENT THROTTLING OR DEBOUNCING TO STOP RE-RENDER LISTENING TO EVERY KEY STROKE.
// TODO: WRITE LOGIC TO IDENTIFYING IF USER EMAILS EXIST OR NOT

import { useState } from "react";
import { Field, Formik } from "formik";
import { useQuery } from "react-query";
import CustomTextInput from "../../Components/TextInput";
import { useTranslation } from "react-i18next";
import { creditCard } from "react-icons-kit/fa";
import { ic_local_shipping_outline } from "react-icons-kit/md";
import { Link } from "react-router-dom";
import IconName from "../../Components/Icon";
import NewsSignUpPage from "./NewsSignUpPage";

const Login = ({ onHideAuthModal, userName, handleUserName }) => {
  const path = window.location.pathname;

  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { isLoading } = useQuery();

  const required = () => {
    return <span className="text-red-700">*</span>;
  };

  const handleUserSignup = async (email, password) => {};
  const handleUserLogin = async ({ email = "", password = "" }) => {};

  const submitHandler = (e) => {
    e.preventDefault();
    // userName(userName)
  };

  return (
    <div
      style={{
        marginTop: "10rem",
        marginBottom: "10rem",
      }}
      className="border-black border-2"
    >
      <div>
        <h3>{t("auth.signInCreateAccount")}</h3>
        <h3>{t("auth.signIn")}</h3>
        <h3>{t("auth.createAccount")}</h3>

        <div className="px-4 py-2">
          <div className="flex">
            {/* bank card icon */}
            <IconName icon={creditCard} style={{ marginRight: "1rem" }} />
            <p>{t("auth.checkOutFaster")}</p>
          </div>
          <div className="flex">
            {/* delivery truck icon */}
            <IconName
              icon={ic_local_shipping_outline}
              style={{ marginRight: "1rem" }}
            />
            <p>{t("auth.trackEasily")}</p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        validationSchema={"still to apply"}
        onSubmit={isSignUp ? handleUserSignup : handleUserLogin}
      >
        {({ handleSubmit, isValid, values, setFieldValue }) => (
          <>
            <Field
              component={CustomTextInput}
              name="email"
              label={t("auth.email")}
              value={values.email}
              autoCapitalize="none"
              type="emailAddress"
              autoCorrect="false"
              autoCompleteType="email"
            />
            <Field
              component={CustomTextInput}
              name="firstName"
              label={t("auth.firstName")}
              value={values.firstName}
              autoCapitalize="true"
              type="text"
              autoCorrect="false"
              autoCompleteType="firstName"
            />
            <Field
              component={CustomTextInput}
              name="lastName"
              label={t("auth.lastName")}
              value={values.lastName}
              autoCapitalize="true"
              type="text"
              autoCorrect="false"
              autoCompleteType="lastName"
            />
            <Field
              component={CustomTextInput}
              label={t("auth.password")}
              onChange={(e) => {
                setFieldValue("password", e);
              }}
              name="password"
              secureTextEntry
            />
            {error?.message && <p>{error.message}</p>}

            <div className="flex">
              {/* Add checkbox */}
              <p>{t("auth.keepSignedIn")}</p>
              <Link className="border-b-2 border-black mx-40">
                {t("actions.details")}
              </Link>
            </div>

            <div className="text-center">
              By tapping Next, you agree to our{" "}
              <Link className="border-b-2 border-black" to="privacy-policy">
                {t("actions.privacyPolicy")}
              </Link>{" "}
              and{" "}
              <Link
                className="border-b-2 border-black"
                to="terms&amp;condition"
              >
                {t("actions.termsConditions")}
              </Link>
            </div>
            <div className="text-center">
              By creating an account, you agree to our{" "}
              <Link className="border-b-2 border-black" to="privacy-policy">
                {t("actions.privacyPolicy")}
              </Link>{" "}
              and{" "}
              <Link
                className="border-b-2 border-black"
                to="terms&amp;condition"
              >
                {t("actions.termsConditions")}
              </Link>
            </div>

            <button>{t("actions.next")}</button>
            <br />
            <button onClick={handleSubmit}>{t("actions.signIn")}</button>
            <br />
            <button>{t("actions.createAccount")}</button>
          </>
        )}
      </Formik>
      <NewsSignUpPage />
    </div>
  );
};

export default Login;
