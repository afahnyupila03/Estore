import { Field, Form, Formik } from "formik";
import UseAnimation from "../../Components/Loader";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import github from "react-useanimations/lib/github";
import CustomTextInput, { CustomCheckbox } from "../../Components/TextInput";
import { AuthSchema } from "../../ValidationSchemas/AuthSchemas";
import NewsSubscriptionPage from "./NewsSubscriptionPage";
import { logoGithub } from "ionicons/icons";
import { useState } from "react";

export default function () {
  const [existingUser, setExistingUser] = useState(false);
  const handleExistingUserAuth = () => {
    setExistingUser(!existingUser);
  };

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      console.log(values);
      console.log(actions);
      actions.resetForm({
        values: {
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          checkbox: false,
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
          checkbox: false,
        }}
        validationSchema={AuthSchema}
        onSubmit={onSubmit}
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
            {!existingUser && (
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
            )}
            {!existingUser && (
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
            {!existingUser && (
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
            )}
            {!existingUser && (
              <Field
                type="checkbox"
                name="checkbox"
                id="checkbox"
                component={CustomCheckbox}
                value={values.checkbox}
                onChange={handleChange}
                onBlur={handleBlur}
                label="I accept the terms and conditions"
                autoComplete="false"
              />
            )}

            <div className="my-4 flex justify-center">
              <button
                className="font-semibold font-sans"
                type="button"
                onClick={handleExistingUserAuth}
              >
                {!existingUser
                  ? "Already a user ? Login."
                  : "New user ? Create an account."}
              </button>
            </div>

            <div className="my-4 flex justify-center text-white">
              <button
                disabled={isSubmitting}
                className="bg-gray-500 p-2 flex justify-center w-20 rounded-lg text-sm"
                type="submit"
              >
                {isSubmitting ? (
                  <UseAnimation
                    animation={loading}
                    size={60}
                    fillColor="green"
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <NewsSubscriptionPage />
    </div>
  );
}
