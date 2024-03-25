import React, { useEffect, useState } from "react";
import PaymentModal from "./Components/ModalComponents/PaymentModal";
import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { PaymentSchema } from "../../ValidationSchemas/PaymentSchema";
import { useQuery } from "react-query";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import { database } from "../../FirebaseConfigs/Firesbase";
import {
  PaymentMethodService,
  PaymentMethodServices,
  fetchPaymentId,
} from "../../Services/AccountServices";
import { ref, remove } from "firebase/database";
import PaymentCardItem from "./Components/CardComponents/PaymentCardItem";
import ActionButton from "./Components/ActionButton";
import { closeOutline } from "ionicons/icons";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../Store";
import { Link } from "react-router-dom";

// TODO: FIX EDIT AND DELETE PAYMENT HANDLERS.

export default function PaymentMethodPage() {
  const { user } = useAuth();

  const [paymentModal, setPaymentModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePayment, setMobilePayment] = useState(true);

  const userName = user?.displayName;
  const userId = user?.uid;

  const splitUserName = (userName) => {
    if (!userName) {
      return { first: "", last: "" };
    }
    const names = userName.split(" ");
    const first = names[0] || "";
    const last = names.slice(1).join(" ") || "";
    return { first, last };
  };

  useEffect(() => {
    const { first, last } = splitUserName(userName);
    setFirstName(first);
    setLastName(last);
  }, [userName]);

  const {
    data = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery(["bankCard", userId], () => PaymentMethodServices(userId));

  const { data: paymentId } = useQuery(["paymentId", userId], () =>
    fetchPaymentId(userId)
  );

  const { data: singleMethod = [] } = useQuery(
    ["singleMethod", userId, paymentId],
    () => PaymentMethodService(userId, paymentId)
  );

  function modalHandler() {
    setPaymentModal(!paymentModal);
  }

  const paymentMethodHandler = async (values, actions) => {
    const db = database;
    const newPaymentRef = collection(
      db,
      userId,
      "/payment-method/",
      "bankCard"
    );

    try {
      const paymentRef = await addDoc(newPaymentRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        cardNumber: values.cardNumber,
        expiryDate: values.expiryDate,
        securityCode: values.securityCode,
      });

      const paymentId = paymentRef.id;

      alert("Payment method added with paymentId: " + paymentId);

      actions.resetForm({
        values: {
          cardHolder: "",
          cardNumber: "",
          expiryDate: "",
          securityCode: "",
        },
      });
    } catch (error) {
      alert("Error write payment-method to Firestore: " + error.message);
      console.log(error);
    }
  };

  const editPaymentHandler = () => {
    setEditModal(true);
    setPaymentModal(true);
  };

  const deletePaymentHandler = (userId, payMethodId) => {
    if (!payMethodId) {
      alert("Error: uniqueId is undefined");
      return;
    }
    const dbRef = ref(database, `${userId}/payment-method/${payMethodId}`);
    remove(dbRef)
      .then(() => {
        alert("Deleted successfully");
        refetch();
      })
      .catch((error) => {
        alert(error);
      });
  };

  let PAYMENT_METHODS;

  if (user === null) {
    PAYMENT_METHODS = (
      <div className="mt-8">
        <p className="mb-10 font-mono text-xl">
          No user found. Please sign in / create account to view wish list.
        </p>
        <Link
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold font-mono"
          to="/sign-in-&-create-account"
        >
          Sign in / Create Account
        </Link>
      </div>
    );
  } else if (isLoading) {
    PAYMENT_METHODS = (
      <div className="flex justify-center">
        <UseAnimation animation={loading} size={80} />
      </div>
    );
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

  const PAYMENT_MODAL = (
    <PaymentModal>
      <div className="flex justify-end">
        <ActionButton
          style={{ fontSize: "2.5rem", fontWeight: "bold" }}
          icon={closeOutline}
          actionButton={modalHandler}
        />
      </div>
      <div className="flex justify-center">
        <h1 className="p-2 font-mono text-xl font-semibold">Add New Card</h1>
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
        {/* singleMethod */}
        <Formik
          initialValues={
            editModal
              ? {
                  firstName: singleMethod.firstName,
                  lastName: singleMethod.lastName,
                  cardNumber: singleMethod.cardNumber,
                  expiryDate: singleMethod.expiryDate,
                  securityCode: singleMethod.securityCode,
                  // accountName: singleMethod.accountName,
                  // accountNumber: singleMethod.accountNumber,
                }
              : {
                  firstName: firstName,
                  lastName: lastName,
                  cardNumber: "",
                  expiryDate: "",
                  securityCode: "",
                  // accountName: "",
                  // accountNumber: "",
                }
          }
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
                  type="integer"
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

              <div className="flex justify-center mt-2">
                <p className="font-mono text-lg ">
                  This will be your primary payment method.
                </p>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  onClick={() => setMobilePayment(!mobilePayment)}
                >
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
    </PaymentModal>
  );

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold font-mono">Payment Methods</h1>
        {
          user !== null && (
            <div>
              <button
          onClick={modalHandler}
          type="button"
          className="p-2 border-2 border-black"
        >
          Add New Card
        </button>
        <p>Checkout faster by adding one or more cards to your account.</p>
            </div>
          )
        }

        <div className="grid grid-cols-3 mt-8 justify-evenly gap-x-4 gap-y-4">
          {PAYMENT_METHODS}
        </div>
      </div>
      {paymentModal && PAYMENT_MODAL}
      {editModal && paymentModal && PAYMENT_MODAL}
    </div>
  );
}
