import {
  EmailAuthProvider,
  deleteUser,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";
import EmailModal from "./Components/ModalComponents/EditNameModal";
import { Form, Formik, Field } from "formik";
import CustomTextInput from "../../Components/TextInput";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import PasswordModal from "./Components/ModalComponents/EditPasswordModal";
import NameModal from "./Components/ModalComponents/EditNameModal";
import DeleteModal from "./Components/ModalComponents/DeleteModal";

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
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editNameModal, setEditNameModal] = useState(false);
  const [editEmailModal, setEditEmailModal] = useState(false);
  const [editPasswordModal, setEditPasswordModal] = useState(false);
  const [reAuth, setReAuth] = useState(false);

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);

        setUserName(user.displayName);
        console.log("user-email:", userEmail);

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

  function UPPERCASE_NAME(name = "") {
    if (name === null) {
      return "";
    } else {
      return name.toUpperCase();
    }
  }

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

  const reAuthenticateUser = (values) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      values.email,
      values.password
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        setIsLoading(true);
        setReAuth(false);
        alert("re-auth successful");
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        alert(errorMessage, errorCode);
        console.log(errorMessage);
      });
  };

  const updateUserEmail = (values) => {
    const user = auth.currentUser;
    updateEmail(user, values.newEmail)
      .then(() => {
        setEditEmailModal(!editEmailModal);
        alert("Email  changed");
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        alert(errorMessage, errorCode);
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

  const handlePasswordChange = (values) => {
    const user = auth.currentUser;
    const newPassword = values.newPassword;
    updatePassword(user, newPassword)
      .then(() => {
        alert("Password changes");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleDeleteAccount = () => {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        alert("account deleted");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const EMAIL_MODAL = (
    <EmailModal>
      <div className="flex justify-end">
        <ActionButton actionHandler={openEmailModal} />
      </div>
      <div className="font-mono text-lg lg:text-xl text-start mb-4">
        <h1 className="font-bold mb-4">
          {reAuth ? "Sign in" : "Change Email"}
        </h1>
        <p>
          {reAuth
            ? "Please re-authenticate to change email."
            : "Enter a new email for TimeZone"}
        </p>
      </div>
      <Formik
        initialValues={
          reAuth
            ? {
                email: userEmail,
                password: "",
              }
            : {
                currentEmail: userEmail,
                newEmail: "",
              }
        }
        onSubmit={reAuth ? reAuthenticateUser : updateUserEmail}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form className="grid text-sm xl:text-xl justify-start lg:justify-center">
            <Field
              component={CustomTextInput}
              value={reAuth ? values.email : values.currentEmail}
              name={reAuth ? "email" : "currentEmail"}
              id={reAuth ? "email" : "currentEmail"}
              label={reAuth ? "Email" : "Current email"}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              type="email"
            />
            <Field
              component={CustomTextInput}
              value={reAuth ? values.password : values.newEmail}
              name={reAuth ? "password" : "newEmail"}
              id={reAuth ? "password" : "newEmail"}
              label={reAuth ? "Password" : "New email"}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              type={reAuth ? "password" : "email"}
            />
            {reAuth ? (
              <div className="flex justify-center font-mono">
                <button type="button" onClick={handleResetPassword}>
                  Forgot password? Reset password.
                </button>
              </div>
            ) : (
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
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="p-2 mb-4 w-60 mt-6 rounded bg-black text-white"
              >
                {reAuth ? "Sign in" : "Change Email"}
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
        <h1 className="text-2xl mb-4 font-semibold">
          {reAuth ? "Sign in" : "Change password"}
        </h1>
        <p className="text-lg">
          {reAuth
            ? "Please re-authenticate to change password."
            : "Please enter Current and New password"}
        </p>
      </div>
      <Formik
        initialValues={
          reAuth
            ? {
                email: userEmail,
                password: "",
              }
            : {
                currentPassword: "",
                newPassword: "",
              }
        }
        onSubmit={reAuth ? reAuthenticateUser : handlePasswordChange}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Field
              component={CustomTextInput}
              id={reAuth ? "email" : "currentPassword"}
              name={reAuth ? "email" : "currentPassword"}
              type={reAuth ? "email" : "password"}
              value={reAuth ? values.email : values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label={reAuth ? "Email" : "Current password"}
              placeholder={reAuth ? "Email" : "Current password"}
              autoComplete="off"
            />
            <Field
              component={CustomTextInput}
              id={reAuth ? "password" : "newPassword"}
              name={reAuth ? "password" : "newPassword"}
              type="password"
              value={reAuth ? values.password : values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label={reAuth ? "Password" : "New password"}
              placeholder={reAuth ? "Password" : "New password"}
              autoComplete="off"
            />
            {reAuth ? (
              <>
                <div className="flex justify-center font-mono">
                  <button type="button" onClick={handleResetPassword}>
                    Forgot password? Reset password.
                  </button>
                </div>
                <div className="flex justify-center font-semibold text-lg text-left px-2 font-mono mt-2">
                  <p>
                    By tapping Sign in, you agree to our
                    <span>
                      <Link className="underline ml-2 mr-2">
                        Privacy Policy
                      </Link>
                    </span>
                    and
                    <span>
                      <Link className="underline ml-2 mr-2">
                        Terms &amp; Conditions.
                      </Link>
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <div className="flex justify-center font-semibold text-lg font-mono px-4 mt-2">
                <p>
                  By tapping Change password, you agree to our
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
            )}
            <div className="flex mt-6 justify-center">
              <button
                disabled={isSubmitting}
                className={
                  isSubmitting
                    ? "p-2 bg-gray-400 text-white w-40 rounded"
                    : "p-2 bg-black text-white w-40 rounded"
                }
                type="submit"
              >
                {reAuth ? "Sign in" : "Change password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
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
                disabled={isSubmitting}
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
        <p>Enter login details to delete account</p>
      </div>
      <div className="flex justify-around">
        <button
          type="button"
          onClick={handleDeleteAccount}
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
            <h1 className="text-2xl font-medium font-mono">Sign-in info</h1>
            <div className="font-mono text-lg mt-4">
              <h1 className="font-medium">Email</h1>
              <p
                style={{ width: "18rem" }}
                className="px-2 py-2 bg-black text-white text-center rounded"
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
      <div className="font-mono mt-8">
        <h1 className="text-lg font-semibold">Personal Information</h1>
        <div>
          <h1 className="font-medium mb-2">Name</h1>
          <p className="mb-2 px-2 py-2 bg-black text-white w-60 text-center rounded">
            {UPPERCASE_NAME(userName)}
          </p>
          <button onClick={openNameModal}>Edit</button>
          <hr className="w-8 border-black" />
        </div>
      </div>

      {/* Security */}
      <div className="font-mono text-lg">
        <h1 className="text-2xl font-semibold font-mono">Security</h1>
        <p>Logout of your account</p>
        <button
          onClick={handleLogout}
          className="px-2 py-2 bg-black text-white w-40 rounded mt-2 text-center"
        >
          Logout
        </button>
      </div>

      {/* Delete Account */}
      <div className="font-mono mt-4 text-lg">
        <p className="mb-2">Delete your TimeZone account</p>
        <button
          type="button"
          onClick={openDeleteModal}
          className="px-4 py-2 bg-red-600 text-white font-mono rounded"
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
