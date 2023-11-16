import { Field, Form, Formik } from "formik";
import CustomTextInput, { CustomCheckbox } from "../../Components/TextInput";
import { AuthSchema } from "../../ValidationSchemas/AuthSchemas";
import NewSignup from "./NewSignup";

export default function () {
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
          checkbox: "",
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
        checkbox: "",
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
            placeholder="Enter EMail"
          />
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
          />
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
          />
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
          />
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
          />
          <Field
            type="checkbox"
            name="checkbox"
            id="checkbox"
            component={CustomCheckbox}
            value={values.checkbox}
            onChange={handleChange}
            onBlur={handleBlur}
            label="I have read and I accept the terms and conditions"
          />
          <br />
          <button
            disabled={isSubmitting}
            className={
              isSubmitting
                ? "border-2 bg-gray-300 text-white"
                : "border-2 bg-gray-500 text-white"
            }
            type="submit"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>

    <NewSignup />
    </div>
  );
}
