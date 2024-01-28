import { useState } from "react";
import Modal from "./Components/PaymentModal";
import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";

export default function PaymentMethodPage() {
  const [paymentModal, setPaymentModal] = useState(false);
  function modalHandler() {
    setPaymentModal(!paymentModal);
  }
  const paymentMethodHandler = (values) => {
    setTimeout(() => {
      console.log(values);
    }, 1000);
  };
  const required = <span className="text-red-500"></span>;
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold font-mono">Payment Methods</h1>
        <button
          onClick={modalHandler}
          type="button"
          className="p-2 border-2 border-black"
        >
          Add New Card
        </button>
        <p>Checkout faster by adding one or more cards to your account.</p>
      </div>
      {paymentModal && (
        <Modal>
          <div className="flex justify-center">
            <h1 className="p-6 font-mono text-xl font-semibold">
              Add New Card
            </h1>
          </div>
          <div>
            <p className="font-mono text-lg flex justify-center p-4 text-center">
              Save your card to enable use on future TimeZone purchases. Remove
              this card from your TimeZone account to this service
            </p>
          </div>
          <div>
            <p className="flex justify-center font-mono font-semibold text-xl">
              <span className="text-red-500">*</span>Required
            </p>
            <Formik
              initialValues={{
                cardNumber: "",
                expiryDate: "",
                securityCode: "",
              }}
              onSubmit={paymentMethodHandler}
            >
              {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form className="column">
                  <Field
                    component={CustomTextInput}
                    value={values.cardNumber}
                    name="cardNumber"
                    type="number"
                    id="cardNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Card Number*"
                    autoComplete="false"
                    placeholder="Card Number"
                  />

                  <Field
                    component={CustomTextInput}
                    value={values.expiryDate}
                    name="expiryDate"
                    id="expiryDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="false"
                    label="Expiration date*"
                    type="date"
                  />

                  <Field
                    component={CustomTextInput}
                    name="securityCode"
                    id="securityCode"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.securityCode}
                    label="Security code*"
                    autoComplete="false"
                  />
                  <div className="flex justify-center mt-4">
                    <p className="font-mono text-lg ">This will be your primary payment method.</p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="p-2 w-40 bg-black text-white font-mono text-xl"
                    >
                      Save
                    </button>
                  </div>
                  <div className="flex justify-center text-xl pb-8 mt-4">
                    <button
                      type="button"
                      className="border-b-2 border-black"
                      onClick={modalHandler}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </div>
  );
}
