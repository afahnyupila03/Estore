import React, { useEffect, useState } from "react";
import { ModalComponent } from "../../Components/ProductModal";
import { Form, Formik } from "formik";
import { CustomInput } from "../../Components/TextInput";
import { useQuery } from "react-query";
import { DeliveryAddressSchema } from "../../ValidationSchemas/DeliverySchema";
import DeliveryCardItem from "./Components/CardComponents/DeliveryCardItem";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import { database } from "../../FirebaseConfigs/Firesbase";
import {
  DeliveryAddressService,
  DeliveryServices,
} from "../../Services/AccountServices";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../Store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DeliveryPage() {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const userId = user?.uid;
  const userName = user?.displayName;

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
    error,
    isError,
    refetch,
  } = useQuery(["delivery", userId], () => DeliveryServices(userId), {
    enabled: !!userId, // Only run the query if userId is available
  });

  const singleAddressQuery = useQuery(
    ["single", userId, selectedAddressId],
    () => DeliveryAddressService(userId, selectedAddressId),
    {
      enabled: !!selectedAddressId, // Only run the query if selectedAddressId is available
    }
  );

  const submitAddressHandler = async (values, actions) => {
    const db = database;
    const newDeliveryRef = collection(db, userId, "delivery", "addressMe");

    try {
      const docRef = await addDoc(newDeliveryRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        apt: values.aptSuite,
        zip: values.zip,
        city: values.city,
        state: values.state,
      });

      const deliveryId = docRef.id;

      alert("Data written successfully. Delivery ID: " + deliveryId);

      actions.resetForm({
        values: {
          firstName: "",
          lastName: "",
          address: "",
          aptSuite: "",
          zip: "",
          city: "",
          state: "",
        },
      });

      setModal(false);
      refetch();
    } catch (error) {
      alert("Error writing data to Firestore: " + error.message);
      console.error(error);
    }
  };

  const deleteDeliveryHandler = async (userId, uniqueId) => {
    const db = database;
    const deleteRef = doc(db, `${userId}/delivery/addressMe/${uniqueId}`);

    try {
      await deleteDoc(deleteRef);
      alert("Address deleted");
      refetch(userId);
    } catch (error) {
      alert("Error deleting address: " + error.message);
      console.error(error);
    }
  };

  const modalHandler = () => {
    setModal(!modal);
    setEditModal(false);
    setSelectedAddressId(null);
  };

  const editHandler = (addressId) => {
    setSelectedAddressId(addressId);
    setEditModal(true);
    setModal(true);
  };

  const editAddressHandler = async (values) => {
    try {
      const db = database;
      const ref = doc(db, userId, "delivery", "addressMe", selectedAddressId);
      await updateDoc(ref, {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        apt: values.aptSuite,
        zip: values.zip,
        city: values.city,
        state: values.state,
      });
      alert(`Address with id: ${selectedAddressId} has been updated.`);
      refetch();
      setModal(false);
      setSelectedAddressId(null);
    } catch (error) {
      alert("Error updating address: " + error.message);
      console.error(error);
    }
  };

  const renderDeliveryAddress = () => {
    if (user === null) {
      return (
        <div className="mt-8">
          <p className="mb-10  text-xl">{t("delivery.deliveryAuthMessage")}</p>
          <button
            onClick={() =>
              navigate("/sign-in-&-create-account", {
                state: { from: location },
              })
            }
            className="bg-gray-800 text-center text-white py-6 px-14 rounded font-medium "
          >
            {t("auth.signInCreate")}
          </button>
        </div>
      );
    } else if (isLoading) {
      return (
        <div className="flex justify-center mt-6">
          <UseAnimation animation={loading} size={80} />
        </div>
      );
    } else if (user !== null && data.length === 0) {
      return <p>{t("delivery.noAddress")}</p>;
    } else if (isError) {
      return (
        <div>
          <p>{error}</p>
          <button type="button" onClick={() => refetch()}>
            {t("delivery.tryAgain")}
          </button>
        </div>
      );
    } else {
      return data.map((delivery) => (
        <DeliveryCardItem
          deleteHandler={() => deleteDeliveryHandler(userId, delivery.id)}
          editHandler={() => editHandler(delivery.id)}
          key={delivery.id}
          deliveryDetails={delivery}
        />
      ));
    }
  };

  const DELIVERY_MODAL = (
    <ModalComponent
      isOpen={modal}
      onClose={modalHandler}
      position="center"
      size="md"
      modalHeader={
        <div className="flex justify-center px-24">
          <h1 className="font-medium flex justify-center text-black text-center py-2 text-sm lg:text-2xl">
            {editModal ? t("delivery.editAddress") : t("delivery.addAddress")}
          </h1>
        </div>
      }
      modalBody={
        <Formik
          key={
            editModal && singleAddressQuery?.data
              ? singleAddressQuery.data.id
              : "new-address"
          }
          initialValues={
            editModal && singleAddressQuery?.data
              ? {
                  id: singleAddressQuery.data.id,
                  firstName: singleAddressQuery.data.firstName,
                  lastName: singleAddressQuery.data.lastName,
                  address: singleAddressQuery.data.address,
                  aptSuite: singleAddressQuery.data.apt,
                  zip: singleAddressQuery.data.zip,
                  city: singleAddressQuery.data.city,
                  state: singleAddressQuery.data.state,
                }
              : {
                  firstName: firstName,
                  lastName: lastName,
                  address: "",
                  aptSuite: "",
                  zip: "",
                  city: "",
                  state: "",
                }
          }
          onSubmit={editModal ? editAddressHandler : submitAddressHandler}
          validationSchema={DeliveryAddressSchema(t)}
        >
          {({
            values,
            handleChange,
            handleBlur,
            isSubmitting,
            errors,
            touched,
          }) => (
            <Form className="space-y-2">
              <CustomInput
                id="firstName"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("checkoutForm.firstName")}
                placeholder={t("checkoutForm.firstName")}
                autoComplete="false"
                errors={errors}
                touched={touched}
              />
              <CustomInput
                id="lastName"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("checkoutForm.lastName")}
                placeholder={t("checkoutForm.lastName")}
                autoComplete="false"
                errors={errors}
                touched={touched}
              />
              <CustomInput
                id="address"
                name="address"
                type="search"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("checkoutForm.address")}
                placeholder={t("checkoutForm.address")}
                autoComplete="false"
                errors={errors}
                touched={touched}
              />
              <CustomInput
                id="aptSuite"
                name="aptSuite"
                type="text"
                value={values.aptSuite}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("checkoutForm.apartment")}
                placeholder={t("checkoutForm.apartment")}
                autoComplete="false"
                errors={errors}
                touched={touched}
              />
              <CustomInput
                id="zip"
                name="zip"
                type="text"
                value={values.zip}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("checkoutForm.postalCode")}
                placeholder={t("checkoutForm.postalCode")}
                autoComplete="false"
                errors={errors}
                touched={touched}
              />
              <CustomInput
                id="city"
                name="city"
                type="text"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("delivery.city")}
                placeholder={t("delivery.city")}
                autoComplete="false"
                errors={errors}
                touched={touched}
              />
              <CustomInput
                id="state"
                name="state"
                type="text"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("checkoutForm.state")}
                placeholder={t("checkoutForm.state")}
                autoComplete="false"
                errors={errors}
                touched={touched}
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    isSubmitting
                      ? "mb-4 mt-4 p-2 w-40 bg-gray-400 text-white font-medium text-xl"
                      : "mb-4 mt-4 p-2 w-40 bg-gray-800 text-white font-medium text-xl"
                  }
                >
                  {t("delivery.save")}
                  {isSubmitting && (
                    <UseAnimation className="ml-4" animation={loading} />
                  )}
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={modalHandler}
                  type="button"
                  className="font-medium text-xl border-b-2 border-black"
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
      <h1 className="text-2xl font-medium">{t("delivery.deliveryAddress")}</h1>
      {user !== null && (
        <div>
          <button onClick={modalHandler} className="p-2 border-2 border-black">
            {t("delivery.addNew")}
          </button>
          <p className="my-2 py-2">{t("delivery.checkoutFaster")}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 justify-evenly gap-x-4 gap-y-4">
        {renderDeliveryAddress()}
      </div>

      {modal && DELIVERY_MODAL}
    </div>
  );
}
