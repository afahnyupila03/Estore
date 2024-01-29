import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";
import EmailModal from "./Components/EditEmailModal";
import { Form, Formik, Field } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Link } from "react-router-dom";

export default function PersonalInformation() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editNameModal, setEditNameModal] = useState(false);
  const [editEmailModal, setEditEmailModal] = useState(false);
  const [editPasswordModal, setEditPasswordModal] = useState(false);

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
        console.log("user-email:", user.email);
      } else {
        setUserEmail(null);
        setUserName(null);
      }
    });
    return () => {
      subscribed();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const openDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const openEmailModal = () => {
    setEditEmailModal(!editEmailModal);
  };
  const openNameModal = () => {};
  const openPasswordModal = () => {};
  const deleteUserAccount = () => {};

  const emailModal = (
    <EmailModal>
      <div className="flex justify-end">
        <IonIcon
          icon={closeOutline}
          onClick={openEmailModal}
          style={{ fontSize: "2rem" }}
        />
      </div>
      <div className="font-mono text-lg text-start mb-4">
        <h1 className="font-bold text-2xl mb-4">Change email</h1>
        <p>Enter a new email for TimeZone</p>
      </div>
      <Formik
        initialValues={{
          newEmail: "",
          confirmEmail: "",
          password: "",
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Field
              component={CustomTextInput}
              value={values.newEmail}
              name="newEmail"
              id="newEmail"
              label="New email"
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="false"
              type="email"
            />
            <Field
              component={CustomTextInput}
              value={values.confirmEmail}
              name="confirmEmail"
              id="confirmEmail"
              label="Confirm email"
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="false"
              type="email"
            />
            <Field
              component={CustomTextInput}
              value={values.password}
              name="password"
              id="password"
              label="Enter password"
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="false"
              type="password"
            />
            <div className="flex justify-center font-semibold text-lg font-mono mt-2">
              <p>
                By tapping Change Email, you agree to our
                <span>
                  <Link>Privacy Policy</Link>
                </span>
                and
                <span>
                  <Link>Terms &amp; Conditions.</Link>
                </span>
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="p-2 mb-4 w-60 mt-6 rounded bg-black text-white"
              >
                Change Email
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </EmailModal>
  );

  return (
    <div>
      {/* Password & Personal Information */}
      <div>
        <h1 className="text-2xl font-semibold font-mono">
          Password & Personal Information
        </h1>
        <div>
          <div className="text-lg mt-4 font-mono">
            <p>
              This information is the same at: <br />
              <span className="text-2xl font-semibold font-mono">TIMEZONE</span>
            </p>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-mono">Sign-in info</h1>
            <div className="font-mono text-lg mt-4">
              <h1 className="font-medium">Email</h1>
              <p
                style={{ width: "14rem" }}
                className=" p-4 bg-black text-white text-center rounded"
              >
                {userEmail}
              </p>
              <button className="mt-2" onClick={openEmailModal}>
                Change email
              </button>
              <hr className="border-black" style={{ width: "7.5rem" }} />
            </div>

            <div className="font-mono text-lg mt-4">
              <h1 className="font-medium">Password</h1>
              <button>Change password</button>
              <hr className="border-black" style={{ width: "9.5rem" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mt-14 font-mono">
        <h1 className="text-2xl font-semibold">Personal Information</h1>
        <div>
          <h1 className="font-medium mb-2">Name</h1>
          <p className="mb-2 p-4 bg-black text-white w-40 text-center rounded">
            {/* {userName.toUpperCase()} */}
            {userName}
          </p>
          <button>Edit</button>
          <hr className="w-8 border-black" />
        </div>
      </div>

      {/* Security */}
      <div className="mt-10 font-mono text-lg">
        <h1 className="text-2xl font-semibold font-mono">Security</h1>
        <p>Logout of your account</p>
        <button
          onClick={handleLogout}
          className="p-2 bg-black text-white w-40 rounded mt-2 text-center"
        >
          Logout
        </button>
      </div>

      {/* Delete Account */}
      <div className="mt-4 font-mono text-lg">
        <p className="mb-2">Delete your TimeZone account</p>
        <button
          tye="button"
          onClick={openDeleteModal}
          className="p-2 bg-red-600 text-white font-mono rounded"
        >
          Delete account
        </button>
      </div>

      {/* MODALS SECTION */}
      {/* Edit Email Modal */}
      {editEmailModal && <EmailModal>
      <div className="flex justify-end">
        <IonIcon
          icon={closeOutline}
          onClick={openEmailModal}
          style={{ fontSize: "2rem" }}
        />
      </div>
      <div className="font-mono text-lg text-start mb-4">
        <h1 className="font-bold text-2xl mb-4">Change email</h1>
        <p>Enter a new email for TimeZone</p>
      </div>
      <Formik
        initialValues={{
          newEmail: "",
          confirmEmail: "",
          password: "",
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Field
              component={CustomTextInput}
              value={values.newEmail}
              name="newEmail"
              id="newEmail"
              label="New email"
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="false"
              type="email"
            />
            <Field
              component={CustomTextInput}
              value={values.confirmEmail}
              name="confirmEmail"
              id="confirmEmail"
              label="Confirm email"
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="false"
              type="email"
            />
            <Field
              component={CustomTextInput}
              value={values.password}
              name="password"
              id="password"
              label="Enter password"
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="false"
              type="password"
            />
            <div className="flex justify-center font-semibold text-lg font-mono mt-2">
              <p>
                By tapping Change Email, you agree to our
                <span>
                  <Link>Privacy Policy</Link>
                </span>
                and
                <span>
                  <Link>Terms &amp; Conditions.</Link>
                </span>
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="p-2 mb-4 w-60 mt-6 rounded bg-black text-white"
              >
                Change Email
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </EmailModal>}
    </div>
  );
}
