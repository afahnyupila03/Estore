import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import Loader from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import { NewsSubscriptionSchema } from "../../ValidationSchemas/NewsSubscriptionSchema";

export default function NewsSubscriptionPage () {
  function onSubmit(values, actions) {
    setTimeout(() => {
      console.log(values);
      console.log(actions);
      actions.resetForm({values: {
        emailSubscription: ""
      }});
    }, 1000);
  }

  return (
    <div className="container mx-auto px-28 flex justify-end">
      <Formik
        initialValues={{emailSubscription: ""}}
        onSubmit={onSubmit}
        validationSchema={NewsSubscriptionSchema}
      >
        {({ values, isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <Field
              name="emailSubscription"
              id="emailSubscription"
              type="email"
              component={CustomTextInput}
              value={values.emailSubscription}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Subscribe to daily news and updates."
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
                {isSubmitting ? <Loader animation={loading} />  : "Subscribe"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
