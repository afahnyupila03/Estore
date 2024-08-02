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

  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await reAuthUser(email, password);

      actions.resetForm({
        values: {
          email: "",
          password: "",
        },
      });

      setReAuth(!reAuth);
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
      console.error("error updating current-user-name: ", error.message);
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
          <h1 className="font-medium text-center">
            {t("personalInfor.changeEmail")}
          </h1>

          {reAuth && (
            <p className="font-medium my-4 text-center">
              {t("personalInfor.reAuthenticate")}
            </p>
          )}
        </div>
      }
      modalBody={
        <div className="text-black text-base">
          <Formik
            initialValues={
              reAuth
                ? { email: "", password: "" }
                : { currentEmail: userEmail, newEmail: "" }
            }
            validationSchema={reAuth ? ReAuthSchema(t) : ChangeEmailSchema(t)}
            onSubmit={reAuth ? reAuthenticateUser : updateUserEmail}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form className="space-y-4">
                <CustomInput
                  label={
                    reAuth
                      ? t("checkoutForm.email")
                      : t("personalInfor.currentEmail")
                  }
                  id={reAuth ? "email" : "currentEmail"}
                  name={reAuth ? "email" : "currentEmail"}
                  type="email"
                  placeholder={
                    reAuth ? t("checkoutForm.email") : values.currentEmail
                  }
                  value={reAuth ? values.email : values.currentEmail}
                  disabled={reAuth ? false : true}
                  errors={errors}
                  touched={touched}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <CustomInput
                  label={t("personalInfor.newEmail")}
                  name={reAuth ? "password" : "newEmail"}
                  id={reAuth ? "password" : "newEmail"}
                  type={
                    reAuth
                      ? reAuth && showPassword
                        ? "text"
                        : "password"
                      : "email"
                  }
                  placeholder={
                    reAuth
                      ? t("personalInfor.password")
                      : t("personalInfor.newEmail")
                  }
                  value={reAuth ? values.password : values.newEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  showPassword={showPassword}
                  togglePassword={() => {
                    setShowPassword((prev) => !prev);
                    setTimeout(() => {
                      setShowPassword((prev) => !prev);
                    }, 1000);
                  }}
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
          <h1 className="font-medium text-center">
            {t("personalInfor.editName")}
          </h1>
        </div>
      }
      modalBody={
        <div className="text-black text-base">
          <Formik
            initialValues={{ firstName: "", lastName: "" }}
            validationSchema={EditNameSchema(t)}
            onSubmit={updateUserName}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form className="space-y-4">
                <CustomInput
                  label={t("checkoutForm.firstName")}
                  name="firstName"
                  type="text"
                  placeholder={t("checkoutForm.firstName")}
                  errors={errors}
                  touched={touched}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <CustomInput
                  label={t("checkoutForm.lastName")}
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder={t("checkoutForm.lastName")}
                  errors={errors}
                  touched={touched}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
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
          <h1 className="font-medium text-center">
            {t("personalInfor.changePassword")}
          </h1>

          {reAuth && (
            <p className="font-medium text-center my-4">
              {t("personalInfor.reAuthPassword")}
            </p>
          )}
        </div>
      }
      modalBody={
        <div className="text-black text-base">
          <Formik
            initialValues={
              reAuth
                ? { email: "", password: "" }
                : { currentPassword: "", newPassword: "" }
            }
            validationSchema={
              reAuth ? ReAuthSchema(t) : ChangePasswordSchema(t)
            }
            onSubmit={reAuth ? reAuthenticateUser : handlePasswordChange}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form className="space-y-4">
                <CustomInput
                  id={reAuth ? "email" : "currentPassword"}
                  label={
                    reAuth
                      ? t("checkoutForm.email")
                      : t("personalInfor.currentPassword")
                  }
                  name={reAuth ? "email" : "currentPassword"}
                  type={
                    reAuth
                      ? "email"
                      : !reAuth && showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  placeholder={
                    reAuth
                      ? t("checkoutForm.email")
                      : t("personalInfor.currentPassword")
                  }
                  value={reAuth ? values.email : values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  showPassword={showCurrentPassword}
                  togglePassword={() => {
                    setShowCurrentPassword((prev) => !prev);
                    setTimeout(() => {
                      setShowCurrentPassword((prev) => !prev);
                    }, 1000);
                  }}
                />
                <CustomInput
                  id={reAuth ? "password" : "newPassword"}
                  label={
                    reAuth
                      ? t("personalInfor.password")
                      : t("personalInfor.newPassword")
                  }
                  name={reAuth ? "password" : "newPassword"}
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    reAuth
                      ? t("personalInfor.password")
                      : t("personalInfor.newPassword")
                  }
                  errors={errors}
                  touched={touched}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={reAuth ? values.password : values.newPassword}
                  showPassword={showPassword}
                  togglePassword={() => {
                    setShowPassword((prev) => !prev);
                    setTimeout(() => {
                      setShowPassword((prev) => !prev);
                    }, 1000);
                  }}
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
          <h1 className="font-medium text-center">
            {t("personalInfor.deleteAccount")}
          </h1>
          <p className="text-center mt-4 font-medium">
            {t("personalInfor.warning")}
          </p>
        </div>
      }
      modalBody={
        <div className="text-black text-base">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={ReAuthSchema(t)}
            onSubmit={reAuth ? reAuthenticateUser : handleDeleteAccount}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form className="space-y-4">
                <CustomInput
                  label={t("checkoutForm.email")}
                  name="email"
                  type="email"
                  placeholder={t("checkoutForm.email")}
                  errors={errors}
                  touched={touched}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <CustomInput
                  label={t("personalInfor.password")}
                  name="password"
                  type="password"
                  placeholder={t("personalInfor.password")}
                  errors={errors}
                  touched={touched}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
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
