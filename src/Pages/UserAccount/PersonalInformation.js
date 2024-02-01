import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";
import EmailModal from "./Components/EditEmailModal";
import { Form, Formik, Field } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import PasswordModal from "./Components/EditPasswordModal";
import NameModal from "./Components/EditNameModal";
import DeleteModal from "./Components/DeleteModal";

const ActionButton = ({ actionHandler }) => {
  return (
    <IonIcon
      icon={closeOutline}
      onClick={actionHandler}
      style={{ fontSize: "2rem" }}
    />
  );
};

export default function PersonalInformation() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

        // Split the displayed name into first name and last name
        const [first, last] = user.displayName.split(" ");
        setFirstName(first);
        setLastName(last);
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
  const openNameModal = () => {
    setEditNameModal(!editNameModal);
  };
  const openPasswordModal = () => {
    setEditPasswordModal(!editPasswordModal);
  };

  const updateUserEmail = (values) => {
    // const user = auth.currentUser;
      updateEmail(auth.currentUser, userEmail)
        .then(() => {
          openEmailModal();
          console.log("Email  changed")
        })
        .catch((error) => {
          const errorMessage = error.message
          const errorCode = error.code;
          console.error(errorMessage, errorCode);
        });
  };

  const updateUserName = (values) => {
    setTimeout(() => {
      updateProfile(auth.currentUser, {
        displayName: `${values.firstName} ${values.lastName}`,
      })
        .then(() => {
          // profile updated
          console.log("user-name updated:");
          openNameModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        openPasswordModal();
        console.log("Password reset email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const EMAIL_MODAL = (
    <EmailModal>
      <div className="flex justify-end">
        <ActionButton actionHandler={openEmailModal} />
      </div>
      <div className="font-mono text-lg text-start mb-4">
        <h1 className="font-bold text-2xl mb-4">Change email</h1>
        <p>Enter a new email for TimeZone</p>
      </div>
      <Formik
        initialValues={{
          newEmail: "",
        }}
        onSubmit={updateUserEmail}
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
            <div className="flex justify-center font-semibold text-lg font-mono mt-2">
              <p>
                By tapping Change Email, you agree to our
                <span>
                  <Link className="underline ml-2 mr-2">Privacy Policy</Link>
                </span>
                and
                <span>
                  <Link className="underline ml-2 mr-2">
                    Terms &amp; Conditions.
                  </Link>
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

  const PASSWORD_MODAL = (
    <PasswordModal>
      <div className="flex justify-end">
        <ActionButton actionHandler={openPasswordModal} />
      </div>
      <div className="mb-4 font-mono">
        <h1 className="text-2xl mb-4 font-semibold">Reset password</h1>
        <p className="text-lg">Please enter your email to get a reset mail</p>
      </div>
      <div className="flex mt-6 justify-center">
        <button onClick={handleResetPassword} className="p-2 bg-black text-white w-40 rounded" type="submit">
          Send Mail
        </button>
      </div>
    </PasswordModal>
  );

  const NAME_MODAL = (
    <NameModal>
      <div className="flex justify-end">
        <ActionButton actionHandler={openNameModal} />
      </div>
      <div className="font-mono mb-6 font-semibold text-2xl">
        <h1>Edit your name</h1>
      </div>
      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
        }}
        onSubmit={updateUserName}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Field
              name="firstName"
              id="firstName"
              type="text"
              label="First name"
              autoComplete="true"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              component={CustomTextInput}
            />
            <Field
              name="lastName"
              id="lastName"
              type="text"
              label="Last name"
              autoComplete="true"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              component={CustomTextInput}
            />
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="p-2 rounded w-40 bg-black font-mono text-white text-lg"
              >
                Edit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </NameModal>
  );

  const DELETE_MODAL = (
    <DeleteModal>
      <div className="flex justify-end">
        <ActionButton actionHandler={openDeleteModal} />
      </div>
      <div className="font-mono mb-6">
        <h1 className="text-2xl font-semibold mb-4">Delete your account</h1>
        <p className="text-lg">
          Are you sure you want to delete your account ?
        </p>
      </div>
      <div className="flex justify-around">
        <button
          type="button"
          className="bg-red-600 text-white text-lg p-2 w-40 rounded"
        >
          Yes
        </button>
        <button
          onClick={openDeleteModal}
          type="button"
          className="bg-black text-white text-lg p-2 w-40 rounded"
        >
          No
        </button>
      </div>
    </DeleteModal>
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
                style={{ width: "18rem" }}
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
              <button onClick={openPasswordModal}>Change password</button>
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
          <p className="mb-2 p-4 bg-black text-white w-60 text-center rounded">
            {/* {userName.toUpperCase()} */}
            {userName}
          </p>
          <button onClick={openNameModal}>Edit</button>
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
      {editEmailModal && EMAIL_MODAL}
      {editPasswordModal && PASSWORD_MODAL}
      {editNameModal && NAME_MODAL}
      {deleteModal && DELETE_MODAL}
    </div>
  );
}
