import { Form, Formik } from "formik";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import { CustomInput } from "../../Components/TextInput";
import {
  SignUpAuthSchema,
  LoginAuthSchema,
} from "../../ValidationSchemas/AuthSchemas";
import { useState } from "react";
import { useAuth } from "../../Store";
import { useTranslation } from "react-i18next";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUpHandler, signInHandler } = useAuth();
  const { t } = useTranslation();

  const handleExistingUserAuth = () => {
    setTimeout(() => {
      setIsSignUp((prevAuthState) => !prevAuthState);
    }, 1000);
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
    <div
      className="mt-10 mb-10 
    flex items-center 
    justify-center min-h-screen"
    >
      <Formik
        initialValues={
          isSignUp
            ? {
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                confirmPassword: "",
              }
            : {
                email: "",
                password: "",
              }
        }
        validationSchema={isSignUp ? SignUpAuthSchema : LoginAuthSchema}
        onSubmit={isSignUp ? handleCreateUser : handleUserLogin}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form className="w-full bg-gray-300 py-10 max-w-md rounded-lg shadow-xl">
            <h1
              className="text center 
            font-medium text-2xl my-4
            flex justify-center"
            >
              {isSignUp ? `${t("auth.createAccount")}` : `${t("auth.signIn")}`}
            </h1>

            <CustomInput
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("auth.enterEmail")}
              label={t("auth.email")}
              errors={errors}
              touched={touched}
            />

            {isSignUp && (
              <CustomInput
                id="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                name="firstName"
                type="text"
                value={values.firstName}
                placeholder={t("auth.firstName")}
                label={t("auth.firstName")}
                errors={errors}
                touched={touched}
              />
            )}
            {isSignUp && (
              <CustomInput
                id="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                name="lastName"
                type="text"
                value={values.lastName}
                placeholder={t("auth.lastName")}
                label={t("auth.lastName")}
                errors={errors}
                touched={touched}
              />
            )}

            <CustomInput
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              placeholder={t("auth.enterPassword")}
              label={t("auth.password")}
              togglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
              errors={errors}
              touched={touched}
            />
            {isSignUp && (
              <CustomInput
                id="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                placeholder={t("auth.confirmPassword")}
                label={t("auth.confirmPassword")}
                toggleShowConfirmPassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                showConfirmPassword={showConfirmPassword}
                errors={errors}
                touched={touched}
              />
            )}

            <div className="my-4 flex justify-center">
              <button
                className="font-medium text-lg"
                type="button"
                onClick={handleExistingUserAuth}
              >
                {isSignUp ? `${t("auth.user")}` : `${t("auth.newUser")}`}
              </button>
            </div>

            <div className="my-4 w-full flex justify-center text-white">
              <button
                disabled={isSubmitting}
                className="bg-gray-500 font-medium text-lg text-black px-6 py-2 rounded"
                type="submit"
              >
                {isSignUp ? (
                  <>
                    {t("auth.createAccount")}
                    {isSubmitting && (
                      <UseAnimation className="ml-4" animation={loading} />
                    )}
                  </>
                ) : (
                  <>
                    {t("auth.signIn")}
                    {isSubmitting && (
                      <UseAnimation className="ml-4" animation={loading} />
                    )}
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
