import { Field, Form, Formik } from "formik";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import CustomTextInput, { CustomCheckbox } from "../../Components/TextInput";
import { AuthSchema } from "../../ValidationSchemas/AuthSchemas";
import NewsSubscriptionPage from "./NewsSubscriptionPage";
import { useState } from "react";

export default function () {
  const [existingUser, setExistingUser] = useState(false);
  const [checked, setChecked] = useState(false);
  console.log(checked)

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
          checkbox: checked,
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
          checkbox: checked,
        }}
        validationSchema={AuthSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, isSubmitting, onSubmit }) => (
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
                onSubmit={() => {setChecked(!checked)}}
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
                className={
                  isSubmitting
                    ? "bg-gray-300 p-2 flex justify-center w-20 rounded-lg text-sm"
                    : "bg-gray-500 p-2 flex justify-center w-20 rounded-lg text-sm"
                }
                type="submit"
              >
                {isSubmitting ? <UseAnimation animation={loading} /> : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <NewsSubscriptionPage />
    </div>
  );
}
