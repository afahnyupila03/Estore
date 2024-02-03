import React, { useEffect, useState } from "react";
import Modal from "./Components/Modal";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfigs/Firesbase";
import { DeliveryAddressSchema } from "../../ValidationSchemas/DeliverySchema";

export default function DeliveryPage() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data.displayName);
        const [first, last] = data.displayName.split(" ");
        setFirstName(first);
        setLastName(last);
      } else {
        setUser(null);
      }
    });
    return () => {
      subscribed();
    };
  }, []);

  const submitAddressHandler = async (values) => {
    setTimeout(() => {
      console.log(values);
    }, 1000);
  };

  const modalHandler = () => {
    setModal(!modal);
  };

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

      {modal && (
        <Modal>
          <div className="flex justify-end">
            <IonIcon
              onClick={modalHandler}
              icon={closeOutline}
              style={{ fontSize: "2.5rem", fontWeight: "bold" }}
            />
          </div>
          <div className="grid justify-center">
            <h1 className="font-semibold font-mono text-2xl">
              Add new address
            </h1>
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
            validationSchema={DeliveryAddressSchema}
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
                    onClick={() => {
                      console.log("Saved");
                    }}
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
      )}
    </div>
  );
}
