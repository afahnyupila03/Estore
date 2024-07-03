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
} from "../../Services/AccountServices";
import { ref, remove } from "firebase/database";
import PaymentCardItem from "./Components/CardComponents/PaymentCardItem";
import ActionButton from "./Components/ActionButton";
import { closeOutline } from "ionicons/icons";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../Store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// TODO: FIX EDIT AND DELETE PAYMENT HANDLERS.

export default function PaymentMethodPage() {
  const { user } = useAuth();

  const { t } = useTranslation();

  const [paymentModal, setPaymentModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePayment, setMobilePayment] = useState(true);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

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
  } = useQuery(["bankCard", userId], () => PaymentMethodServices(userId), {
    enabled: !!userId,
  });

  const singlePaymentQuery = useQuery(
    ["singlePayment", userId, selectedPaymentId],
    () => PaymentMethodService(userId, selectedPaymentId),
    {
      enabled: !!selectedPaymentId,
    }
  );

  const modalHandler = () => {
    setPaymentModal(!paymentModal);
    setEditModal(false);
    setSelectedPaymentId(null);
  };

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
      setEditModal(false);
      refetch();
    } catch (error) {
      alert("Error write payment-method to Firestore: " + error.message);
      console.log(error);
    }
  };

  const editPaymentHandler = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setEditModal(true);
    setPaymentModal(true);
  };

  const deletePaymentHandler = async (userId, paymentId) => {
    const db = database;
    const paymentRef = doc(
      db,
      `${userId}/payment-method/bankCard/${paymentId}`
    );
    try {
      await deleteDoc(paymentRef);
      alert(`Payment details with id ${paymentId} was successfully deleted!`);
      refetch(userId);
    } catch (error) {
      alert("Error deleting payment method " + error.message);
      console.error(error);
    }
  };

  const editPaymentDetailsHandler = async (values) => {
    try {
      const db = database;
      const paymentRef = doc(
        db,
        userId,
        "payment-method",
        "bankCard",
        selectedPaymentId
      );
      await updateDoc(paymentRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        cardNumber: values.cardNumber,
        expiryDate: values.expiryDate,
        securityCode: values.securityCode,
      });
      alert(
        `Payment details with ${selectedPaymentId} has been updated successfully.`
      );
      refetch();
      setEditModal(false);
      setPaymentModal(false);
      setSelectedPaymentId(null);
    } catch (error) {
      alert("Error updating payment card details: " + error.message);
      console.error(error);
    }
  };

  const renderPaymentMethods = () => {
    if (user === null) {
      return (
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
      return (
        <div className="flex justify-center">
          <UseAnimation animation={loading} size={80} />
        </div>
      );
    } else if (isError) {
      return (
        <div>
          <p>{error}</p>
          <button onClick={() => refetch()}>Refresh</button>
        </div>
      );
    } else if (data === null) {
      return <p>No payment methods added.</p>;
    } else {
      return data.map((payment) => (
        <PaymentCardItem
          key={payment.id}
          paymentDetails={payment}
          editHandler={() => editPaymentHandler(payment.id)}
          deleteHandler={() => deletePaymentHandler(userId, payment.id)}
        />
      ));
    }
  };

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
        <h1 className="p-2 font-mono text-xl font-semibold">
          {t("personalInfor.newCard")}
        </h1>
      </div>
      <div>
        <p className="font-mono text-sm lg:text-lg flex justify-center p-4 text-center">
          {t("personalInfor.saveCard")}
        </p>
      </div>
      <div>
        <p className="flex justify-center font-mono font-semibold text-xl">
          <span className="text-red-500">*</span>
          {t("delivery.required")}
        </p>
        {/* singleMethod */}
        <Formik
          initialValues={
            editModal && singlePaymentQuery.data
              ? {
                  id: singlePaymentQuery.data.id,
                  firstName: singlePaymentQuery.data.firstName,
                  lastName: singlePaymentQuery.data.lastName,
                  cardNumber: singlePaymentQuery.data.cardNumber,
                  expiryDate: singlePaymentQuery.data.expiryDate,
                  securityCode: singlePaymentQuery.data.securityCode,
                  // accountName: singlePaymentQuery.data.accountName,
                  // accountNumber: singlePaymentQuery.data.accountNumber,
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
          onSubmit={
            editModal ? editPaymentDetailsHandler : paymentMethodHandler
          }
        >
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form className="grid text-sm xl:text-xl justify-start lg:justify-center">
              {mobilePayment && (
                <Field
                  component={CustomTextInput}
                  values={values.firstName}
                  name="firstName"
                  type="text"
                  id="firstName"
                  autoComplete="true"
                  label={t("checkoutForm.firstName")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First name"
                />
              )}
              {mobilePayment && (
                <Field
                  component={CustomTextInput}
                  values={values.lastName}
                  name="lastName"
                  type="text"
                  id="lastName"
                  autoComplete="true"
                  label={t("checkoutForm.lastName")}
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
                  type="text"
                  id="cardNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={`*${t("checkoutForm.cardNumber")}`}
                  autoComplete="false"
                  placeholder="Card Number"
                />
              )}

              {mobilePayment && (
                <Field
                  component={CustomTextInput}
                  value={values.expiryDate.toUpperCase()}
                  name="expiryDate"
                  id="expiryDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="false"
                  label={`*${t("checkoutForm.expiryDate")}`}
                  type="text"
                  pattern="\d{2}/\d{2}"
                  required
                />
              )}

              {mobilePayment && (
                <Field
                  component={CustomTextInput}
                  name="securityCode"
                  id="securityCode"
                  type="integer"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.securityCode}
                  label={`*${t("personalInfor.securityCode")}`}
                  autoComplete="false"
                />
              )}

              {!mobilePayment && (
                <Field
                  component={CustomTextInput}
                  name="accountName"
                  id="accountName"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={`${values.firstName} ${values.lastName}`}
                  label={`*${t("personalInfor.accountName")}`}
                  autoComplete="false"
                />
              )}

              {!mobilePayment && (
                <Field
                  component={CustomTextInput}
                  name="accountNumber"
                  id="accountNumber"
                  type="tel"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cardNumber}
                  label={`*${t("personalInfor.momoNumber")}`}
                  autoComplete="false"
                />
              )}

              <div className="flex justify-center mt-2">
                <p className="font-mono lg:text-center text-lg ">
                  {t("personalInfor.primaryMethods")}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setMobilePayment(!mobilePayment)}
                >
                  {mobilePayment
                    ? `${t("personalInfor.payMomo")}`
                    : `${t("personalInfor.payBank")}`}
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-2 w-20 lg:w-40 bg-black text-white font-mono text-sm lg:text-xl"
                >
                  {t("delivery.save")}
                </button>
              </div>
              <div className="flex justify-center text-sm lg:text-xl pb-8 mt-4">
                <button
                  type="button"
                  className="border-b-2 border-black"
                  onClick={modalHandler}
                >
                  {t("delivery.cancel")}
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
        {user !== null && (
          <div>
            <button
              onClick={modalHandler}
              type="button"
              className="p-2 border-2 border-black"
            >
              {t("personalInfor.newCard")}
            </button>
            <p>{t("personalInfor.checkoutFaster")}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 justify-evenly gap-x-4 gap-y-4">
          {renderPaymentMethods()}
        </div>
      </div>
      {paymentModal && PAYMENT_MODAL}
      {editModal && paymentModal && PAYMENT_MODAL}
    </div>
  );
}
