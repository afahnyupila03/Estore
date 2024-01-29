import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";

export default function PersonalInformation() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

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
  const deleteUserAccount = () => {};

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
              <button className="mt-2">Change email</button>
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
            {userName.toUpperCase()}
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
        <button className="p-2 bg-red-600 text-white font-mono rounded">
          Delete account
        </button>
      </div>
    </div>
  );
}
