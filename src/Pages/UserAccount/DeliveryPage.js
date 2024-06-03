import React, { useEffect, useState } from "react";
import DeliveryModal from "./Components/ModalComponents/DeliveryModal";
import ActionButton from "./Components/ActionButton";
import { closeOutline } from "ionicons/icons";
import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
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
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DeliveryPage() {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const { t } = useTranslation();

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

  let DELIVERY_ADDRESS;

  if (user === null) {
    DELIVERY_ADDRESS = (
      <div className="mt-8">
        <p className="mb-10 font-mono text-xl">
          {t("delivery.deliveryAuthMessage")}
        </p>
        <Link
          to="/sign-in-&-create-account"
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold font-mono"
        >
          {t("auth.signInCreate")}
        </Link>
      </div>
    );
  } else if (isLoading) {
    DELIVERY_ADDRESS = (
      <div className="flex justify-center mt-6">
        <UseAnimation animation={loading} size={80} />
      </div>
    );
  } else if (user !== null && data.length === 0) {
    DELIVERY_ADDRESS = <p>{t("delivery.noAddress")}</p>;
  } else if (isError) {
    DELIVERY_ADDRESS = (
      <div>
        <p>{error}</p>
        <button type="button" onClick={() => refetch()}>
          {t("delivery.tryAgain")}
        </button>
      </div>
    );
  } else {
    DELIVERY_ADDRESS = data.map((delivery) => (
      <DeliveryCardItem
        deleteHandler={() => deleteDeliveryHandler(userId, delivery.id)}
        editHandler={() => editHandler(delivery.id)}
        key={delivery.id}
        deliveryDetails={delivery}
      />
    ));
  }

  const modalHandler = () => {
    setModal(!modal);
    setEditModal(false);
    setSelectedAddressId(null);
  };

  const DELIVERY_MODAL = (
    <DeliveryModal>
      <div className="flex justify-end">
        <ActionButton
          actionButton={modalHandler}
          icon={closeOutline}
          style={{ fontSize: "2.5rem", fontWeight: "bold" }}
        />
      </div>
      <div className="grid justify-center">
        <h1 className="font-semibold font-mono text-sm lg:text-2xl">
          {t("delivery.addAddress")}
        </h1>
        <span className="text-center text-sm lg:text-lg">
          <span>* </span>
          {t("delivery.required")}
        </span>
      </div>

      <Formik
        initialValues={
          editModal && singleAddressQuery.data
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
        // validationSchema={DeliveryAddressSchema}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form className="grid text-sm xl:text-xl justify-start lg:justify-center">
            <Field
              component={CustomTextInput}
              id="firstName"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t("checkoutForm.firstName")}
              placeholder={t("checkoutForm.firstName")}
              autoComplete="true"
            />
            <Field
              component={CustomTextInput}
              id="lastName"
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t("checkoutForm.lastName")}
              placeholder={t("checkoutForm.lastName")}
              autoComplete="true"
            />
            <Field
              component={CustomTextInput}
              id="address"
              name="address"
              type="search"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              label={`* ${t("checkoutForm.address")}`}
              placeholder="Enter your street address"
              autoComplete="false"
            />
            <Field
              component={CustomTextInput}
              id="aptSuite"
              name="aptSuite"
              type="text"
              value={values.aptSuite}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t("checkoutForm.apartment")}
              placeholder="Enter your street address"
              autoComplete="false"
            />
            <Field
              component={CustomTextInput}
              id="zip"
              name="zip"
              type="text"
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              label={`*${t("checkoutForm.postalCode")}`}
              placeholder="Zip/postal code"
              autoComplete="false"
            />
            <Field
              component={CustomTextInput}
              id="city"
              name="city"
              type="text"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              label={`*${t("delivery.city")}`}
              placeholder="City"
              autoComplete="false"
            />
            <Field
              component={CustomTextInput}
              id="state"
              name="state"
              type="text"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              label={`*${t("checkoutForm.state")}`}
              placeholder="State/province"
              autoComplete="false"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={
                  isSubmitting
                    ? "mb-4 mt-4 p-2 w-40 bg-gray-400 text-white font-mono text-xl"
                    : "mb-4 mt-4 p-2 w-40 bg-black text-white font-mono text-xl"
                }
              >
                {t("delivery.save")}
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={modalHandler}
                type="button"
                className="font-mono text-xl border-b-2 border-black"
              >
                {t("delivery.cancel")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </DeliveryModal>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold font-mono">
        {t("delivery.deliveryAddress")}
      </h1>
      {user !== null && (
        <div>
          <button onClick={modalHandler} className="p-2 border-2 border-black">
            {t("delivery.addNew")}
          </button>
          <p>{t("delivery.checkoutFaster")}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 justify-evenly gap-x-4 gap-y-4">
        {DELIVERY_ADDRESS}
      </div>

      {modal && DELIVERY_MODAL}
    </div>
  );
}
