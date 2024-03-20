import { deleteUser, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
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
import { useAuth } from "../../Store";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const {
    user,
    signOutHandler,
    reAuthUser,
    updateCurrentUserName,
    updateCurrentUserEmail,
    updateCurrentUserPassword,
    deleteCurrentUserAccount,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editNameModal, setEditNameModal] = useState(false);
  const [editEmailModal, setEditEmailModal] = useState(false);
  const [editPasswordModal, setEditPasswordModal] = useState(false);
  const [reAuth, setReAuth] = useState(true);

  const userEmail = user?.email;
  const userName = user?.displayName;

  function UPPERCASE_NAME(name = "") {
    if (name === null) {
      return "";
    } else {
      return name.toUpperCase();
    }
  }

  const handleLogout = async () => {
    try {
      await signOutHandler();
      console.log("signed out success.");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const reAuthenticateUser = async (values, actions) => {
    try {
      const email = values.email;
      const password = values.password;
      await reAuthUser(email, password);
      setReAuth(!reAuth);
      actions.resetForm({
        values: {
          email: " ",
          password: " ",
        },
      });
    } catch (error) {
      console.error("Error re-authenticating user: ", error);
    }
  };

  const updateUserEmail = async (values, actions) => {
    try {
      actions.resetForm({
        values: {
          currentEmail: "",
          newEmail: "",
        },
      });
      await updateCurrentUserEmail(values.newEmail);
      setEditEmailModal(!editEmailModal);
      alert("Email  changed");
    } catch (error) {
      console.error("Error updating user-email: ", error);
    }
  };

  const updateUserName = async (values, actions) => {
    try {
      await updateCurrentUserName(values.firstName, values.lastName);
      setEditNameModal(!editNameModal);
      actions.resetForm({
        values: {
          firstName: " ",
          lastName: " ",
        },
      });
    } catch (error) {
      console.error("error updating current-user-name: ", error);
    }
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

  const handlePasswordChange = async (values, actions) => {
    try {
      actions.resetForm({
        values: {
          currentPassword: "",
          newPassword: "",
        },
      });
      await updateCurrentUserPassword(values.newPassword);
      setEditPasswordModal(!editPasswordModal);
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password: ", error);
    }
  };

  const handleDeleteAccount = async (values, actions) => {
    try {
      await reAuthUser(values.email, values.password);
      actions.resetForm({
        values: {
          email: "",
          password: "",
        },
      });
      await deleteCurrentUserAccount();
      alert("Account successfully deleted!");
      setDeleteModal(!deleteModal);
    } catch (error) {
      console.error("Error deleting user account: ", error);
    }
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

  const EMAIL_MODAL = (
    <EmailModal>
      <div className="flex justify-end">
        <ActionButton actionHandler={openEmailModal} />
      </div>
      <div className="font-mono text-lg text-start mb-4">
        <h1 className="font-bold text-2xl mb-4">
          {reAuth ? "Sign in" : "Change email"}
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
          <Form>
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
        <h1 className="text-2xl font-semibold mb-4">
          {reAuth ? "Sign In" : "Delete your account"}
        </h1>
        <p className="text-lg">
          {reAuth
            ? "Enter login details to delete account"
            : "Are you sure you want to delete your account ?"}
        </p>
      </div>
      {reAuth ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          // onSubmit={reAuthenticateUser}
          onSubmit={handleDeleteAccount}
        >
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Field
                component={CustomTextInput}
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                placeholder="Email"
                autoComplete="off"
              />
              <Field
                component={CustomTextInput}
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Password"
                placeholder="Password"
                autoComplete="off"
              />
              <div>
                <button disabled={isSubmitting} type="submit">
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
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
      )}
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
            {UPPERCASE_NAME(userName)}
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
          type="button"
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
