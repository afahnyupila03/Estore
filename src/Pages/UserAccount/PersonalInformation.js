import React, { useState } from "react";
import EmailModal from "./Components/ModalComponents/EditNameModal";
import { Form, Formik, Field } from "formik";
import CustomTextInput, { CustomInput } from "../../Components/TextInput";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import PasswordModal from "./Components/ModalComponents/EditPasswordModal";
import NameModal from "./Components/ModalComponents/EditNameModal";
import DeleteModal from "./Components/ModalComponents/DeleteModal";
import { useAuth } from "../../Store";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
    resetPasswordHandler,
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

  const handleResetPassword = async () => {
    try {
      await resetPasswordHandler(userEmail);
      setReAuth(!reAuth);
      setEditPasswordModal(!editPasswordModal);
      alert("Reset password mail sent");
    } catch (error) {
      console.error("Error sending reset-password mail: ", error);
    }
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
      <div className="font-mono text-lg lg:text-xl text-start mb-4">
        <h1 className="font-bold mb-4 text-center">
          {reAuth
            ? `${t("personalInfor.signIn")}`
            : `${t("personalInfor.changeEmail")}`}
        </h1>
        <p>
          {reAuth
            ? `${t("personalInfor.reAuthenticate")}`
            : `${t("personalInfor.enterNew")}`}
        </p>
      </div>
      <Formik
        initialValues={
          reAuth
            ? {
                email: "",
                password: "",
              }
            : {
                currentEmail: "",
                newEmail: "",
              }
        }
        onSubmit={reAuth ? reAuthenticateUser : updateUserEmail}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form className="grid text-sm xl:text-xl justify-start lg:justify-center">
            <CustomInput
              errors={errors}
              touched={touched}
              value={reAuth ? values.email : values.currentEmail}
              name={reAuth ? "email" : "currentEmail"}
              id={reAuth ? "email" : "currentEmail"}
              label={
                reAuth
                  ? `${t("checkoutForm.email")}`
                  : `${t("personalInfor.currentEmail")}`
              }
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              type="email"
            />
            <CustomInput
              errors={errors}
              touched={touched}
              value={reAuth ? values.password : values.newEmail}
              name={reAuth ? "password" : "newEmail"}
              id={reAuth ? "password" : "newEmail"}
              label={
                reAuth
                  ? `${t("personalInfor.password")}`
                  : `${t("personalInfor.newEmail")}`
              }
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              type={reAuth ? "password" : "email"}
            />
            {reAuth ? (
              <div className="flex justify-center font-mono">
                <button type="button" onClick={handleResetPassword}>
                  {t("personalInfor.forgotPassword")}
                </button>
              </div>
            ) : (
              <div className="flex justify-center font-semibold text-lg font-mono mt-2">
                <p>
                  {t("personalInfor.byTapping")}
                  <span>
                    <Link className="underline ml-2 mr-2">
                      {t("personalInfor.privacyPolicy")}
                    </Link>
                  </span>
                  {t("and")}
                  <span>
                    <Link className="underline ml-2 mr-2">
                      {t("personalInfor.termsCondition")}
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
                {reAuth
                  ? `${t("personalInfor.signIn")}`
                  : `${t("personalInfor.changeEmail")}`}
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
        <h1 className="text-2xl text-center mb-4 font-semibold">
          {reAuth
            ? `${t("personalInfor.signIn")}`
            : `${t("personalInfor.changePassword")}`}
        </h1>
        <p className="text-lg">
          {reAuth
            ? `${t("personalInfor.reAuthPassword")}`
            : `${t("personalInfor.currentNewPassword")}`}
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
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form>
            <CustomInput
              errors={errors}
              touched={touched}
              id={reAuth ? "email" : "currentPassword"}
              name={reAuth ? "email" : "currentPassword"}
              type={reAuth ? "email" : "password"}
              value={reAuth ? values.email : values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label={
                reAuth
                  ? `${t("checkoutForm.email")}`
                  : `${t("personalInfor.currentPassword")}`
              }
              placeholder={
                reAuth
                  ? `${t("checkoutForm.email")}`
                  : `${t("personalInfor.currentPassword")}`
              }
              autoComplete="off"
            />
            <CustomInput
              errors={errors}
              touched={touched}
              id={reAuth ? "password" : "newPassword"}
              name={reAuth ? "password" : "newPassword"}
              type="password"
              value={reAuth ? values.password : values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label={
                reAuth
                  ? `${t("personalInfor.password")}`
                  : `${t("personalInfor.newPassword")}`
              }
              placeholder={
                reAuth
                  ? `${t("personalInfor.password")}`
                  : `${t("personalInfor.newPassword")}`
              }
              autoComplete="off"
            />
            {reAuth ? (
              <div className="flex justify-center font-mono">
                <button type="button" onClick={handleResetPassword}>
                  {t("personalInfor.forgotPassword")}
                </button>
              </div>
            ) : (
              <div className="flex justify-center font-semibold text-lg font-mono px-4 mt-2">
                <p>
                  {t("personalInfor.tapChangePassword")}
                  <span>
                    <Link className="underline ml-2 mr-2">
                      {t("personalInfor.privacyPolicy")}
                    </Link>
                  </span>
                  {t("and")}
                  <span>
                    <Link className="underline ml-2 mr-2">
                      {t("personalInfor.termsCondition")}
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
                {reAuth
                  ? `${t("personalInfor.signIn")}`
                  : `${t("personalInfor.changePassword")}`}
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
        <h1 className="text-center">Edit your name</h1>
      </div>
      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
        }}
        onSubmit={updateUserName}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form>
            <CustomInput
              errors={errors}
              touched={touched}
              name="firstName"
              id="firstName"
              type="text"
              label={t("checkoutForm.firstName")}
              placeholder={t("checkoutForm.firstName")}
              autoComplete="true"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            <CustomInput
              errors={errors}
              touched={touched}
              name="lastName"
              id="lastName"
              type="text"
              label={t("checkoutForm.lastName")}
              placeholder={t("checkoutForm.lastName")}
              autoComplete="true"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 rounded w-40 bg-black font-mono text-white text-lg"
              >
                {t("delivery.edit")}
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
          {reAuth
            ? `${t("personalInfor.signIn")}`
            : `${t("personalInfor.deleteTimezone")}`}
        </h1>
        <p className="text-lg">
          {reAuth
            ? `${t("personalInfor.enterDetails")}`
            : `${t("personalInfor.areYouSure")}`}
        </p>
      </div>
      {reAuth ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          // onSubmit={reAuthenticateUser}
          onSubmit={handleDeleteAccount}
        >
          {({
            values,
            handleChange,
            handleBlur,
            isSubmitting,
            errors,
            touched,
          }) => (
            <Form>
              <CustomInput
                errors={errors}
                touched={touched}
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("checkoutForm.email")}
                placeholder={t("checkoutForm.email")}
                autoComplete="off"
              />
              <CustomInput
                errors={errors}
                touched={touched}
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("personalInfor.password")}
                placeholder={t("personalInfor.password")}
                autoComplete="off"
              />
              <div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={
                    isSubmitting
                      ? "p-2 bg-gray-400 text-white w-40 rounded"
                      : "p-2 bg-black text-white w-40 rounded"
                  }
                >
                  {t("personalInfor.signIn")}
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
            {t("yes")}
          </button>
          <button
            onClick={openDeleteModal}
            type="button"
            className="bg-black text-white text-lg p-2 w-40 rounded"
          >
            {t("no")}
          </button>
        </div>
      )}
    </DeleteModal>
  );

  const NullUser = () => {
    return (
      <div className="text-xl font-mono font-medium">
        <p>{t("personalInfor.noUser")}</p>
        <p className="mb-10">{t("personalInfor.personalAuthMessage")}</p>
        <Link
          className="bg-black text-center text-white py-6 px-14 rounded font-semibold font-mono"
          to="/sign-in-&-create-account"
        >
          {t("auth.signInCreate")}
        </Link>
      </div>
    );
  };

  const PageContent = () => {
    return (
      <div>
        {/* Password & Personal Information */}
        <div>
          <h1 className="text-2xl font-semibold font-mono">
            {t("auth.password&Personal")}
          </h1>
          <div>
            <div className="text-lg mt-4 font-mono">
              <p>
                {t("personalInfor.sameInfor")} <br />
                <span className="text-2xl font-semibold font-mono">
                  TIMEZONE
                </span>
              </p>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-mono">
                {t("personalInfor.signInInfo")}
              </h1>
              <div className="font-mono text-lg mt-4">
                <h1 className="font-medium">{t("checkoutForm.email")}</h1>
                <p
                  style={{ width: "18rem" }}
                  className=" p-4 bg-black text-white text-center rounded"
                >
                  {userEmail}
                </p>
                <button className="mt-2" onClick={openEmailModal}>
                  {t("personalInfor.changeEmail")}
                </button>
                <hr className="border-black" style={{ width: "7.5rem" }} />
              </div>

              <div className="font-mono text-lg mt-4">
                <h1 className="font-medium">{t("personalInfor.password")}</h1>
                <button onClick={openPasswordModal}>
                  {t("personalInfor.changePassword")}
                </button>
                <hr className="border-black" style={{ width: "9.5rem" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-14 font-mono">
          <h1 className="text-2xl font-semibold">
            {t("personalInfor.personalInfor")}
          </h1>
          <div>
            <h1 className="font-medium mb-2">{t("personalInfor.name")}</h1>
            <p className="mb-2 p-4 bg-black text-white w-60 text-center rounded">
              {UPPERCASE_NAME(userName)}
            </p>
            <button onClick={openNameModal}>{t("delivery.edit")}</button>
            <hr className="w-8 border-black" />
          </div>
        </div>

        {/* Security */}
        <div className="mt-10 font-mono text-lg">
          <h1 className="text-2xl font-semibold font-mono">
            {t("personalInfor.security")}
          </h1>
          <p>{t("personalInfor.logoutAccount")}</p>
          <button
            onClick={handleLogout}
            className="p-2 bg-black text-white w-40 rounded mt-2 text-center"
          >
            {t("auth.logout")}
          </button>
        </div>

        {/* Delete Account */}
        <div className="mt-4 font-mono text-lg">
          <p className="mb-2">{t("personalInfor.deleteTimezone")}</p>
          <button
            type="button"
            onClick={openDeleteModal}
            className="p-2 bg-red-600 text-white font-mono rounded"
          >
            {t("personalInfor.deleteAccount")}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {user === null ? NullUser() : PageContent()}

      {/* MODALS SECTION */}
      {editEmailModal && EMAIL_MODAL}
      {editPasswordModal && PASSWORD_MODAL}
      {editNameModal && NAME_MODAL}
      {deleteModal && DELETE_MODAL}
    </div>
  );
}
