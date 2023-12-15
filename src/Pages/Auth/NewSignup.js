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
    <div className="container mx-auto px-28 flex justify-end">
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
              label="Subscribe to daily news"
              // placeholder="Subscribe to daily news and updates"
            />
            <div className="flex justify-end text-white">
              <button
                type="submit"
                className={
                  isSubmitting
                    ? "bg-gray-300 p-2 rounded-lg text-sm"
                    : "bg-gray-500 p-2 rounded-lg text-sm"
                }
                disabled={isSubmitting}
              >
                Subscribe
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
