import React, { useEffect, useState } from "react";
import Modal from "./Components/Modal";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { onAuthStateChanged } from "firebase/auth";
import { useQuery } from "react-query";
import { auth } from "../../FirebaseConfigs/Firesbase";
import { DeliveryAddressSchema } from "../../ValidationSchemas/DeliverySchema";
import DeliveryCardItem from "./Components/DeliveryCardItem";

import { database } from "../../FirebaseConfigs/Firesbase";
import { ref, set, onValue, push } from "firebase/database";
import { DeliveryServices } from "../../Services/AccountServices";

export default function DeliveryPage() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { data, isLoading, error, isError, refetch } = useQuery(
    ["delivery", userId],
    () => DeliveryServices(userId)
  );
  console.log(data);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data.displayName);
        setUserId(data.uid);
        const [first, last] = data.displayName.split(" ");
        setFirstName(first);
        setLastName(last);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  let DELIVERY_ADDRESS;

  if (isLoading) {
    DELIVERY_ADDRESS = <p>Loading....</p>;
  } else if (isError) {
    DELIVERY_ADDRESS = (
      <div>
        <p>{error}</p>
        <button tye="button" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  } else if (data === null) {
    DELIVERY_ADDRESS = <p>No address added</p>
  }else {
    DELIVERY_ADDRESS = data.map((delivery) => (
      <DeliveryCardItem key={delivery.id} deliveryDetails={delivery} />
    ));
  }

  const submitAddressHandler = (values, actions) => {
    const db = database;
    const newDeliveryRef = push(ref(db, userId + "/delivery/"));
    set(newDeliveryRef, {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      apt: values.aptSuite,
      zip: values.zip,
      city: values.city,
      state: values.state,
    })
      .then(() => {
        // console.log(values);
        alert("Successful");
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
      })
      .catch((error) => {
        alert(error);
      });
  };

  /* Test to see performance. */
  const fetchAddressData = () => {
    // getDocs()
    // .then((res) => {
    //   const data = res.docs;
    //   {
    //     data.map((address) => (
    //       <DeliveryCardItem key={address.id} deliveryDetails={address} />
    //     ));
    //   }
    // })
    // .catch((err) => {
    //   const errMessage = err.message;
    //   const errCode = err.code;
    //   alert(errMessage, errCode);
    // });
  };

  const modalHandler = () => {
    setModal(!modal);
  };

  const DELIVERY_MODAL = (
    <Modal>
      <div className="flex justify-end">
        <IonIcon
          onClick={modalHandler}
          icon={closeOutline}
          style={{ fontSize: "2.5rem", fontWeight: "bold" }}
        />
      </div>
      <div className="grid justify-center">
        <h1 className="font-semibold font-mono text-2xl">Add new address</h1>
        <span className="ml-8 text-red-500">*Required</span>
      </div>

      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
          address: "",
          aptSuite: "",
          zip: "",
          city: "",
          state: "",
        }}
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
                disabled={isSubmitting}
                className="mb-4 mt-4 p-2 w-40 bg-black text-white font-mono text-xl"
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
    </Modal>
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
    </div>
  );
}
