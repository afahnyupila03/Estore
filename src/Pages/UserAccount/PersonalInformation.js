import React, { useState } from "react";
import { Form, Formik } from "formik";
import { CustomInput } from "../../Components/TextInput";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store";
import { useTranslation } from "react-i18next";
import {
  ChangeEmailSchema,
  ChangePasswordSchema,
  EditNameSchema,
  ReAuthSchema,
} from "../../ValidationSchemas/PersonalInformationSchema";
import { ModalComponent } from "../../Components/ProductModal";

function UPPERCASE_NAME(name = "") {
  if (name === null) {
    return "";
  } else {
    return name.toUpperCase();
  }
}

const NullUser = ({ t }) => {
  return (
    <div className="text-xl  font-medium">
      <p>{t("personalInfor.noUser")}</p>
      <p className="mb-10">{t("personalInfor.personalAuthMessage")}</p>
      <Link
        className="bg-gray-800 text-center text-white py-6 px-14 rounded font-medium "
        to="/sign-in-&-create-account"
      >
        {t("auth.signInCreate")}
      </Link>
    </div>
  );
};

const PageContent = ({
  t,
  openEmailModal,
  openPasswordModal,
  userName,
  openNameModal,
  handleLogout,
  openDeleteModal,
  userEmail,
}) => {
  return (
    <div className="mb-40 pb-20">
      {/* Password & Personal Information */}
      <div>
        <h1 className="text-2xl font-medium ">{t("auth.password&Personal")}</h1>
        <div>
          <div className="text-lg mt-4 ">
            <p>
              {t("personalInfor.sameInfor")} <br />
              <span className="text-2xl font-medium ">TIMEZONE</span>
            </p>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl ">{t("personalInfor.signInInfo")}</h1>
            <div className=" text-lg mt-4">
              <h1 className="font-medium">{t("checkoutForm.email")}</h1>
              <p
                style={{ width: "18rem" }}
                className=" p-4 bg-gray-800 text-white text-center rounded"
              >
                {userEmail}
              </p>
              <button className="mt-2" onClick={openEmailModal}>
                {t("personalInfor.changeEmail")}
              </button>
              <hr className="border-black" style={{ width: "7.5rem" }} />
            </div>

            <div className=" text-lg mt-4">
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
      <div className="mt-14 ">
        <h1 className="text-2xl font-medium">
          {t("personalInfor.personalInfor")}
        </h1>
        <div>
          <h1 className="font-medium mb-2">{t("personalInfor.name")}</h1>
          <p className="mb-2 p-4 bg-gray-800 text-white w-60 text-center rounded">
            {UPPERCASE_NAME(userName)}
          </p>
          <button onClick={openNameModal}>{t("delivery.edit")}</button>
          <hr className="w-8 border-black" />
        </div>
      </div>

      {/* Security */}
      <div className="mt-10  text-lg">
        <h1 className="text-2xl font-medium ">{t("personalInfor.security")}</h1>
        <p>{t("personalInfor.logoutAccount")}</p>
        <button
          onClick={handleLogout}
          className="p-2 bg-gray-800 text-white w-40 rounded mt-2 text-center"
        >
          {t("auth.logout")}
        </button>
      </div>

      {/* Delete Account */}
      <div className="mt-4 mb-40 pb-40  text-lg">
        <p className="mb-2">{t("personalInfor.deleteTimezone")}</p>
        <button
          type="button"
          onClick={openDeleteModal}
          className="p-2 bg-red-600 text-white  rounded"
        >
          {t("personalInfor.deleteAccount")}
        </button>
      </div>
    </div>
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
    setDeleteModal((prevState) => !prevState);
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
    <ModalComponent
      size="md"
      position="center"
      isOpen={editEmailModal}
      onClose={openEmailModal}
      modalHeader={
        <div
          className="text-black grid justify-center text-center
         text-lg lg:text-xl text-start mb-4"
        >
          <h1 className="font-medium">Change Email Address</h1>
        </div>
      }
      modalBody={
        <div className="text-black text-base">
          <Formik
            initialValues={{ currentEmail: "", newEmail: "" }}
            validationSchema={ChangeEmailSchema}
            onSubmit={reAuth ? reAuthenticateUser : updateUserEmail}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <CustomInput
                  label={t("personalInfor.currentEmail")}
                  name="currentEmail"
                  type="email"
                  placeholder={userEmail}
                  disabled={true}
                />
                <CustomInput
                  label={t("personalInfor.newEmail")}
                  name="newEmail"
                  type="email"
                  placeholder={t("personalInfor.newEmail")}
                  errors={errors.newEmail}
                  touched={touched.newEmail}
                />
                <div className="text-center ">
                  <button
                    type="submit"
                    className="bg-gray-800 text-white py-2 px-12 rounded font-medium"
                  >
                    {t("personalInfor.changeEmail")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      }
    />
  );

  const NAME_MODAL = (
    <ModalComponent
      size="md"
      position="center"
      isOpen={editNameModal}
      onClose={openNameModal}
      modalHeader={
        <div className="text-black grid justify-center text-center  text-lg lg:text-xl text-start mb-4">
          <h1 className="font-medium">{t("personalInfor.name")}</h1>
        </div>
      }
      modalBody={
        <div className="text-black text-base">
          <Formik
            initialValues={{ firstName: "", lastName: "" }}
            validationSchema={EditNameSchema}
            onSubmit={updateUserName}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <CustomInput
                  label={t("personalInfor.firstName")}
                  name="firstName"
                  type="text"
                  placeholder={t("personalInfor.firstName")}
                  errors={errors.firstName}
                  touched={touched.firstName}
                />
                <CustomInput
                  label={t("personalInfor.lastName")}
                  name="lastName"
                  type="text"
                  placeholder={t("personalInfor.lastName")}
                  errors={errors.lastName}
                  touched={touched.lastName}
                />
                <div className="text-center ">
                  <button
                    type="submit"
                    className="bg-gray-800 text-white py-2 px-12 rounded font-medium"
                  >
                    {t("delivery.edit")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      }
    />
  );

  const PASSWORD_MODAL = (
    <ModalComponent
      size="md"
      position="center"
      isOpen={editPasswordModal}
      onClose={openPasswordModal}
      modalHeader={
        <div
          className="text-black grid justify-center text-center
         text-lg lg:text-xl text-start mb-4"
        >
          <h1 className="font-medium">{t("personalInfor.changePassword")}</h1>
        </div>
      }
      modalBody={
        <div className="text-black text-base">
          <Formik
            initialValues={{ currentPassword: "", newPassword: "" }}
            validationSchema={ChangePasswordSchema}
            onSubmit={reAuth ? reAuthenticateUser : handlePasswordChange}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <CustomInput
                  label={t("personalInfor.newPassword")}
                  name="newPassword"
                  type="password"
                  placeholder={t("personalInfor.newPassword")}
                  errors={errors.newPassword}
                  touched={touched.newPassword}
                />
                <div className="text-center ">
                  <button
                    type="submit"
                    className="bg-gray-800 text-white py-2 px-12 rounded font-medium"
                  >
                    {t("delivery.edit")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      }
    />
  );

  const DELETE_ACCOUNT_MODAL = (
    <ModalComponent
      size="md"
      position="center"
      isOpen={deleteModal}
      onClose={openDeleteModal}
      modalHeader={
        <div
          className="text-black grid justify-center text-center
         text-lg lg:text-xl text-start mb-4"
        >
          <h1 className="font-medium">{t("personalInfor.deleteAccount")}</h1>
        </div>
      }
      modalBody={
        <div className="text-black text-base">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={ReAuthSchema}
            onSubmit={reAuth ? reAuthenticateUser : handleDeleteAccount}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <CustomInput
                  label={t("checkoutForm.email")}
                  name="email"
                  type="email"
                  placeholder={t("checkoutForm.email")}
                  errors={errors.email}
                  touched={touched.email}
                />
                <CustomInput
                  label={t("personalInfor.password")}
                  name="password"
                  type="password"
                  placeholder={t("personalInfor.password")}
                  errors={errors.password}
                  touched={touched.password}
                />
                <div className="text-center ">
                  <button
                    type="submit"
                    className="bg-red-600 text-white py-2 px-12 rounded font-medium"
                  >
                    {t("personalInfor.deleteAccount")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      }
    />
  );

  if (user === null) {
    return <NullUser t={t} />;
  }

  return (
    <div className="mt-14">
      <PageContent
        t={t}
        openEmailModal={openEmailModal}
        openPasswordModal={openPasswordModal}
        userName={userName}
        openNameModal={openNameModal}
        handleLogout={handleLogout}
        openDeleteModal={openDeleteModal}
        userEmail={userEmail}
      />
      {EMAIL_MODAL}
      {NAME_MODAL}
      {PASSWORD_MODAL}
      {DELETE_ACCOUNT_MODAL}
    </div>
  );
}
