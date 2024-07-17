import React, { Fragment, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { CustomInput } from "../../Components/TextInput";
import {
  BankPaymentSchema,
  MobilePaymentSchema,
} from "../../ValidationSchemas/PaymentSchema";
import { useQuery } from "react-query";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import { database } from "../../FirebaseConfigs/Firesbase";
import {
  PaymentMethodService,
  PaymentMethodServices,
} from "../../Services/AccountServices";
import PaymentCardItem from "./Components/CardComponents/PaymentCardItem";
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
import { ModalComponent } from "../../Components/ProductModal";

export default function PaymentMethodPage() {
  const { user } = useAuth();

  const { t } = useTranslation();

  const [paymentModal, setPaymentModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bankPayment, setBankPayment] = useState(true);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const userName = user?.displayName;
  const userId = user?.uid;
  console.log("userName: ", userName);

  const bankPaymentHandler = () => {
    setBankPayment((prevMobilePayment) => !prevMobilePayment);
  };
  console.log("mobile payment state: ", bankPayment.toString());

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
    setBankPayment(true);
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
      const paymentRef = await addDoc(
        newPaymentRef,
        bankPayment
          ? {
              firstName: values.firstName,
              lastName: values.lastName,
              cardNumber: values.cardNumber,
              expiryDate: values.expiryDate,
              securityCode: values.securityCode,
            }
          : {
              accountName: values.accountName,
              accountNumber: values.accountNumber,
            }
      );

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
    if (editModal && singlePaymentQuery.data) {
      if (
        singlePaymentQuery.data.accountName &&
        singlePaymentQuery.data.accountNumber
      ) {
        setBankPayment(true);
      } else {
        setBankPayment(false);
      }
    }
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
      await updateDoc(
        paymentRef,
        bankPayment
          ? {
              firstName: values.firstName,
              lastName: values.lastName,
              cardNumber: values.cardNumber,
              expiryDate: values.expiryDate,
              securityCode: values.securityCode,
            }
          : {
              accountName: values.accountName,
              accountNumber: values.accountNumber,
            }
      );
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
          <p className="mb-10  text-xl">
            No user found. Please sign in / create account to view wish list.
          </p>
          <Link
            className="bg-black text-center text-white py-6 px-14 rounded font-medium "
            to="/sign-in-&-create-account"
          >
            {t("auth.signInCreate")}
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
    } else if (data === null || data.length === 0) {
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

  useEffect(() => {
    if (editModal && singlePaymentQuery.data) {
      if (
        singlePaymentQuery.data.accountName &&
        singlePaymentQuery.data.accountNumber
      ) {
        setBankPayment(false);
      } else {
        setBankPayment(true);
      }
    }
  }, [editModal, singlePaymentQuery]);

  const initialValues = () => {
    if (editModal && singlePaymentQuery.data && !bankPayment) {
      if (
        singlePaymentQuery.data.accountName &&
        singlePaymentQuery.data.accountNumber
      ) {
        return {
          id: singlePaymentQuery.data.id,
          accountName: singlePaymentQuery.data.accountName,
          accountNumber: singlePaymentQuery.data.accountNumber,
        };
      } else {
        return {
          id: singlePaymentQuery.data.id,
          firstName: singlePaymentQuery.data.firstName,
          lastName: singlePaymentQuery.data.lastName,
          cardNumber: singlePaymentQuery.data.cardNumber,
          expiryDate: singlePaymentQuery.data.expiryDate,
          securityCode: singlePaymentQuery.data.securityCode,
        };
      }
    } else if (bankPayment) {
      return {
        firstName: "",
        lastName: "",
        cardNumber: "",
        expiryDate: "",
        securityCode: "",
      };
    } else if (!bankPayment) {
      return {
        accountName: "",
        accountNumber: "",
      };
    }
  };

  function ModalHeaderText() {
    if (bankPayment) {
      return `${t("personalInfor.newCard")}`;
    } else if (editModal) {
      if (editModal && bankPayment) {
        setBankPayment(true);
        return "Edit Bank Card";
      } else {
        return "Edit MOMO / OM Number";
      }
    } else {
      return "Add MOMO / OM Number";
    }
  }

  const PAYMENT_MODAL = (
    <ModalComponent
      isOpen={paymentModal}
      onClose={modalHandler}
      size="md"
      position="center"
      modalHeader={
        <Fragment>
          <div className="flex mt-4 justify-center">
            <h1 className="text-black  text-xl font-medium">
              {ModalHeaderText()}
            </h1>
          </div>
          {editModal && (
            <p
              className="
            flex justify-center text-center 
            text-red-500 font-medium my-4 py-2"
            >
              Please re-enter all fields...!
            </p>
          )}
          <div>
            <p className=" text-sm mt-4 text-black lg:text-lg flex justify-center text-center">
              {t("personalInfor.saveCard")}
            </p>
          </div>
        </Fragment>
      }
      modalBody={
        <Formik
          initialValues={initialValues()}
          validationSchema={
            bankPayment ? BankPaymentSchema : MobilePaymentSchema
          }
          onSubmit={
            editModal ? editPaymentDetailsHandler : paymentMethodHandler
          }
        >
          {({
            values,
            handleChange,
            handleBlur,
            isSubmitting,
            errors,
            touched,
          }) => (
            <Form className="w-full max-w-md">
              {bankPayment ? (
                <>
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    value={values.firstName}
                    name="firstName"
                    type="text"
                    id="firstName"
                    autoComplete="true"
                    label={t("checkoutForm.firstName")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t("checkoutForm.firstName")}
                  />
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    value={values.lastName}
                    name="lastName"
                    type="text"
                    id="lastName"
                    autoComplete="true"
                    label={t("checkoutForm.lastName")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t("checkoutForm.lastName")}
                  />
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    value={values.cardNumber}
                    name="cardNumber"
                    type="text"
                    id="cardNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={t("checkoutForm.cardNumber")}
                    autoComplete="false"
                    placeholder={t("checkoutForm.cardNumber")}
                  />
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    value={values.expiryDate}
                    name="expiryDate"
                    id="expiryDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="false"
                    label={t("checkoutForm.expiryDate")}
                    type="text"
                    pattern="\d{2}/\d{2}"
                    required
                  />
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    name="securityCode"
                    id="securityCode"
                    type="integer"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.securityCode}
                    label={t("personalInfor.securityCode")}
                    autoComplete="false"
                  />
                </>
              ) : (
                <>
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    value={values.accountName}
                    name="accountName"
                    id="accountName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="false"
                    label={t("personalInfor.name")}
                    placeholder={t("personalInfor.name")}
                    type="text"
                  />
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    name="accountNumber"
                    id="accountNumber"
                    type="tel"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountNumber}
                    label={t("checkoutForm.cardNumber")}
                    placeholder={t("checkoutForm.cardNumber")}
                    autoComplete="false"
                  />
                </>
              )}

              {!editModal && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="font-medium"
                    onClick={bankPaymentHandler}
                  >
                    {bankPayment
                      ? `${t("personalInfor.payMomo")}`
                      : `${t("personalInfor.payBank")}`}
                  </button>
                </div>
              )}

              <div className="flex justify-center mx-4 my-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-2 w-20 lg:w-40 bg-gray-800 rounded-md text-white  text-sm lg:text-xl"
                >
                  {t("delivery.save")}
                </button>
              </div>
              <div className="flex justify-center text-sm lg:text-xl mt-4">
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
      }
    />
  );

  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium ">Payment Methods</h1>
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
