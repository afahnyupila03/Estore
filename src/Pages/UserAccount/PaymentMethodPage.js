import { useEffect, useState } from "react";
import Modal from "./Components/PaymentModal";
import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { PaymentSchema } from "../../ValidationSchemas/PaymentSchema";
import { useQuery } from "react-query";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../../FirebaseConfigs/Firesbase";
import { PaymentMethodServices } from "../../Services/AccountServices";
import { push, set, ref } from "firebase/database";
import PaymentCardItem from "./Components/PaymentCardItem";

// TODO: ADD CLOUD STORE DATABASE TO STORE AND READ PAYMENT METHODS ADDED.

export default function PaymentMethodPage() {
  const [paymentModal, setPaymentModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [payer, setPayer] = useState(null);
  const [payerId, setPayerId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePayment, setMobilePayment] = useState(false);
  console.log("paymentUi: ", mobilePayment)

  const {
    data = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery(["bankCard", payerId], () => PaymentMethodServices(payerId));
  console.log("Bank card: ", data);
  console.log("payerId:", payerId);

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (data) => {
      if (data) {
        setPayer(data.displayName);
        setPayerId(data.uid);
        const [first, last] = data.displayName.split(" ");
        setFirstName(first);
        setLastName(last);
      } else {
        setPayer(null);
      }
    });
    return () => {
      subscribed();
    };
  }, []);

  function modalHandler() {
    setPaymentModal(!paymentModal);
  }
  const mobilePaymentHandler = () => {};

  const editPaymentHandler = () => {
    setEditModal(true);
    setPaymentModal(true);
  };
  const deletePaymentHandler = () => {};

  let PAYMENT_METHODS;
  if (isLoading) {
    PAYMENT_METHODS = <p>Loading...</p>;
  } else if (isError) {
    PAYMENT_METHODS = (
      <div>
        <p>{error}</p>
        <button onClick={() => refetch()}>Refresh</button>
      </div>
    );
  } else if (data === null) {
    PAYMENT_METHODS = <p>No payment methods added.</p>;
  } else {
    PAYMENT_METHODS = data.map((payment) => (
      <PaymentCardItem
        key={payment.id}
        paymentDetails={payment}
        editHandler={editPaymentHandler}
        deleteHandler={deletePaymentHandler}
      />
    ));
  }

  const paymentMethodHandler = (values, actions) => {
    const db = database;
    const newPaymentRef = push(ref(db, payerId + "/payment-method/"));
    set(newPaymentRef, {
      firstName: values.firstName,
      lastName: values.lastName,
      cardNumber: values.cardNumber,
      expiryDate: values.expiryDate,
      securityCode: values.securityCode,
    })
      .then(() => {
        alert("Payment method added successfully.");
        actions.resetForm({
          values: {
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            securityCode: "",
          },
        });
        setPaymentModal(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const PAYMENT_MODAL = (
    <Modal>
      <div className="flex justify-center">
        <h1 className="p-6 font-mono text-xl font-semibold">Add New Card</h1>
      </div>
      <div>
        <p className="font-mono text-lg flex justify-center p-4 text-center">
          Save your card to enable use on future TimeZone purchases. Remove this
          card from your TimeZone account to this service
        </p>
      </div>
      <div>
        <p className="flex justify-center font-mono font-semibold text-xl">
          <span className="text-red-500">*</span>Required
        </p>
        <Formik
          initialValues={{
            firstName: firstName,
            lastName: lastName,
            cardNumber: "",
            expiryDate: "",
            securityCode: "",
            accountName: "",
            accountNumber: "",
          }}
          // validationSchema={PaymentSchema}
          onSubmit={paymentMethodHandler}
        >
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form className="column">
              {mobilePayment && (
                <Field
                  component={CustomTextInput}
                  values={values.firstName}
                  className="grid justify-center"
                  name="firstName"
                  type="text"
                  id="firstName"
                  autoComplete="true"
                  label="First name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First name"
                />
              )}
              {mobilePayment && (
                <Field
                  component={CustomTextInput}
                  values={values.lastName}
                  className="grid justify-center"
                  name="lastName"
                  type="text"
                  id="lastName"
                  autoComplete="true"
                  label="Last name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Last name"
                />
              )}
              {mobilePayment && (
                <Field
                  component={CustomTextInput}
                  value={values.cardNumber}
                  name="cardNumber"
                  className="grid justify-center"
                  type="text"
                  id="cardNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Card Number*"
                  autoComplete="false"
                  placeholder="Card Number"
                  renderCardImage={true}
                />
              )}

              {mobilePayment && (
                <Field
                  component={CustomTextInput}
                  value={values.expiryDate.toUpperCase()}
                  name="expiryDate"
                  id="expiryDate"
                  className="grid justify-center"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="false"
                  label="Expiration date*"
                  type="text"
                  pattern="\d{2}/\d{2}"
                  required
                />
              )}

              {mobilePayment && (
                <Field
                  component={CustomTextInput}
                  name="securityCode"
                  className="grid justify-center"
                  id="securityCode"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.securityCode}
                  label="Security code*"
                  autoComplete="false"
                />
              )}

              {!mobilePayment && (
                <Field
                  component={CustomTextInput}
                  name="accountName"
                  className="grid justify-center"
                  id="accountName"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountName}
                  label="Account name*"
                  autoComplete="false"
                />
              )}

              {!mobilePayment && (
                <Field
                  component={CustomTextInput}
                  name="accountNumber"
                  className="grid justify-center"
                  id="accountNumber"
                  type="tel"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountNumber}
                  label="Mobile number*"
                  autoComplete="false"
                />
              )}

              <div className="flex justify-center mt-4">
                <p className="font-mono text-lg ">
                  This will be your primary payment method.
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <button type="button" onClick={() => setMobilePayment(!mobilePayment)}>
                  {mobilePayment ? "Pay via MOMO/OM" : "Pay via bank card"}
                </button>
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
  );

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

        <div className="grid grid-cols-3  gap-x-4 gap-y-4">
          {PAYMENT_METHODS}
        </div>
      </div>
      {paymentModal && PAYMENT_MODAL}
      {editModal && PAYMENT_MODAL}
    </div>
  );
}
