import React, { useEffect, useState } from "react";
import Modal from "./Components/Modal";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Field, Form, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfigs/Firesbase";

export default function DeliveryPage() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data.displayName);
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
            <button onClick={modalHandler}>
              <IonIcon
                icon={closeOutline}
                style={{ fontSize: "2.5rem", fontWeight: "bold" }}
              />
            </button>
          </div>
          <div className="flex justify-center">
            <h1>Add new address</h1>
          </div>
          <span className="ml-8 text-red-500">*Required</span>
          <Formik
            initialValues={{
              userName: user,
              address: "",
            }}
            onSubmit={submitAddressHandler}
          >
            {({ values, handleChange, handleBlur, isSubmitting }) => (
              <Form className="column">
                <Field
                  component={CustomTextInput}
                  id="userName"
                  name="userName"
                  type="text"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Name"
                  placeholder={values.userName}
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
                  label="Address*"
                  placeholder="Enter your street address"
                  autoComplete="false"
                />
                <div>
                  <p className="mt-4 flex justify-center font-mono text-xl">
                    This will be your primary delivery address.
                  </p>
                </div>
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
