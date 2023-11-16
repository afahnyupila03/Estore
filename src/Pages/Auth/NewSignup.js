import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { NewsSignupSchema } from "../../ValidationSchemas/NewsSignupSchema";

export default function () {
  const initialValues = { signupEmail: "" };
  function onSubmit(values, actions) {
    setTimeout(() => {
      console.log(values);
      console.log(actions);
      actions.resetForm({ email: "" });
    }, 1000);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={NewsSignupSchema}
    >
      {({ values, isSubmitting, handleChange, handleBlur }) => (
        <Form>
          <Field
            name="signupEmail"
            id="signupEmail"
            type="signupEmail"
            component={CustomTextInput}
            value={values.signupEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Email"
            placeholder="Subscribe to daily news and updates"
          />
          <button type="submit" disabled={isSubmitting}>
            Subscribe
          </button>
        </Form>
      )}
    </Formik>
  );
}
