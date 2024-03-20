import React, { useEffect, useState } from "react";
import DeliveryModal from "./Components/ModalComponents/DeliveryModal";
import ActionButton from "./Components/ActionButton";
import { closeOutline } from "ionicons/icons";
import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { onAuthStateChanged } from "firebase/auth";
import { useQuery } from "react-query";
import { DeliveryAddressSchema } from "../../ValidationSchemas/DeliverySchema";
import DeliveryCardItem from "./Components/CardComponents/DeliveryCardItem";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import { database, auth } from "../../FirebaseConfigs/Firesbase";
import {
  DeliveryAddressService,
  DeliveryServices,
  fetchDeliveryId,
} from "../../Services/AccountServices";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../Store";

// TODO: FIX EDIT AND DELETE DELIVERY HANDLERS

export default function DeliveryPage() {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
  } = useQuery(["delivery", userId], () => DeliveryServices(userId));
  // const deliveryId = "GXcRx433FEAhtsBU0a2a";

  const { data: deliveryId } = useQuery(["dynamicDeliveryId", userId], () =>
    fetchDeliveryId(userId)
  );

  const firstDeliveryId =
    deliveryId && deliveryId.length > 0 ? deliveryId[0] : null;

  const { data: singleAddress } = useQuery(
    ["single", userId, firstDeliveryId],
    () => DeliveryAddressService(userId, firstDeliveryId)
  );
  console.log(singleAddress);

  const submitAddressHandler = async (values, actions) => {
    const db = database;
    const newDeliveryRef = collection(db, userId, "/delivery/", "addressMe"); // Assuming userId is defined

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

  const editHandler = () => {
    setEditModal(true);
    setModal(true);
  };

  let DELIVERY_ADDRESS;

  if (isLoading) {
    DELIVERY_ADDRESS = (
      <div className="flex justify-center mt-6">
        <UseAnimation animation={loading} size={80} />
      </div>
    );
  } else if (isError) {
    DELIVERY_ADDRESS = (
      <div>
        <p>{error}</p>
        <button type="button" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  } else if (data === null) {
    DELIVERY_ADDRESS = <p>No address added</p>;
  } else {
    DELIVERY_ADDRESS = data.map((delivery) => (
      <DeliveryCardItem
        deleteHandler={deleteDeliveryHandler}
        editHandler={editHandler}
        key={delivery.id}
        deliveryDetails={delivery}
      />
    ));
  }

  const modalHandler = () => {
    setModal(!modal);
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
        <h1 className="font-semibold font-mono text-2xl">Add new address</h1>
        <span className="ml-8 text-red-500">*Required</span>
      </div>

      <Formik
        initialValues={
          editModal
            ? {
                firstName: singleAddress.firstName,
                lastName: singleAddress.lastName,
                address: singleAddress.address,
                aptSuite: singleAddress.apt,
                zip: singleAddress.zip,
                city: singleAddress.city,
                state: singleAddress.state,
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
        onSubmit={submitAddressHandler}
        // validationSchema={DeliveryAddressSchema}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form className="column">
            <Field
              component={CustomTextInput}
              className="grid justify-center"
              id="firstName"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              label="First name"
              placeholder="First name"
              autoComplete="true"
            />
            <Field
              component={CustomTextInput}
              className="grid justify-center"
              id="lastName"
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Last name"
              placeholder="Last name"
              autoComplete="true"
            />
            <Field
              component={CustomTextInput}
              id="address"
              className="grid justify-center"
              name="address"
              type="search"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Address*"
              placeholder="Enter your street address"
              autoComplete="false"
            />
            <Field
              component={CustomTextInput}
              id="aptSuite"
              className="grid justify-center"
              name="aptSuite"
              type="text"
              value={values.aptSuite}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Apt, suite, company, c/o (optional)"
              placeholder="Enter your street address"
              autoComplete="false"
            />
            <Field
              component={CustomTextInput}
              id="zip"
              className="grid justify-center"
              name="zip"
              type="text"
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Zip/postal code*"
              placeholder="Zip/postal code"
              autoComplete="false"
            />
            <Field
              component={CustomTextInput}
              id="city"
              className="grid justify-center"
              name="city"
              type="text"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              label="City*"
              placeholder="City"
              autoComplete="false"
            />
            <Field
              component={CustomTextInput}
              id="state"
              className="grid justify-center"
              name="state"
              type="text"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              label="State/Province*"
              placeholder="State/province"
              autoComplete="false"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                // disabled={isSubmitting}
                className={
                  isSubmitting
                    ? "mb-4 mt-4 p-2 w-40 bg-gray-400 text-white font-mono text-xl"
                    : "mb-4 mt-4 p-2 w-40 bg-black text-white font-mono text-xl"
                }
              >
                Save
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={modalHandler}
                type="button"
                className="font-mono text-xl border-b-2 border-black"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </DeliveryModal>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold font-mono">Delivery Addresses</h1>
      <button onClick={modalHandler} className="p-2 border-2 border-black">
        Add New Address
      </button>
      <p>
        Checkout faster by adding one or more shipping addresses to your
        account.
      </p>

      <div className="grid grid-cols-3 mt-8 justify-evenly gap-x-4 gap-y-4">
        {DELIVERY_ADDRESS}
      </div>

      {modal && DELIVERY_MODAL}
      {editModal && modal && DELIVERY_MODAL}
    </div>
  );
}
